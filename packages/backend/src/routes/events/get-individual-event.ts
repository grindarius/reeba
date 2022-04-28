import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  event_datetimes,
  event_tags_bridge,
  events,
  GetIndividualEventReply,
  GetIndividualEventReplySchema,
  GetIndividualEventRequestParams,
  GetIndividualEventRequestParamsSchema,
  GetIndividualEventRequestQuerystring,
  GetIndividualEventRequestQuerystringSchema,
  t_event_status
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetIndividualEventRequestParamsSchema,
  querystring: GetIndividualEventRequestQuerystringSchema,
  response: {
    200: GetIndividualEventReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetIndividualEventRequestParams, Querystring: GetIndividualEventRequestQuerystring, Reply: GetIndividualEventReply }>(
    '/:eventId',
    {
      schema,
      preValidation: async (request, reply) => {
        const { eventId } = request.params
        const { u } = request.query

        if (u == null) {
          request.query.u = ''
        }

        if (eventId == null || eventId === '') {
          void reply.code(400)
          throw new Error('params should have required property \'eventId\'')
        }
      },
      config: {
        name: 'GetIndividualEvent'
      }
    },
    async (request, reply) => {
      const { eventId } = request.params
      const { u } = request.query

      const queriedEvent = await instance.pg.query<events, [events['event_id']]>(
        'select * from events where event_id = $1',
        [eventId]
      )

      if (queriedEvent.rowCount === 0) {
        void reply.code(404)
        throw new Error('event not found')
      }

      if (queriedEvent.rows[0].event_status === t_event_status.closed) {
        void reply.code(404)
        throw new Error('event not found')
      }

      const queriedDatetimes = await instance.pg.query<event_datetimes, [events['event_id']]>(
        'select * from event_datetimes where event_id = $1',
        [eventId]
      )

      const queriedTags = await instance.pg.query<event_tags_bridge, [events['event_id']]>(
        'select * from event_tags_bridge where event_id = $1 order by event_tag_label asc',
        [eventId]
      )

      const isCurrentUserAttended = await instance.pg.query(
        `select
          distinct events.event_id
        from "transactions"
        inner join "transaction_details" on transactions.transaction_id = transaction_details.transaction_id
        inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        where transactions.user_username = $1 and events.event_id = $2`,
        [u, eventId]
      )

      return {
        name: queriedEvent.rows[0].event_name,
        createdBy: queriedEvent.rows[0].user_username,
        description: queriedEvent.rows[0].event_description,
        website: queriedEvent.rows[0].event_website,
        venueName: queriedEvent.rows[0].event_venue_name,
        ageLimit: queriedEvent.rows[0].event_minimum_age,
        isCurrentUserAttended: isCurrentUserAttended.rowCount !== 0,
        venueCoordinates: { x: queriedEvent.rows[0].event_venue_coordinates.x.toString(), y: queriedEvent.rows[0].event_venue_coordinates.y.toString() },
        openingDate: queriedEvent.rows[0].event_opening_date,
        prices: Object.keys(queriedEvent.rows[0].event_ticket_prices).map(k => {
          return {
            color: k,
            value: queriedEvent.rows[0].event_ticket_prices[k]
          }
        }),
        tags: queriedTags.rows.map(tag => tag.event_tag_label),
        datetimes: queriedDatetimes.rows.map(datetime => {
          return {
            datetimeId: datetime.event_datetime_id,
            start: datetime.event_start_datetime,
            end: datetime.event_end_datetime
          }
        })
      }
    }
  )
}
