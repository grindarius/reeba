import dayjs from 'dayjs'
import dotenv from 'dotenv-flow'
import { nanoid } from 'nanoid'
import { resolve } from 'node:path'
import { Client } from 'pg'
import t from 'tap'

import { event_seats, events, t_event_status } from '@reeba/common'

import createServer from '../../src/app'

dotenv.config({
  path: resolve(__dirname, '..', '..', 'src')
})

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME
})

const mockEvent = async (): Promise<void> => {
  const ev = {
    eventName: 'BTS Army',
    createdBy: 'grindarius',
    description: '## No description provided',
    website: 'www.github.com/sindresorhus/ky',
    venueName: 'Rajamangkala Stadium',
    venueCoordinates: {
      x: '13.755313892097984',
      y: '100.62221451070221'
    },
    openingDate: '2021-03-01 12:00:00.000 +07:00',
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
        start: '2021-03-07 20:00:00.000 +07:00',
        end: '2021-03-08 00:00:00.000 +07:00'
      },
      {
        start: '2021-03-08 20:00:00.000 +07:00',
        end: '2021-03-09 00:00:00.000 +07:00'
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
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 0,
          sectionColumnPosition: 1,
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
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ],
      [
        {
          sectionRowPosition: 1,
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
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        },
        {
          sectionRowPosition: 1,
          sectionColumnPosition: 1,
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
              }
            ],
            [
              {
                seatRowPosition: 1,
                seatColumnPosition: 0,
                seatPrice: 1000
              },
              {
                seatRowPosition: 1,
                seatColumnPosition: 1,
                seatPrice: 1000
              }
            ]
          ]
        }
      ]
    ]
  }

  // * check if the event already existed, if no, have to add new one.
  const targetEvent = await client.query<events, [string]>('select * from "events" where event_id = $1', ['grindarius_event_test'])

  if (targetEvent.rowCount === 0) {
    const eventId = await client.query<{ event_id: string }>(
      `insert into events (
          event_id,
          user_username,
          event_name,
          event_description,
          event_website,
          event_venue_name,
          event_venue_coordinates,
          event_creation_date,
          event_opening_date,
          event_status,
          event_ticket_prices,
          event_minimum_age
        ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::t_event_price[], $12) returning event_id`,
      [
        nanoid(),
        ev.createdBy,
        ev.eventName,
        ev.description,
        ev.website,
        ev.venueName,
        ev.venueCoordinates,
        dayjs().format('YYYY-MM-DD HH:mm:ss.SSS Z'),
        ev.openingDate,
        t_event_status.open,
        ev.ticketPrices.map(price => { return { price_color: price.color, price_value: price.price } }),
        ev.minimumAge
      ]
    )

    for await (const datetime of ev.datetimes) {
      const datetimeId = await client.query<{ event_datetime_id: string }>(
        'insert into event_datetimes (event_datetime_id, event_id, event_start_datetime, event_end_datetime) values ($1, $2, $3, $4) returning event_datetime_id',
        [nanoid(), eventId.rows[0].event_id, datetime.start, datetime.end]
      )

      for await (const sectionRow of ev.sections) {
        for await (const section of sectionRow) {
          const sectionId = await client.query<{ event_section_id: string }>(
            'insert into event_sections (event_section_id, event_datetime_id, event_section_row_position, event_section_column_position) values ($1, $2, $3, $4) returning event_section_id',
            [nanoid(), datetimeId.rows[0].event_datetime_id, section.sectionRowPosition, section.sectionColumnPosition]
          )

          for await (const seatRow of section.seats) {
            for await (const seat of seatRow) {
              await client.query<event_seats>(
                'insert into event_seats (event_seat_id, event_section_id, event_seat_price, event_seat_row_position, event_seat_column_position) values ($1, $2, $3, $4, $5)',
                [nanoid(), sectionId.rows[0].event_section_id, seat.seatPrice, seat.seatRowPosition, seat.seatColumnPosition]
              )
            }
          }
        }
      }
    }
  }
}

void t.todo('get individual event', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    await client.end()
  })

  try {
    await client.connect()
    await mockEvent()
  } catch (error) {
    t.error(error)
    t.fail()
  }
})
