import dayjs from 'dayjs'

import { numberToLetters } from '@reeba/common'

import createServer from '../../src/app'
import client from '../pool'

const ev = {
  eventName: 'This guy will buy it',
  createdBy: 'getmytickets',
  description: '## No description provided',
  website: 'www.github.com/sindresorhus/ky',
  venueName: 'Rajamangkala Stadium',
  venueCoordinates: {
    x: '13.755313892097984',
    y: '100.62221451070221'
  },
  openingDate: '2021-03-01T12:00:00.000+07:00',
  tags: ['concert', 'stand-up-comedy'],
  ticketPrices: [
    {
      color: '#4C9141',
      price: 1000
    },
    {
      color: '#C1876B',
      price: 1500
    }
  ],
  datetimes: [
    {
      start: '2021-03-07T20:00:00.000+07:00',
      end: '2021-03-08T00:00:00.000+07:00'
    }
  ],
  minimumAge: 18,
  sections: [
    [
      {
        sectionRowPosition: 0,
        sectionColumnPosition: 0,
        seats: [
          [
            {
              seatRowPosition: 0,
              seatColumnPosition: 0,
              seatPrice: 1500
            },
            {
              seatRowPosition: 0,
              seatColumnPosition: 1,
              seatPrice: 1500
            },
            {
              seatRowPosition: 0,
              seatColumnPosition: 2,
              seatPrice: 1000
            },
            {
              seatRowPosition: 0,
              seatColumnPosition: 3,
              seatPrice: 1000
            },
            {
              seatRowPosition: 0,
              seatColumnPosition: 4,
              seatPrice: 1000
            }
          ]
        ]
      }
    ]
  ]
}

void t.test('getting list of user tickets', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query('delete from "events" where user_username = $1', ['getmytickets'])
  await client.query('delete from "users" where user_username in ($1, $2)', ['getmytickets', 'theseatbuyerguy'])

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'getmytickets',
      email: 'getmytickets@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '948345849'
    }
  })

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'theseatbuyerguy',
      email: 'theseatbuyerguy@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '384938492'
    }
  })

  const eventHolderResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'getmytickets@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  const seatBuyerResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'theseatbuyerguy@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  const eventHolderToken = eventHolderResponse.json<{ token: string }>().token
  const seatBuyerToken = seatBuyerResponse.json<{ token: string }>().token

  await app.inject({
    method: 'post',
    url: '/events',
    headers: {
      Authorization: `Bearer ${eventHolderToken}`
    },
    payload: ev
  })

  const submittedEvent = await client.query(
    `select
      events.event_id,
      events.event_name,
      events.event_venue_name,
      event_datetimes.event_datetime_id,
      event_datetimes.event_start_datetime,
      event_datetimes.event_end_datetime,
      event_sections.event_section_id,
      event_sections.event_section_row_position,
      event_sections.event_section_column_position,
      event_seats.event_seat_id,
      event_seats.event_seat_price,
      event_seats.event_seat_row_position,
      event_seats.event_seat_column_position
    from "event_seats"
    inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
    inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
    inner join "events" on event_datetimes.event_id = events.event_id
    where events.user_username = $1`,
    ['getmytickets']
  )

  await app.inject({
    method: 'post',
    url: '/transactions',
    headers: {
      Authorization: `Bearer ${seatBuyerToken}`
    },
    payload: {
      eventId: submittedEvent.rows[0].event_id,
      datetimeId: submittedEvent.rows[0].event_datetime_id,
      sectionId: submittedEvent.rows[0].event_section_id,
      seatIds: [submittedEvent.rows[0].event_seat_id]
    }
  })

  void t.test('getting events for no username', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/accounts//tickets',
        headers: {
          Authorization: `Bearer ${seatBuyerToken}`
        }
      })

      expect(response.statusCode).toEqual( 400)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('getting events of unknown user', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/accounts/who/tickets',
        headers: {
          Authorization: `Bearer ${seatBuyerToken}`
        }
      })

      expect(response.json()).toEqual( { events: [] })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test('successful call', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/accounts/theseatbuyerguy/tickets',
        headers: {
          Authorization: `Bearer ${seatBuyerToken}`
        }
      })

      expect(response.statusCode).toEqual( 200)

      const checks = await client.query(
        `select
          events.event_id,
          events.event_name,
          events.event_venue_name,
          events.user_username,
          event_datetimes.event_datetime_id,
          event_datetimes.event_start_datetime,
          event_datetimes.event_end_datetime,
          transactions.transaction_id,
          transaction_details.event_seat_id,
          event_seats.event_seat_price,
          event_seats.event_seat_row_position,
          event_seats.event_seat_column_position,
          event_sections.event_section_id,
          event_sections.event_section_row_position,
          event_sections.event_section_column_position
        from "transaction_details"
        inner join "transactions" on transaction_details.transaction_id = transactions.transaction_id
        inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        where transactions.user_username = $1`,
        ['theseatbuyerguy']
      )

      t.strictSame(response.json(), {
        events: [
          {
            id: checks.rows[0].event_id,
            name: checks.rows[0].event_name,
            username: checks.rows[0].user_username,
            transactionId: checks.rows[0].transaction_id,
            venueName: checks.rows[0].event_venue_name,
            time: {
              id: checks.rows[0].event_datetime_id,
              start: dayjs(checks.rows[0].event_start_datetime).toISOString(),
              end: dayjs(checks.rows[0].event_end_datetime).toISOString()
            },
            seats: [
              {
                id: checks.rows[0].event_seat_id,
                name: `${numberToLetters(checks.rows[0].event_seat_row_position)}${checks.rows[0].event_seat_column_position as number + 1}`,
                rowPosition: checks.rows[0].event_seat_row_position,
                columnPosition: checks.rows[0].event_seat_column_position
              }
            ],
            section: {
              id: checks.rows[0].event_section_id,
              name: `${numberToLetters(checks.rows[0].event_section_row_position)}${checks.rows[0].event_section_column_position as number + 1}`,
              rowPosition: checks.rows[0].event_section_row_position,
              columnPosition: checks.rows[0].event_section_column_position
            },
            totalPrice: checks.rows[0].event_seat_price
          }]
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
