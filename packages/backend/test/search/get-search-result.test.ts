import t from 'tap'

import createServer from '../../src/app'
import client from '../pool'

const ev = {
  eventName: 'The rightful music',
  createdBy: 'thatrich_test_guy',
  description: '## No description provided',
  website: 'www.github.com/sindresorhus/ky',
  venueName: 'Rajamangkala Stadium',
  venueCoordinates: {
    x: '13.755313892097984',
    y: '100.62221451070221'
  },
  openingDate: '2021-03-01T12:00:00.000+07:00',
  tags: ['concert', 'stand-up-comedy', 'technology'],
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
    },
    {
      start: '2021-03-08T20:00:00.000+07:00',
      end: '2021-03-09T00:00:00.000+07:00'
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

const ev2 = {
  eventName: 'The leftful musicque',
  createdBy: 'thatrich_test_guy',
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
    },
    {
      start: '2021-03-08T20:00:00.000+07:00',
      end: '2021-03-09T00:00:00.000+07:00'
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

void t.test('search function test', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query('delete from "events" where event_name in (\'The rightful music\', \'The leftful musicque\')')
  await client.query('delete from "users" where user_username = \'thatrich_test_guy\'')

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'thatrich_test_guy',
      email: 'thatrich_test_guy@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '495930489'
    }
  })

  const userResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'thatrich_test_guy@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  await app.inject({
    method: 'post',
    url: '/events',
    headers: {
      Authorization: `Bearer ${userResponse.json().token as string}`
    },
    payload: ev
  })

  await app.inject({
    method: 'post',
    url: '/events',
    headers: {
      Authorization: `Bearer ${userResponse.json().token as string}`
    },
    payload: ev2
  })

  void t.test('simple return when q is empty', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: ''
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 0)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for events with exact name', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 1)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for events with price range', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          priceRange: '< 2,400'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 1)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for events with not match price range', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          priceRange: '10,000 and above'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 0)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for events with date range', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          priceRange: '10,000 and above',
          dateRange: 'Today'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 0)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for events with date range', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          priceRange: '10,000 and above',
          dateRange: 'Next week'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 0)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for events with date range for events date not exists', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          dateRange: 'This week'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 0)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for events with tags', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          tags: ['Stand up comedy']
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 1)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for events with nonsense tags', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          tags: ['Amphitheater', 'Online']
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 0)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for events with both creator type', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          tags: ['Stand up comedy'],
          creatorType: ['Official', 'Local']
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 1)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for events with local creator type', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          tags: ['Stand up comedy'],
          creatorType: ['Local']
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 1)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for events official creator type', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          tags: ['Stand up comedy'],
          creatorType: ['Official']
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 0)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for event name with username', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'thatrich',
          type: 'Users'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 0)
      expect(response.json().users.length).toEqual( 1)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for next page', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'thatrich',
          type: 'Users',
          page: '2'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 0)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('searching for next page', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          page: '2'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json().events.length).toEqual( 0)
      expect(response.json().users.length).toEqual( 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
