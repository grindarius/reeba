import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import {
  events,
  GetEditableEventDataReply,
  GetEditableEventDataReplySchema,
  GetEditableEventDataRequestParams,
  GetEditableEventDataRequestParamsSchema,
  PatchEditableEventDataReply,
  PatchEditableEventDataReplySchema,
  PatchEditableEventDataRequestBody,
  PatchEditableEventDataRequestBodySchema,
  PatchEditableEventDataRequestParams,
  PatchEditableEventDataRequestParamsSchema
} from '@reeba/common'

type EventData = Pick<events, 'event_id' | 'event_name' | 'event_description' | 'event_website' | 'event_opening_date' | 'event_venue_name' | 'event_venue_coordinates' | 'event_ticket_prices' | 'event_creation_date'> &
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
      },
      onRequest: instance.authenticate,
      config: {
        name: 'GetEditableEventData'
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
          events.event_creation_date,
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
          id: dt.f1,
          start: dayjs(dt.f2).toISOString(),
          end: dayjs(dt.f3).toISOString()
        }
      })

      const timesSet: Array<{ id: string, start: string, end: string }> = []

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
        creationDate: dayjs(eventData.rows[0].event_creation_date).toISOString(),
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

  instance.patch<{ Params: PatchEditableEventDataRequestParams, Body: PatchEditableEventDataRequestBody, Reply: PatchEditableEventDataReply }>(
    '/:eventId/edit',
    {
      schema: {
        params: PatchEditableEventDataRequestParamsSchema,
        body: PatchEditableEventDataRequestBodySchema,
        response: {
          200: PatchEditableEventDataReplySchema
        }
      },
      onRequest: instance.authenticate,
      config: {
        name: 'PatchEditableEventData'
      }
    },
    async (request) => {
      const { id, name, description, website, openingDate, startTime, venueName, venueCoordinates, tags, priceRange } = request.body

      return await instance.pg.transact(async client => {
        if (name !== '') {
          await client.query(
            'update "events" set event_name = $1 where $1 is distinct from event_name and event_id = $2',
            [name, id]
          )
        }

        await client.query(
          'update "events" set event_description = $1 where $1 is distinct from event_description and event_id = $2',
          [description, id]
        )

        await client.query(
          'update "events" set event_website = $1 where $1 is distinct from event_website and event_id = $2',
          [website, id]
        )

        await client.query(
          'update "events" set event_opening_date = $1 where $1 is distinct from event_opening_date and event_id = $2',
          [dayjs(openingDate).toDate(), id]
        )

        for await (const dt of startTime) {
          await client.query(
            'update "event_datetimes" set event_start_datetime = $1, event_end_datetime = $2 where event_datetime_id = $3',
            [dayjs(dt.start).toDate(), dayjs(dt.end).toDate(), dt.id]
          )
        }

        await client.query(
          'update "events" set event_venue_name = $1 where $1 is distinct from event_venue_name and event_id = $2',
          [venueName, id]
        )

        await client.query(
          'update "events" set event_venue_coordinates = $1 where $1 is distinct from event_venue_coordinates and event_id = $2',
          [`${venueCoordinates.x}, ${venueCoordinates.y}`, id]
        )

        await client.query(
          'delete from "event_tags_bridge" where event_id = $1',
          [id]
        )

        for await (const t of tags) {
          await client.query(
            'insert into "event_tags_bridge" (event_id, event_tag_label) values ($1, $2)',
            [id, t]
          )
        }

        await client.query(
          'update "events" set event_ticket_prices = $1, event_min_ticket_price = $2, event_max_ticket_price = $3 where event_id = $4',
          [
            priceRange.reduce<Record<string, number>>((obj, p) => {
              obj[p.color] = p.price
              return obj
            }, {}),
            Math.min(...priceRange.map(p => p.price)),
            Math.max(...priceRange.map(p => p.price)),
            id
          ]
        )

        return {
          message: 'complete'
        }
      })
    }
  )
}
