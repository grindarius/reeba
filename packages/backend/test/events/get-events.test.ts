import dayjs from 'dayjs'
import dotenv from 'dotenv-flow'
import { nanoid } from 'nanoid'
import { resolve } from 'node:path'
import t from 'tap'

import { event_seats, t_event_status } from '@reeba/common'

import createServer from '../../src/app'
import client from '../pool'
import { localEventsList, officialEventsList } from './get-event-data'

dotenv.config({
  path: resolve(__dirname, '..', '..', 'src'),
  silent: true
})

const officialUser = {
  username: 'officialrootpageacc',
  email: 'officialrootpageacc@gmail.com',
  password: 'asdfghjkl123',
  phoneCountryCode: '66',
  phoneNumber: '8499384023',
  verificationStatus: true
}

const localUser = {
  username: 'localrootpageacc',
  email: 'localrootpageacc@gmail.com',
  password: 'asdfghjkl123',
  phoneCountryCode: '66',
  phoneNumber: '8499384034',
  verificationStatus: false
}

void t.test('get front page event test', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()

    for (const ev of [...localEventsList, ...officialEventsList]) {
      await client.query('delete from "events" where event_id = $1', [ev.id])
    }
  })

  const isThereOfficialUser = await client.query('select * from "users" where user_username = $1', [officialUser.username])
  if (isThereOfficialUser.rowCount === 0) {
    await client.query(
      'insert into users (user_username, user_email, user_password, user_phone_country_code, user_phone_number, user_verification_status) values ($1, $2, $3, $4, $5, $6::boolean)',
      [officialUser.username, officialUser.email, officialUser.password, officialUser.phoneCountryCode, officialUser.phoneNumber, true]
    )
  }

  const isThereLocalUser = await client.query('select * from "users" where user_username = $1', [localUser.username])
  if (isThereLocalUser.rowCount === 0) {
    await client.query(
      'insert into users (user_username, user_email, user_password, user_phone_country_code, user_phone_number, user_verification_status) values ($1, $2, $3, $4, $5, $6::boolean)',
      [localUser.username, localUser.email, localUser.password, localUser.phoneCountryCode, localUser.phoneNumber, false]
    )
  }

  for (const ev of [...localEventsList, ...officialEventsList]) {
    const targetEvent = await client.query('select * from "events" where event_id = $1', [ev.id])

    if (targetEvent.rowCount === 0) {
      const eventId = await client.query<{ event_id: string }>(
        `insert into events (
            event_id,
            user_username,
            event_name,
            event_description,
            event_website,
            event_venue_name,
            event_venue_coordinates,
            event_creation_date,
            event_opening_date,
            event_status,
            event_ticket_prices,
            event_min_ticket_price,
            event_max_ticket_price,
            event_minimum_age
          ) values ($1, $2, $3, $4, $5, $6, $7::point, $8, $9, $10, $11::jsonb, $12, $13, $14) on conflict (event_id) do nothing returning event_id`,
        [
          ev.id,
          ev.createdBy,
          ev.eventName,
          ev.description,
          ev.website,
          ev.venueName,
          `${ev.venueCoordinates.x}, ${ev.venueCoordinates.y}`,
          dayjs(ev.openingDate).subtract(7, 'days'),
          ev.openingDate,
          t_event_status.open,
          JSON.stringify(ev.ticketPrices.reduce<Record<string, number>>((obj, item) => {
            obj[item.color] = item.price
            return obj
          }, {})),
          Math.min(...ev.ticketPrices.map(t => t.price)),
          Math.max(...ev.ticketPrices.map(t => t.price)),
          ev.minimumAge
        ]
      )

      for await (const tag of ev.tags) {
        await client.query('insert into event_tags_bridge (event_tag_label, event_id) values ($1, $2)', [tag, eventId.rows[0].event_id])
      }

      for await (const datetime of ev.datetimes) {
        const datetimeId = await client.query<{ event_datetime_id: string }>(
          'insert into event_datetimes (event_datetime_id, event_id, event_start_datetime, event_end_datetime) values ($1, $2, $3, $4) returning event_datetime_id',
          [nanoid(), eventId.rows[0].event_id, datetime.start, datetime.end]
        )

        for await (const sectionRow of ev.sections) {
          for await (const section of sectionRow) {
            const sectionId = await client.query<{ event_section_id: string }>(
              'insert into event_sections (event_section_id, event_datetime_id, event_section_row_position, event_section_column_position) values ($1, $2, $3, $4) returning event_section_id',
              [nanoid(), datetimeId.rows[0].event_datetime_id, section.sectionRowPosition, section.sectionColumnPosition]
            )

            for await (const seatRow of section.seats) {
              for await (const seat of seatRow) {
                await client.query<event_seats>(
                  'insert into event_seats (event_seat_id, event_section_id, event_seat_price, event_seat_row_position, event_seat_column_position) values ($1, $2, $3, $4, $5)',
                  [nanoid(), sectionId.rows[0].event_section_id, seat.seatPrice, seat.seatRowPosition, seat.seatColumnPosition]
                )
              }
            }
          }
        }
      }
    }
  }

  void t.test('getting events list', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        url: '/events/root'
      })

      const json = response.json()

      t.type(json.official, Array)
      t.type(json.local, Array)

      t.strictSame(json.official[0].username, 'officialrootpageacc')
      t.strictSame(json.official[0].id, 'testgetevent4')
      t.strictSame(json.official[0].name, 'Test get event #4')
      t.strictSame(json.official[0].firstDatetime, dayjs().subtract(21, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString())
      t.strictSame(json.official[0].venueName, 'Rajamangkala Stadium')

      t.strictSame(json.official[1].username, 'officialrootpageacc')
      t.strictSame(json.official[1].id, 'testgetevent3')
      t.strictSame(json.official[1].name, 'Test get event #3')
      t.strictSame(json.official[1].firstDatetime, dayjs().subtract(23, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString())
      t.strictSame(json.official[1].venueName, 'Rajamangkala Stadium')

      t.strictSame(json.official[2].username, 'officialrootpageacc')
      t.strictSame(json.official[2].id, 'testgetevent2')
      t.strictSame(json.official[2].name, 'Test get event #2')
      t.strictSame(json.official[2].firstDatetime, dayjs().subtract(25, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString())
      t.strictSame(json.official[2].venueName, 'Rajamangkala Stadium')

      t.strictSame(json.official[3].username, 'officialrootpageacc')
      t.strictSame(json.official[3].id, 'testgetevent1')
      t.strictSame(json.official[3].name, 'Test get event #1')
      t.strictSame(json.official[3].firstDatetime, dayjs().subtract(27, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString())
      t.strictSame(json.official[3].venueName, 'Rajamangkala Stadium')

      t.strictSame(json.local[0].username, 'localrootpageacc')
      t.strictSame(json.local[0].id, 'testgeteventlocal4')
      t.strictSame(json.local[0].name, 'Test get local event #4')
      t.strictSame(json.local[0].firstDatetime, dayjs().subtract(13, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString())
      t.strictSame(json.local[0].venueName, 'Rajamangkala Stadium')

      t.strictSame(json.local[1].username, 'localrootpageacc')
      t.strictSame(json.local[1].id, 'testgeteventlocal3')
      t.strictSame(json.local[1].name, 'Test get local event #3')
      t.strictSame(json.local[1].firstDatetime, dayjs().subtract(15, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString())
      t.strictSame(json.local[1].venueName, 'Rajamangkala Stadium')

      t.strictSame(json.local[2].username, 'localrootpageacc')
      t.strictSame(json.local[2].id, 'testgeteventlocal2')
      t.strictSame(json.local[2].name, 'Test get local event #2')
      t.strictSame(json.local[2].firstDatetime, dayjs().subtract(17, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString())
      t.strictSame(json.local[2].venueName, 'Rajamangkala Stadium')

      t.strictSame(json.local[3].username, 'localrootpageacc')
      t.strictSame(json.local[3].id, 'testgeteventlocal1')
      t.strictSame(json.local[3].name, 'Test get local event #1')
      t.strictSame(json.local[3].firstDatetime, dayjs().subtract(19, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString())
      t.strictSame(json.local[3].venueName, 'Rajamangkala Stadium')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  t.end()
})
