import dayjs from 'dayjs'
import dotenv from 'dotenv-flow'
import FormData from 'form-data'
import { nanoid } from 'nanoid'
import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'
import t from 'tap'

import { event_seats, t_event_status } from '@reeba/common'

import createServer from '../../src/app'
import client from '../pool'

dotenv.config({
  path: resolve(__dirname, '..', '..'),
  silent: true
})

const tagList = [
  'amphitheater',
  'business',
  'concert',
  'entertainment',
  'fan-meet',
  'gameshow',
  'lifestyle',
  'live',
  'musical',
  'online',
  'opera',
  'seminar',
  'stand-up-comedy',
  'technology',
  'variety'
]

const mockEvent = async (): Promise<void> => {
  const user = await client.query('select * from "users" where user_username = \'posteventimageuser\'')

  if (user.rowCount <= 0) {
    await client.query('insert into "users" (user_username, user_email, user_password, user_phone_country_code, user_phone_number) values ($1, $2, $3, $4, $5)',
      ['posteventimageuser', 'postevenimageuser@gmail.com', 'posteventimagetest_123', '334', '4304849384']
    )
  }

  const ev = {
    id: 'posteventimagetest555',
    eventName: 'lido',
    createdBy: 'posteventimageuser',
    description: '## No description provided',
    eventImagePath: '',
    website: 'www.github.com/sindresorhus/ky',
    venueName: 'LIDO CONNECT HALL 1',
    venueCoordinates: {
      x: '13.74593937535103',
      y: '100.53257672630755'
    },
    openingDate: '2021-03-01T12:00:00.000+07:00',
    tags: ['stand-up-comedy', 'fan-meet'],
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
  const evClone = { ...ev, eventImagePath: '', id: 'posteventemptystring' }

  // * check if event tags is there, if not, add it.
  for await (const preparedTag of tagList) {
    await client.query('insert into event_tags (event_tag_label) values ($1) on conflict (event_tag_label) do nothing', [preparedTag])
  }

  for (const indivEvent of [ev, evClone]) {
    // * this is a user associated with creating event. check if he's there, if not, get him there.
    const isEVExists = await client.query('select * from "events" where event_id = $1', [indivEvent.id])

    if (isEVExists.rowCount === 0) {
      const eventId = await client.query<{ event_id: string }>(
        `insert into events (
            event_id,
            user_username,
            event_name,
            event_description,
            event_cover_image_path,
            event_website,
            event_venue_name,
            event_venue_coordinates,
            event_creation_date,
            event_opening_date,
            event_status,
            event_ticket_prices,
            event_minimum_age
          ) values ($1, $2, $3, $4, $5, $6, $7, $8::point, $9, $10, $11, $12, $13) returning event_id`,
        [
          indivEvent.id,
          indivEvent.createdBy,
          indivEvent.eventName,
          indivEvent.description,
          indivEvent.eventImagePath,
          indivEvent.website,
          indivEvent.venueName,
          `${indivEvent.venueCoordinates.x}, ${indivEvent.venueCoordinates.y}`,
          dayjs().toDate(),
          indivEvent.openingDate,
          t_event_status.open,
          // eslint-disable-next-line
          JSON.stringify(indivEvent.ticketPrices.reduce((obj, item) => (obj[item.color] = item.price, obj), {} as Record<string, number>)),
          indivEvent.minimumAge
        ]
      )

      for await (const tag of indivEvent.tags) {
        await client.query('insert into event_tags_bridge (event_tag_label, event_id) values ($1, $2)', [tag, eventId.rows[0].event_id])
      }

      for await (const datetime of indivEvent.datetimes) {
        const datetimeId = await client.query<{ event_datetime_id: string }>(
          'insert into event_datetimes (event_datetime_id, event_id, event_start_datetime, event_end_datetime) values ($1, $2, $3, $4) returning event_datetime_id',
          [nanoid(), eventId.rows[0].event_id, datetime.start, datetime.end]
        )

        for await (const sectionRow of indivEvent.sections) {
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
}

void t.test('post event image', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  try {
    await mockEvent()
  } catch (error) {
    t.error(error)
    t.fail()
  }

  void t.test('passing empty string as eventId', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/event-images/'
      })

      t.strictSame(response.statusCode, 400, 'status code from posting without eventId')
      t.strictSame(response.json().message, 'params should have required property \'eventId\'', 'error message')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('passing unknown eventId', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/event-images/unknown_eventId'
      })

      t.strictSame(response.statusCode, 404, 'status code from posting without unknown_eventId')
      t.strictSame(response.json().message, 'event not found', 'error message')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('posting image to existing event', async t => {
    const form = new FormData()
    form.append('image', createReadStream(resolve(__dirname, 'test-event-image.png')))

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/event-images/posteventimagetest555',
        payload: form,
        headers: form.getHeaders()
      })

      t.strictSame(response.statusCode, 200, 'status code from posting image')
      t.strictSame(response.json().message, 'complete', 'message from posting image')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('posting unmatched file extension', async t => {
    const form = new FormData()
    form.append('image', createReadStream(resolve(__dirname, 'unmatched-file-extension.md')))

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/event-images/posteventimagetest555',
        payload: form,
        headers: form.getHeaders()
      })

      t.strictSame(response.statusCode, 400, 'status code from posting unmatched file extension')
      t.strictSame(response.json().message, 'unmatched file extension', 'message from posting unmatched file extension')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  t.end()
})
