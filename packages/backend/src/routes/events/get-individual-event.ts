import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  event_datetimes,
  event_tags_bridge,
  events,
  GetIndividualEventReply,
  GetIndividualEventReplySchema,
  GetIndividualEventRequestParams,
  GetIndividualEventRequestParamsSchema,
  NotFoundReplySchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetIndividualEventRequestParamsSchema,
  response: {
    200: GetIndividualEventReplySchema,
    400: BadRequestReplySchema,
    404: NotFoundReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetIndividualEventRequestParams, Reply: GetIndividualEventReply }>(
    '/:eventId',
    {
      schema,
      preValidation: async (request, reply) => {
        const { eventId } = request.params

        if (eventId == null || eventId === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventId\'')
        }
      }
    },
    async (request, reply) => {
      const { eventId } = request.params

      const queriedEvent = await instance.pg.query<events, [events['event_id']]>(
        'select * from events where event_id = $1',
        [eventId]
      )

      if (queriedEvent.rowCount === 0) {
        void reply.code(404)
        throw new Error('event not found')
      }

      const queriedDatetimes = await instance.pg.query<event_datetimes, [events['event_id']]>(
        'select * from event_datetimes where event_id = $1',
        [eventId]
      )

      const queriedTags = await instance.pg.query<event_tags_bridge, [events['event_id']]>(
        'select * from event_tags_bridge where event_id = $1',
        [eventId]
      )

      const mappedPrices = queriedEvent.rows[0].event_ticket_prices.map(price => {
        return {
          color: price.price_color,
          value: price.price_value
        }
      })

      return {
        name: queriedEvent.rows[0].event_name,
        createdBy: queriedEvent.rows[0].user_username,
        description: queriedEvent.rows[0].event_description,
        website: queriedEvent.rows[0].event_website,
        venueName: queriedEvent.rows[0].event_venue_name,
        venueCoordinates: queriedEvent.rows[0].event_venue_coordinates,
        openingDate: queriedEvent.rows[0].event_opening_date,
        prices: mappedPrices,
        tags: queriedTags.rows.map(tag => tag.event_tag_label),
        datetimes: queriedDatetimes.rows.map(datetime => {
          return {
            start: datetime.event_start_datetime,
            end: datetime.event_end_datetime
          }
        })
      }
    }
  )
}
