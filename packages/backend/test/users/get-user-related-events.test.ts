import dotenv from 'dotenv-flow'
import { resolve } from 'node:path'
import { Client } from 'pg'
import t from 'tap'

import createServer from '../../src/app'

dotenv.config({
  path: resolve(__dirname, '..', '..'),
  silent: true
})

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME
})

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

void t.test('get user test', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    await client.end()
  })

  const aryaToken = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'aryastark@gmail.com',
      password: 'aryastark'
    }
  })

  const exist = await client.query(
    'select * from "users" where user_username = $1',
    ['relatedevents']
  )

  if (exist.rowCount === 0) {
    await app.inject({
      method: 'post',
      url: '/auth/signup',
      payload: {
        username: 'relatedevents',
        email: 'relatedevents@gmail.com',
        password: 'relatedevents',
        phoneCountryCode: '66',
        phoneNumber: '223344556'
      }
    })
  }

  void t.test('get token', async t => {
    const userToken = await app.inject({
      method: 'post',
      url: '/auth/signin',
      payload: {
        email: 'relatedevents@gmail.com',
        password: 'relatedevents'
      }
    })

    t.type(aryaToken.json().token, 'string')
    t.type(userToken.json().token, 'string')
  })
})
