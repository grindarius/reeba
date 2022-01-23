import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import dotenv from 'dotenv-flow'
import { nanoid } from 'nanoid'
import { dirname, resolve } from 'node:path'
import { performance } from 'node:perf_hooks'
import { exit } from 'node:process'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dayjs.extend(customParseFormat)

dotenv.config({
  path: resolve(__dirname, '..', 'packages', 'backend')
})

const client = new pg.Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME
})

const event = {
  event_id: nanoid(25),
  username: nanoid(5),
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

// console.log(event.sections.flat())

const flattenedSection = event.sections.flat()

const seatings = flattenedSection.map(section => {
  return section.seatings.flat()
})

// console.log(seatings.flat())

// client.connect(async () => {
//   // * insert event data
//   await client.query(
//     'insert into events (event_id, user_username) values ($1, $2)',
//     [event.event_id, event.username]
//   ).catch(error => {
//     throw new Error(error)
//   })

//   // * insert event pricings
//   const pricingIds = []
//   for await (const price of event.pricings) {
//     const id = await client.query(
//       'insert into event_pricings (pricing_id, event_id, event_price) values ($1, $2, $3) returning pricing_id',
//       [nanoid(25), event.event_id, price]
//     ).catch(error => {
//       throw new Error(error)
//     })

//     pricingIds.push(id.rows[0].pricing_id)
//   }

//   // * insert event datetimes
//   const datetimeIds = []
//   for await (const times of event.datetimes) {
//     const id = await client.query(
//       'insert into event_datetimes (event_datetime_id, event_id, event_start_datetime, event_end_datetime) values ($1, $2, $3, $4) returning event_datetime_id',
//       [nanoid(25), event.event_id, dayjs(times.from).format('YYYY-MM-DD HH:mm:ssZ'), dayjs(times.to).format('YYYY-MM-DD HH:mm:ssZ')]
//     )

//     datetimeIds.push(id.rows[0].event_datetime_id)
//   }

//   // * convert sections into record of section id
//   /**
//    * Contains section id of each section times the amount of times the show runs.
//    */
//   const sectionIds = []
//   for await (const datetime of datetimeIds) {
//     for await (const sectionRows of event.sections) {
//       for await (const section of sectionRows) {
//         const id = await client.query(
//           'insert into event_sections (section_id, event_id, section_row_position, section_column_position, datetime_id) values ($1, $2, $3, $4, $5) returning section_id',
//           [nanoid(25), event.event_id, section.section_row_position, section.section_column_position, datetime]
//         )

//         sectionIds.push(id.rows[0].section_id)
//       }
//     }
//   }

//   for await (const datetime of datetimeIds) {
//     for await (const section of sectionIds) {
//       for await (const seatRows of )
//     }
//   }

//   // * insert seats into table

//   console.log(sectionIds)
//   console.log(performance.now())
//   exit(1)
// })

client.connect().then(async () => {
  // * insert event id
  await client.query(
    'insert into events (event_id, user_username) values ($1, $2)',
    [event.event_id, event.username]
  ).catch(error => {
    throw new Error(error)
  })

  for await (const price of event.pricings) {
    await client.query(
      'insert into event_pricings (pricing_id, event_id, event_price) values ($1, $2, $3)',
      [price.id, event.event_id, price.price]
    ).catch(error => {
      throw new Error(error)
    })
  }

  for await (const times of event.datetimes) {
    await client.query(
      'insert into event_datetimes (event_datetime_id, event_id, event_start_datetime, event_end_datetime) values ($1, $2, $3, $4)',
      [times.id, event.event_id, dayjs(times.from).format('YYYY-MM-DD HH:mm:ssZ'), dayjs(times.to).format('YYYY-MM-DD HH:mm:ssZ')]
    )
  }

  // * map event.sections into different days before putting in.
  const sections = event.sections

  const sectionsObject = event.datetimes.reduce((previous, current) => {
    previous[current.id] = sections

    return previous
  }, {})

  const prices = await client.query(
    'select * from "event_pricings" where event_id = $1',
    [event.event_id]
  )

  for await (const [datetimeId, sections] of Object.entries(sectionsObject)) {
    for await (const sectionRow of sections) {
      for await (const sectionCell of sectionRow) {
        const sectionId = await client.query(
          'insert into event_sections (section_id, event_id, section_row_position, section_column_position, datetime_id) values ($1, $2, $3, $4, $5) returning section_id',
          [nanoid(32), event.event_id, sectionCell.section_row_position, sectionCell.section_column_position, datetimeId]
        )

        for (const seats of sectionCell.seatings.flat()) {
          await client.query(
            'insert into event_seats (seat_id, section_id, is_seat_taken, seat_row_position, seat_column_position, datetime_id, price_id) values ($1, $2, $3, $4, $5, $6, $7)',
            [nanoid(64), sectionId.rows[0].section_id, false, seats.seat_row_position, seats.seat_column_position, datetimeId, prices.rows.find((priceObj) => priceObj.event_price === seats.seat_price).pricing_id]
          )
        }
      }
    }
  }

  console.log(performance.now())
  console.log('done')
  client.end()
  exit(1)
})
