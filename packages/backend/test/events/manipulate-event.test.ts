import t from 'tap'

import createServer from '../../src/app'
import client from '../pool'

void t.test('getting events data for admin', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query('delete from "events" where user_username = $1', ['evguy'])
  await client.query('delete from "users" where user_username in ($1, $2)', ['fakeadminfather', 'evguy'])

  const adminResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'sansastark@gmail.com',
      password: 'sansastark'
    }
  })

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'fakeadminfather',
      email: 'fakeadminfather@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '9483943483',
      iso31662: 'TH'
    }
  })

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'evguy',
      email: 'evguy@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '24839435483',
      iso31662: 'TH'
    }
  })

  const eventOwnerResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'evguy@gmail.com',
      password: 'asdfghjkl123'
    }
  })
  const eventOwnerToken = eventOwnerResponse.json<{ token: string }>().token

  const evidRespoints = await app.inject({
    method: 'post',
    url: '/events',
    headers: {
      Authorization: `Bearer ${eventOwnerToken}`
    },
    payload: {
      eventName: 'This guy will buy it',
      createdBy: 'evguy',
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
  })
  const eventId = evidRespoints.json<{ eventId: string }>().eventId

  const fakeAdminResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'fakeadminfather@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  const adminToken = adminResponse.json<{ token: string }>().token
  const fakeAdminToken = fakeAdminResponse.json<{ token: string }>().token

  void t.test('403 for fake admin', async t => {
    try {
      const response = await app.inject({
        method: 'post',
        url: `/events/${eventId}/manipulate`,
        headers: {
          Authorization: `Bearer ${fakeAdminToken}`
        }
      })

      t.strictSame(response.json().message, 'forbidden')
      expect(response.statusCode).toEqual( 403)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('nonexistent target status', async t => {
    try {
      const response = await app.inject({
        method: 'post',
        url: `/events/${eventId}/manipulate`,
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        payload: {
          targetStatus: ''
        }
      })

      t.strictSame(response.json().message, 'body should have required property \'targetStatus\'')
      expect(response.statusCode).toEqual( 400)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('nonexistent event', async t => {
    try {
      const response = await app.inject({
        method: 'post',
        url: `/events/${'1234'}/manipulate`,
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        payload: {
          targetStatus: 'open'
        }
      })

      expect(response.statusCode).toEqual( 404)
      t.strictSame(response.json().message, 'event not found')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('successful call', async t => {
    try {
      const response = await app.inject({
        method: 'post',
        url: `/events/${eventId}/manipulate`,
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        payload: {
          targetStatus: 'open'
        }
      })

      expect(response.statusCode).toEqual( 200)
      t.strictSame(response.json().message, 'complete')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
