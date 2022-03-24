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

  await app.inject({
    method: 'post',
    url: '/events',
    payload: ev
  })

  await app.inject({
    method: 'post',
    url: '/events',
    payload: ev2
  })

  void t.test('searching for events with exact name', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/search',
        query: {
          q: 'The rightful',
          priceRange: '< 1,200',
          tags: ['Stand up comedy']
        }
      })

      t.strictSame(response.statusCode, 200)
      t.strictSame(response.json().events.length, 1)
      t.strictSame(response.json().users.length, 0)
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
          q: 'The leftful',
          priceRange: '10,000 and above',
          tags: ['Stand up comedy']
        }
      })

      t.strictSame(response.statusCode, 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
