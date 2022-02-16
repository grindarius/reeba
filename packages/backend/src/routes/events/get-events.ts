import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { event_datetimes, events, GetEventsReply, RootPageEvent } from '@reeba/common'

interface SelectRootPageEvent {
  event_cover_image_path: events['event_cover_image_path']
  event_name: events['event_name']
  event_venue_name: events['event_venue_name']
  first_start_datetime: event_datetimes['event_end_datetime']
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Reply: GetEventsReply }>('/', async () => {
    const oneMonthBackDate: Date = dayjs().subtract(1, 'month').toDate()

    const allOfficialEventsLastMonth = await instance.pg.query<SelectRootPageEvent, [Date]>(
      `select
        events.event_cover_image_path,
        events.event_name,
        events.event_venue_name,
        min(event_datetimes.event_start_datetime) as first_start_datetime
      from events
      inner join users on events.user_username = users.user_username
      inner join event_datetimes on events.event_id = event_datetimes.event_id
      where event_datetimes.event_start_datetime > $1
      and users.user_verification_status = 'true'::boolean
      group by users.user_username, events.event_id
      limit 8`,
      [oneMonthBackDate]
    )

    const allLocalEventsLastMonth = await instance.pg.query<SelectRootPageEvent, [Date]>(
      `select
        events.event_cover_image_path,
        events.event_name,
        events.event_venue_name,
        min(event_datetimes.event_start_datetime) as first_start_datetime
      from events
      inner join users on events.user_username = users.user_username
      inner join event_datetimes on events.event_id = event_datetimes.event_id
      where event_datetimes.event_start_datetime > $1
      and users.user_verification_status = 'false'::boolean
      group by users.user_username, events.event_id
      limit 8`,
      [oneMonthBackDate]
    )

    return {
      official: allOfficialEventsLastMonth.rows.map(ev => {
        const ret: RootPageEvent = {
          coverImagePath: ev.event_cover_image_path,
          name: ev.event_name,
          firstDatetime: ev.first_start_datetime,
          venueName: ev.event_venue_name
        }

        return ret
      }),
      local: allLocalEventsLastMonth.rows.map(ev => {
        const ret: RootPageEvent = {
          coverImagePath: ev.event_cover_image_path,
          name: ev.event_name,
          firstDatetime: ev.first_start_datetime,
          venueName: ev.event_venue_name
        }

        return ret
      })
    }
  })
}
