import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  event_datetimes,
  events,
  GetAllEventsReply,
  GetAllEventsReplySchema,
  GetEventsReply,
  GetEventsReplySchema,
  RootPageEvent,
  t_event_status
} from '@reeba/common'

interface SelectRootPageEvent {
  user_username: events['user_username']
  event_id: events['event_id']
  event_name: events['event_name']
  event_venue_name: events['event_venue_name']
  first_start_datetime: event_datetimes['event_end_datetime']
}

const schema: FastifySchema = {
  response: {
    200: GetEventsReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Reply: GetEventsReply }>(
    '/root',
    {
      schema,
      config: {
        name: 'GetRootPageEvent'
      }
    },
    async () => {
      const oneMonthBackDate: Date = dayjs().subtract(1, 'month').toDate()

      const allOfficialEventsLastMonth = await instance.pg.query<SelectRootPageEvent, [Date, string]>(
        `select
          events.user_username,
          events.event_id,
          events.event_name,
          events.event_venue_name,
          min(event_datetimes.event_start_datetime) as first_start_datetime
        from "events"
        inner join "users" on events.user_username = users.user_username
        inner join "event_datetimes" on events.event_id = event_datetimes.event_id
        where
          event_datetimes.event_start_datetime > $1 and
          users.user_verification_status = 'true'::boolean and
          events.event_status != $2
        group by users.user_username, events.event_id
        order by first_start_datetime desc
        limit 8`,
        [oneMonthBackDate, t_event_status.closed]
      )

      const allLocalEventsLastMonth = await instance.pg.query<SelectRootPageEvent, [Date, string]>(
        `select
          events.user_username,
          events.event_id,
          events.event_name,
          events.event_venue_name,
          min(event_datetimes.event_start_datetime) as first_start_datetime
        from "events"
        inner join "users" on events.user_username = users.user_username
        inner join "event_datetimes" on events.event_id = event_datetimes.event_id
        where
          event_datetimes.event_start_datetime > $1 and
          users.user_verification_status = 'false'::boolean and
          events.event_status != $2
        group by users.user_username, events.event_id
        order by first_start_datetime desc
        limit 8`,
        [oneMonthBackDate, t_event_status.closed]
      )

      return {
        official: allOfficialEventsLastMonth.rows.map(ev => {
          const ret: RootPageEvent = {
            username: ev.user_username,
            id: ev.event_id,
            name: ev.event_name,
            firstDatetime: ev.first_start_datetime,
            venueName: ev.event_venue_name
          }

          return ret
        }),
        local: allLocalEventsLastMonth.rows.map(ev => {
          const ret: RootPageEvent = {
            username: ev.user_username,
            id: ev.event_id,
            name: ev.event_name,
            firstDatetime: ev.first_start_datetime,
            venueName: ev.event_venue_name
          }

          return ret
        })
      }
    }
  )

  instance.get<{ Reply: GetAllEventsReply }>(
    '/all',
    {
      schema: {
        response: {
          200: GetAllEventsReplySchema
        }
      },
      config: {
        name: 'GetAllEvents'
      }
    },
    async () => {
      const allEvents = await instance.pg.query<SelectRootPageEvent, [string]>(
        `select
          events.user_username,
          events.event_id,
          events.event_name,
          events.event_venue_name,
          min(event_datetimes.event_start_datetime) as first_start_datetime
        from "events"
        inner join "users" on events.user_username = users.user_username
        inner join "event_datetimes" on events.event_id = event_datetimes.event_id
        where
          events.event_status != $1
        group by users.user_username, events.event_id
        order by first_start_datetime desc`,
        [t_event_status.closed]
      )

      return {
        events: allEvents.rows.map(e => {
          return {
            username: e.user_username,
            id: e.event_id,
            name: e.event_name,
            firstDatetime: e.first_start_datetime,
            venueName: e.event_venue_name
          }
        })
      }
    }
  )
}
