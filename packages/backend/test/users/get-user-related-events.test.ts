import dotenv from 'dotenv-flow'
import { resolve } from 'node:path'
import t from 'tap'

import createServer from '../../src/app'

dotenv.config({
  path: resolve(__dirname, '..', '..'),
  silent: true
})

// const client = new Client({
//   user: process.env.POSTGRES_USERNAME,
//   password: process.env.POSTGRES_PASSWORD,
//   host: process.env.POSTGRES_HOSTNAME,
//   port: Number(process.env.POSTGRES_PORT),
//   database: process.env.POSTGRES_DBNAME
// })

// const ev = {
//   eventName: 'BTS Army',
//   createdBy: 'relatedevents',
//   description: '## No description provided',
//   website: 'www.github.com/sindresorhus/ky',
//   venueName: 'Rajamangkala Stadium',
//   venueCoordinates: {
//     x: '13.755313892097984',
//     y: '100.62221451070221'
//   },
//   openingDate: '2021-03-01T12:00:00.000+07:00',
//   tags: ['concert', 'stand-up-comedy'],
//   ticketPrices: [
//     {
//       color: '#4C9141',
//       price: 1000
//     },
//     {
//       color: '#C1876B',
//       price: 1500
//     }
//   ],
//   datetimes: [
//     {
//       start: '2021-03-07T20:00:00.000+07:00',
//       end: '2021-03-08T00:00:00.000+07:00'
//     },
//     {
//       start: '2021-03-08T20:00:00.000+07:00',
//       end: '2021-03-09T00:00:00.000+07:00'
//     }
//   ],
//   minimumAge: 18,
//   sections: [
//     [
//       {
//         sectionRowPosition: 0,
//         sectionColumnPosition: 0,
//         seats: [
//           [
//             {
//               seatRowPosition: 0,
//               seatColumnPosition: 0,
//               seatPrice: 1500
//             },
//             {
//               seatRowPosition: 0,
//               seatColumnPosition: 1,
//               seatPrice: 1500
//             }
//           ],
//           [
//             {
//               seatRowPosition: 1,
//               seatColumnPosition: 0,
//               seatPrice: 1000
//             },
//             {
//               seatRowPosition: 1,
//               seatColumnPosition: 1,
//               seatPrice: 1000
//             }
//           ]
//         ]
//       },
//       {
//         sectionRowPosition: 0,
//         sectionColumnPosition: 1,
//         seats: [
//           [
//             {
//               seatRowPosition: 0,
//               seatColumnPosition: 0,
//               seatPrice: 1500
//             },
//             {
//               seatRowPosition: 0,
//               seatColumnPosition: 1,
//               seatPrice: 1500
//             }
//           ],
//           [
//             {
//               seatRowPosition: 1,
//               seatColumnPosition: 0,
//               seatPrice: 1000
//             },
//             {
//               seatRowPosition: 1,
//               seatColumnPosition: 1,
//               seatPrice: 1000
//             }
//           ]
//         ]
//       }
//     ],
//     [
//       {
//         sectionRowPosition: 1,
//         sectionColumnPosition: 0,
//         seats: [
//           [
//             {
//               seatRowPosition: 0,
//               seatColumnPosition: 0,
//               seatPrice: 1500
//             },
//             {
//               seatRowPosition: 0,
//               seatColumnPosition: 1,
//               seatPrice: 1500
//             }
//           ],
//           [
//             {
//               seatRowPosition: 1,
//               seatColumnPosition: 0,
//               seatPrice: 1000
//             },
//             {
//               seatRowPosition: 1,
//               seatColumnPosition: 1,
//               seatPrice: 1000
//             }
//           ]
//         ]
//       },
//       {
//         sectionRowPosition: 1,
//         sectionColumnPosition: 1,
//         seats: [
//           [
//             {
//               seatRowPosition: 0,
//               seatColumnPosition: 0,
//               seatPrice: 1500
//             },
//             {
//               seatRowPosition: 0,
//               seatColumnPosition: 1,
//               seatPrice: 1500
//             }
//           ],
//           [
//             {
//               seatRowPosition: 1,
//               seatColumnPosition: 0,
//               seatPrice: 1000
//             },
//             {
//               seatRowPosition: 1,
//               seatColumnPosition: 1,
//               seatPrice: 1000
//             }
//           ]
//         ]
//       }
//     ]
//   ]
// }

void t.test('get user related events', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  const aryaToken = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'aryastark@gmail.com',
      password: 'aryastark'
    }
  })

  void t.test('no username', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/users//events',
        headers: {
          Authorization: `Bearer ${aryaToken.json().token as string}`
        }
      })

      t.strictSame(response.statusCode, 400)
      t.strictSame(response.json().message, 'params should have required property \'username\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('unknown username', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/users/asdfcsdfe/events',
        headers: {
          Authorization: `Bearer ${aryaToken.json().token as string}`
        }
      })

      t.strictSame(response.statusCode, 404)
      t.strictSame(response.json().message, 'User not found')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('get token', async t => {
    try {
      const resp = await app.inject({
        method: 'get',
        url: '/users/aryastark/events',
        headers: {
          Authorization: `Bearer ${aryaToken.json().token as string}`
        }
      })
      t.strictSame(resp.json().created.length, 0)
      t.strictSame(resp.json().attended.length, 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
