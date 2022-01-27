import { nanoid } from 'nanoid'

import { faker } from '@faker-js/faker'

// eslint-disable-next-line
const event = {
  event_id: nanoid(25),
  username: faker.helpers.userCard().username,
  datetimes: [
    {
      id: nanoid(16),
      from: '2022-01-08T16:00:00+07:00',
      to: '2022-01-08T20:00:00+07:00'
    },
    {
      id: nanoid(16),
      from: '2022-01-09T16:00:00+07:00',
      to: '2022-01-09T20:00:00+07:00'
    }
  ],
  pricings: [
    {
      id: nanoid(12),
      price: 2000
    },
    {
      id: nanoid(12),
      price: 3000
    }
  ],
  sections: [
    [
      {
        section_row_position: 0,
        section_column_position: 0,
        seatings: [
          [
            {
              seat_row_position: 0,
              seat_column_position: 0,
              seat_price: 2000
            },
            {
              seat_row_position: 0,
              seat_column_position: 1,
              seat_price: 2000
            }
          ],
          [
            {
              seat_row_position: 1,
              seat_column_position: 0,
              seat_price: 3000
            },
            {
              seat_row_position: 1,
              seat_column_position: 1,
              seat_price: 3000
            }
          ]
        ]
      },
      {
        section_row_position: 0,
        section_column_position: 1,
        seatings: [
          [
            {
              seat_row_position: 0,
              seat_column_position: 0,
              seat_price: 2000
            },
            {
              seat_row_position: 0,
              seat_column_position: 1,
              seat_price: 2000
            }
          ],
          [
            {
              seat_row_position: 1,
              seat_column_position: 0,
              seat_price: 3000
            },
            {
              seat_row_position: 1,
              seat_column_position: 1,
              seat_price: 3000
            }
          ]
        ]
      }
    ],
    [
      {
        section_row_position: 1,
        section_column_position: 0,
        seatings: [
          [
            {
              seat_row_position: 0,
              seat_column_position: 0,
              seat_price: 2000
            },
            {
              seat_row_position: 0,
              seat_column_position: 1,
              seat_price: 2000
            }
          ],
          [
            {
              seat_row_position: 1,
              seat_column_position: 0,
              seat_price: 3000
            },
            {
              seat_row_position: 1,
              seat_column_position: 1,
              seat_price: 3000
            }
          ]
        ]
      },
      {
        section_row_position: 1,
        section_column_position: 1,
        seatings: [
          [
            {
              seat_row_position: 0,
              seat_column_position: 0,
              seat_price: 2000
            },
            {
              seat_row_position: 0,
              seat_column_position: 1,
              seat_price: 2000
            }
          ],
          [
            {
              seat_row_position: 1,
              seat_column_position: 0,
              seat_price: 3000
            },
            {
              seat_row_position: 1,
              seat_column_position: 1,
              seat_price: 3000
            }
          ]
        ]
      }
    ]
  ]
}

// client.connect().then(async () => {
//   // * insert event id
//   await client.query(
//     'insert into events (event_id, user_username) values ($1, $2)',
//     [event.event_id, event.username]
//   ).catch(error => {
//     throw new Error(error)
//   })

//   for await (const datetime of event.datetimes) {
//     const datetimeId = await client.query(
//       'insert into event_datetimes (event_id, event_start_datetime, event_end_datetime) values ($1, $2, $3) returning event_datetime_id',
//       [event.event_id, dayjs(datetime.from).format('YYYY-MM-DD HH:mm:ssZ'), dayjs(datetime.to).format('YYYY-MM-DD HH:mm:ssZ')]
//     )

//     for await (const sectionRow of event.sections) {
//       for await (const section of sectionRow) {
//         const sectionId = await client.query(
//           'insert into event_sections (section_row_position, section_column_position, event_datetime_id) values ($1, $2, $3) returning event_section_id',
//           [section.section_row_position, section.section_column_position, datetimeId.rows[0].event_datetime_id]
//         )

//         for await (const seatRow of section.seatings) {
//           for await (const seat of seatRow) {
//             await client.query(
//               'insert into event_seats (event_section_id, event_price, event_seat_row_position, event_seat_column_position) values ($1, $2, $3, $4)',
//               [sectionId.rows[0].event_section_id, seat.seat_price, seat.seat_row_position, seat.seat_column_position]
//             )
//           }
//         }
//       }
//     }
//   }

//   console.log(performance.now())
//   console.log('done')
//   client.end()
//   exit(1)
// })
