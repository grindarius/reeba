import dayjs from 'dayjs'
import dotenv from 'dotenv-flow'
import { nanoid } from 'nanoid'
import { resolve } from 'node:path'
import t from 'tap'

import createServer from '../../src/app'
import client from '../pool'
import { officialEventsList } from './get-event-data'

dotenv.config({
  path: resolve(__dirname, '..', '..'),
  silent: true
})

void t.test('get sections and seats from the API', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    const tid = await client.query('select transaction_id from "transactions" where user_username = \'therichchick\'')
    await client.query('delete from "transaction_details" where transaction_id = $1', [tid.rows[0].transaction_id])

    await client.query('delete from "events" where event_name = \'geteventseats\'')
    await client.query('delete from "transactions" where user_username = \'therichchick\'')
  })

  const ev = {
    ...officialEventsList[0],
    ...{
      eventName: 'geteventseats',
      createdBy: 'geteveseats',
      datetimes: [
        {
          start: dayjs().subtract(60, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString(),
          end: dayjs().subtract(60, 'days').add(2, 'hours').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString()
        },
        {
          start: dayjs().subtract(55, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString(),
          end: dayjs().subtract(55, 'days').add(2, 'hours').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString()
        }
      ],
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
                  seatPrice: 1000
                },
                {
                  seatRowPosition: 0,
                  seatColumnPosition: 1,
                  seatPrice: 1500
                }
              ]
            ]
          }
        ]
      ]
    }
  }

  const isUser1Existed = await client.query('select * from "users" where user_username = $1', ['geteveseats'])
  const isUser2Existed = await client.query('select * from "users" where user_username = $1', ['therichchick'])

  if (isUser1Existed.rows.length === 0) {
    await app.inject({
      method: 'post',
      url: '/auth/signup',
      payload: {
        username: 'geteveseats',
        email: 'geteveseats@hotmail.com',
        password: 'asdfghjkl123',
        phoneCountryCode: '66',
        phoneNumber: '49850948584'
      }
    })
  }

  if (isUser2Existed.rows.length === 0) {
    await app.inject({
      method: 'post',
      url: '/auth/signup',
      payload: {
        username: 'therichchick',
        email: 'therichchick@hotmail.com',
        password: 'asdfghjkl123',
        phoneCountryCode: '66',
        phoneNumber: '49853948584'
      }
    })
  }

  const user1Response = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'geteveseats@hotmail.com',
      password: 'asdfghjkl123'
    }
  })

  const token = user1Response.json<{ token: string }>().token

  const evId = await app.inject({
    method: 'post',
    url: '/events',
    payload: ev,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const datetimeIds = await client.query<{ event_datetime_id: string }>('select event_datetime_id from "event_datetimes" where event_id = $1', [evId.json<{ eventId: string }>().eventId])

  void t.test('no eventId params', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/events//seats',
        query: {
          datetimeId: datetimeIds.rows[0].event_datetime_id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      t.strictSame(response.statusCode, 400)
      t.strictSame(response.json().message, 'params should have required property \'eventId\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('no event datetime id query', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/events/' + evId.json<{ eventId: string }>().eventId + '/seats',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      t.strictSame(response.statusCode, 400)
      t.strictSame(response.json().message, 'querystring should have required property \'datetimeId\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('nonexistent eventId', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/events/blahblahblah/seats',
        headers: {
          Authorization: `Bearer ${token}`
        },
        query: {
          datetimeId: datetimeIds.rows[0].event_datetime_id
        }
      })

      t.strictSame(response.statusCode, 404)
      t.strictSame(response.json().message, 'Event not found')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('nonexistent datetimeId', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/events/' + evId.json<{ eventId: string }>().eventId + '/seats',
        headers: {
          Authorization: `Bearer ${token}`
        },
        query: {
          datetimeId: 'ksndfdnfienfe'
        }
      })

      t.strictSame(response.statusCode, 404)
      t.strictSame(response.json().message, 'Event datetime not found')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test('successful call', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/events/' + evId.json<{ eventId: string }>().eventId + '/seats',
        headers: {
          Authorization: `Bearer ${token}`
        },
        query: {
          datetimeId: datetimeIds.rows[0].event_datetime_id
        }
      })

      t.strictSame(response.statusCode, 200)
      t.strictSame(response.json().ticketPrices, [
        { color: '#4C9141', price: 1000 },
        { color: '#C1876B', price: 1500 }
      ])
      // @ts-expect-error any
      t.strictSame(response.json().sections.map(s => {
        return {
          sectionRowPosition: s.sectionRowPosition,
          sectionColumnPosition: s.sectionColumnPosition,
          seatRowPosition: s.seatRowPosition,
          seatColumnPosition: s.seatColumnPosition,
          seatPrice: s.seatPrice,
          isSeatTaken: s.isSeatTaken
        }
      }), [
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seatRowPosition: 0,
          seatColumnPosition: 0,
          seatPrice: 1000,
          isSeatTaken: false
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seatRowPosition: 0,
          seatColumnPosition: 1,
          seatPrice: 1500,
          isSeatTaken: false
        }
      ])

      // @ts-expect-error s being any
      response.json().sections.forEach(s => {
        t.type(s.sectionId, 'string')
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  const seats = await client.query(
    `select
      event_seats.*
    from "event_seats"
    inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
    inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
    inner join "events" on event_datetimes.event_id = events.event_id
    where events.event_id = $1 and event_datetimes.event_datetime_id = $2`,
    [evId.json().eventId, datetimeIds.rows[0].event_datetime_id]
  )

  const tid = await client.query('insert into "transactions" (transaction_id, user_username) values ($1, $2) returning transaction_id', [nanoid(), 'therichchick'])
  await client.query('insert into "transaction_details" (event_seat_id, transaction_id) values ($1, $2)', [seats.rows.find(s => s.event_seat_price === 1500)?.event_seat_id ?? 'unknown', tid.rows[0].transaction_id])

  void t.test('false seatings when it\'s bought', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/events/' + evId.json<{ eventId: string }>().eventId + '/seats',
        headers: {
          Authorization: `Bearer ${token}`
        },
        query: {
          datetimeId: datetimeIds.rows[0].event_datetime_id
        }
      })

      t.strictSame(response.statusCode, 200)
      t.strictSame(response.json().ticketPrices, [
        { color: '#4C9141', price: 1000 },
        { color: '#C1876B', price: 1500 }
      ])
      // @ts-expect-error any
      t.strictSame(response.json().sections.map(s => {
        return {
          sectionRowPosition: s.sectionRowPosition,
          sectionColumnPosition: s.sectionColumnPosition,
          seatRowPosition: s.seatRowPosition,
          seatColumnPosition: s.seatColumnPosition,
          seatPrice: s.seatPrice,
          isSeatTaken: s.isSeatTaken
        }
      }), [
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seatRowPosition: 0,
          seatColumnPosition: 0,
          seatPrice: 1000,
          isSeatTaken: false
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seatRowPosition: 0,
          seatColumnPosition: 1,
          seatPrice: 1500,
          isSeatTaken: true
        }
      ])

      // @ts-expect-error s being any
      response.json().sections.forEach(s => {
        t.type(s.sectionId, 'string')
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('another datetime should not be affected', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/events/' + evId.json<{ eventId: string }>().eventId + '/seats',
        headers: {
          Authorization: `Bearer ${token}`
        },
        query: {
          datetimeId: datetimeIds.rows[1].event_datetime_id
        }
      })

      t.strictSame(response.statusCode, 200)
      t.strictSame(response.json().ticketPrices, [
        { color: '#4C9141', price: 1000 },
        { color: '#C1876B', price: 1500 }
      ])
      // @ts-expect-error any
      t.strictSame(response.json().sections.map(s => {
        return {
          sectionRowPosition: s.sectionRowPosition,
          sectionColumnPosition: s.sectionColumnPosition,
          seatRowPosition: s.seatRowPosition,
          seatColumnPosition: s.seatColumnPosition,
          seatPrice: s.seatPrice,
          isSeatTaken: s.isSeatTaken
        }
      }), [
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seatRowPosition: 0,
          seatColumnPosition: 0,
          seatPrice: 1000,
          isSeatTaken: false
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 0,
          seatRowPosition: 0,
          seatColumnPosition: 1,
          seatPrice: 1500,
          isSeatTaken: false
        }
      ])

      // @ts-expect-error s being any
      response.json().sections.forEach(s => {
        t.type(s.sectionId, 'string')
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
