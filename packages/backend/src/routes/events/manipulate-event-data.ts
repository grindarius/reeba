import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import {
  events,
  GetEditableEventDataReply,
  GetEditableEventDataReplySchema,
  GetEditableEventDataRequestParams,
  GetEditableEventDataRequestParamsSchema
} from '@reeba/common'

type EventData = Pick<events, 'event_id' | 'event_name' | 'event_description' | 'event_website' | 'event_opening_date' | 'event_venue_name' | 'event_venue_coordinates' | 'event_ticket_prices'> &
{
  tags: Array<string>
  datetimes: Array<{
    f1: string
    f2: number
    f3: number
  }>
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetEditableEventDataRequestParams, Reply: GetEditableEventDataReply }>(
    '/:eventId/edit',
    {
      schema: {
        params: GetEditableEventDataRequestParamsSchema,
        response: {
          200: GetEditableEventDataReplySchema
        }
      }
    },
    async (request) => {
      const { eventId } = request.params

      const eventData = await instance.pg.query<EventData, [string]>(
        `select
          events.event_id,
          events.event_name,
          events.event_description,
          events.event_website,
          events.event_opening_date,
          events.event_venue_name,
          events.event_venue_coordinates,
          events.event_ticket_prices,
          array_agg(
            row_to_json(
              row(
                event_datetimes.event_datetime_id,
                event_datetimes.event_start_datetime,
                event_datetimes.event_end_datetime
              )
            )
          ) as datetimes,
          array_agg(
            distinct event_tags_bridge.event_tag_label
          ) as tags
        from "events"
        inner join "event_datetimes" on events.event_id = event_datetimes.event_id
        inner join "event_tags_bridge" on events.event_id = event_tags_bridge.event_id
        where events.event_id = $1
        group by events.event_id`,
        [eventId]
      )

      const times = eventData.rows[0].datetimes.map(dt => {
        return {
          start: dayjs(dt.f2).toISOString(),
          end: dayjs(dt.f3).toISOString()
        }
      })

      const timesSet: Array<{ start: string, end: string }> = []

      for (const c of times) {
        if (timesSet.some(s => s.start === c.start && s.end === c.end)) {
          continue
        }

        timesSet.push(c)
      }

      return {
        name: eventData.rows[0].event_name,
        description: eventData.rows[0].event_description,
        website: eventData.rows[0].event_website,
        openingDate: dayjs(eventData.rows[0].event_opening_date).toISOString(),
        startTime: timesSet,
        venueName: eventData.rows[0].event_venue_name,
        venueCoordinates: {
          x: eventData.rows[0].event_venue_coordinates.x.toString(),
          y: eventData.rows[0].event_venue_coordinates.y.toString()
        },
        tags: [...new Set(eventData.rows[0].tags)],
        priceRange: Object.entries(eventData.rows[0].event_ticket_prices).map(p => {
          return {
            color: p[0],
            price: p[1]
          }
        })
      }
    }
  )

  instance.patch(
    '/:eventId/edit',
    async () => {
      return {
        what: 'dis'
      }
    }
  )
}
