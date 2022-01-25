/**
 * This sample file is used with no_event.sql file
 */

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

client.connect().then(async () => {
  // * insert event id
  await client.query(
    'insert into events (event_id, user_username) values ($1, $2)',
    [event.event_id, event.username]
  ).catch(error => {
    throw new Error(error)
  })

  for await (const datetime of event.datetimes) {
    const datetimeId = await client.query(
      'insert into event_datetimes (event_id, event_start_datetime, event_end_datetime) values ($1, $2, $3) returning event_datetime_id',
      [event.event_id, dayjs(datetime.from).format('YYYY-MM-DD HH:mm:ssZ'), dayjs(datetime.to).format('YYYY-MM-DD HH:mm:ssZ')]
    )

    for await (const sectionRow of event.sections) {
      for await (const section of sectionRow) {
        const sectionId = await client.query(
          'insert into event_sections (section_row_position, section_column_position, event_datetime_id) values ($1, $2, $3) returning event_section_id',
          [section.section_row_position, section.section_column_position, datetimeId.rows[0].event_datetime_id]
        )

        for await (const seatRow of section.seatings) {
          for await (const seat of seatRow) {
            await client.query(
              'insert into event_seats (event_section_id, event_price, event_seat_row_position, event_seat_column_position) values ($1, $2, $3, $4)',
              [sectionId.rows[0].event_section_id, seat.seat_price, seat.seat_row_position, seat.seat_column_position]
            )
          }
        }
      }
    }
  }

  console.log(performance.now())
  console.log('done')
  client.end()
  exit(1)
})
