import dayjs from 'dayjs'
import dotenv from 'dotenv-flow'
import { nanoid } from 'nanoid'
import { resolve } from 'node:path'
import t from 'tap'

import { event_seats, events, t_event_status } from '@reeba/common'

import createServer from '../../src/app'
import client from '../pool'

dotenv.config({
  path: resolve(__dirname, '..', '..', 'src'),
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
  const ev = {
    eventName: 'BTS Army',
    createdBy: 'getindiveventtest',
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

  // * this is a user associated with creating event. check if he's there, if not, get him there.
  const targetUser = await client.query('select * from "users" where user_username = \'getindiveventtest\'')

  if (targetUser.rowCount === 0) {
    await client.query(
      'insert into users (user_username, user_email, user_password, user_phone_country_code, user_phone_number) values ($1, $2, $3, $4, $5)',
      ['getindiveventtest', 'getindivevent@gmail.com', 'asdfhjkl123', '66', '39848743']
    )
  }

  // * check if event tags is there, if not, add it.
  for await (const preparedTag of tagList) {
    await client.query('insert into event_tags (event_tag_label) values ($1) on conflict (event_tag_label) do nothing', [preparedTag])
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
        ) values ($1, $2, $3, $4, $5, $6, $7::point, $8, $9, $10, $11, $12) returning event_id`,
      [
        'grindarius_event_test',
        ev.createdBy,
        ev.eventName,
        ev.description,
        ev.website,
        ev.venueName,
        `${ev.venueCoordinates.x}, ${ev.venueCoordinates.y}`,
        dayjs().toDate(),
        ev.openingDate,
        t_event_status.open,
        // eslint-disable-next-line
        JSON.stringify(ev.ticketPrices.reduce((obj, item) => (obj[item.color] = item.price, obj) ,{} as Record<string, number>)),
        ev.minimumAge
      ]
    )

    for await (const tag of ev.tags) {
      await client.query('insert into event_tags_bridge (event_tag_label, event_id) values ($1, $2)', [tag, eventId.rows[0].event_id])
    }

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

void t.test('get individual event', async t => {
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

  void t.test('get event with non existent id', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        url: '/events/unknown_event_id'
      })

      t.strictSame(response.statusCode, 404)
      t.strictSame(response.json().message, 'event not found')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('get event with empty string name', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        url: '/events/'
      })

      t.strictSame(response.statusCode, 400)
      t.strictSame(response.json().message, 'params should have required property \'eventId\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('get event with correct id', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        url: '/events/grindarius_event_test'
      })

      const json = response.json<{ name: string, createdBy: string, description: string, website: string, venueName: string, venueCoordinates: { x: string, y: string }, openingDate: string, tags: Array<string>, datetimes: Array<{ datetimeId: string, start: string, end: string }>}>()

      t.strictSame(response.statusCode, 200, 'status code from correct response')
      t.strictSame(json.name, 'BTS Army')
      t.strictSame(json.createdBy, 'getindiveventtest')
      t.strictSame(json.description, '## No description provided')
      t.strictSame(json.website, 'www.github.com/sindresorhus/ky')
      t.strictSame(json.venueName, 'Rajamangkala Stadium')
      t.strictSame(json.venueCoordinates, { x: '13.755313892097984', y: '100.62221451070221' })
      t.strictSame(json.openingDate, '2021-03-01T05:00:00.000Z')
      t.strictSame(json.tags, ['concert', 'stand-up-comedy'])
      t.strictSame(json.datetimes.map(dt => {
        return {
          start: dt.start,
          end: dt.end
        }
      }), [
        {
          start: '2021-03-07T13:00:00.000Z',
          end: '2021-03-07T17:00:00.000Z'
        },
        {
          start: '2021-03-08T13:00:00.000Z',
          end: '2021-03-08T17:00:00.000Z'
        }
      ])
      json.datetimes.forEach(dt => {
        t.type(dt.datetimeId, 'string')
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  t.end()
})
