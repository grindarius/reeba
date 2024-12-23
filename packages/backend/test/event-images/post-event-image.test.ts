import { createReadStream } from "node:fs"
import { resolve } from "node:path"
import dayjs from "dayjs"
import dotenv from "dotenv-flow"
import FormData from "form-data"
import { nanoid } from "nanoid"

import { type event_seats, t_event_status } from "@reeba/common"

import { afterAll, beforeAll, describe, expect, test } from "vitest"
import createServer from "../../src/app.js"
import client from "../pool.js"

dotenv.config({
  path: resolve(__dirname, "..", ".."),
  silent: true
})

const tagList = [
  "amphitheater",
  "business",
  "concert",
  "entertainment",
  "fan-meet",
  "gameshow",
  "lifestyle",
  "live",
  "musical",
  "online",
  "opera",
  "seminar",
  "stand-up-comedy",
  "technology",
  "variety"
]

const mockEvent = async (): Promise<void> => {
  const user = await client.query(
    "select * from \"users\" where user_username = 'posteventimageuser'"
  )

  if (user.rows.length <= 0) {
    await client.query(
      'insert into "users" (user_username, user_email, user_password, user_phone_country_code, user_phone_number) values ($1, $2, $3, $4, $5)',
      [
        "posteventimageuser",
        "postevenimageuser@gmail.com",
        "posteventimagetest_123",
        "334",
        "4304849384"
      ]
    )
  }

  const ev = {
    id: "posteventimagetest555",
    eventName: "lido",
    createdBy: "posteventimageuser",
    description: "## No description provided",
    eventImagePath: "",
    website: "www.github.com/sindresorhus/ky",
    venueName: "LIDO CONNECT HALL 1",
    venueCoordinates: {
      x: "13.74593937535103",
      y: "100.53257672630755"
    },
    openingDate: "2021-03-01T12:00:00.000+07:00",
    tags: ["stand-up-comedy", "fan-meet"],
    ticketPrices: [
      {
        color: "#4C9141",
        price: 1000
      },
      {
        color: "#C1876B",
        price: 1500
      }
    ],
    datetimes: [
      {
        start: "2021-03-07T20:00:00.000+07:00",
        end: "2021-03-08T00:00:00.000+07:00"
      },
      {
        start: "2021-03-08T20:00:00.000+07:00",
        end: "2021-03-09T00:00:00.000+07:00"
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
  const evClone = { ...ev, eventImagePath: "", id: "posteventemptystring" }

  // * check if event tags is there, if not, add it.
  for await (const preparedTag of tagList) {
    await client.query(
      "insert into event_tags (event_tag_label) values ($1) on conflict (event_tag_label) do nothing",
      [preparedTag]
    )
  }

  for (const indivEvent of [ev, evClone]) {
    // * this is a user associated with creating event. check if he's there, if not, get him there.
    const isEVExists = await client.query(
      'select * from "events" where event_id = $1',
      [indivEvent.id]
    )

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
            event_min_ticket_price,
            event_max_ticket_price,
            event_minimum_age
          ) values ($1, $2, $3, $4, $5, $6, $7, $8::point, $9, $10, $11, $12::jsonb, $13, $14, $15) returning event_id`,
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
          JSON.stringify(
            indivEvent.ticketPrices.reduce(
              (obj, item) => ((obj[item.color] = item.price), obj),
              {} as Record<string, number>
            )
          ),
          Math.min(...ev.ticketPrices.map(t => t.price)),
          Math.max(...ev.ticketPrices.map(t => t.price)),
          indivEvent.minimumAge
        ]
      )

      for await (const tag of indivEvent.tags) {
        await client.query(
          "insert into event_tags_bridge (event_tag_label, event_id) values ($1, $2)",
          [tag, eventId.rows[0].event_id]
        )
      }

      for await (const datetime of indivEvent.datetimes) {
        const datetimeId = await client.query<{ event_datetime_id: string }>(
          "insert into event_datetimes (event_datetime_id, event_id, event_start_datetime, event_end_datetime) values ($1, $2, $3, $4) returning event_datetime_id",
          [nanoid(), eventId.rows[0].event_id, datetime.start, datetime.end]
        )

        for await (const sectionRow of indivEvent.sections) {
          for await (const section of sectionRow) {
            const sectionId = await client.query<{ event_section_id: string }>(
              "insert into event_sections (event_section_id, event_datetime_id, event_section_row_position, event_section_column_position) values ($1, $2, $3, $4) returning event_section_id",
              [
                nanoid(),
                datetimeId.rows[0].event_datetime_id,
                section.sectionRowPosition,
                section.sectionColumnPosition
              ]
            )

            for await (const seatRow of section.seats) {
              for await (const seat of seatRow) {
                await client.query<event_seats>(
                  "insert into event_seats (event_seat_id, event_section_id, event_seat_price, event_seat_row_position, event_seat_column_position) values ($1, $2, $3, $4, $5)",
                  [
                    nanoid(),
                    sectionId.rows[0].event_section_id,
                    seat.seatPrice,
                    seat.seatRowPosition,
                    seat.seatColumnPosition
                  ]
                )
              }
            }
          }
        }
      }
    }
  }
}

describe("post event image", async () => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
  })

  beforeAll(async () => {
    await mockEvent()
  })

  test("passing empty string as eventId", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/event-images/"
    })

    expect(
      response.statusCode,
      "status code from posting without eventId"
    ).toEqual(400)
    expect(response.json().message, "error message").toEqual(
      "params should have required property 'eventId'"
    )
  })

  test("passing unknown eventId", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/event-images/unknown_eventId"
    })

    expect(response.statusCode).toEqual(404)
    expect(response.json().message).toEqual("event not found")
  })

  test("posting image to existing event", async () => {
    const form = new FormData()
    form.append(
      "image",
      createReadStream(resolve(__dirname, "test-event-image.png"))
    )

    const response = await app.inject({
      method: "POST",
      url: "/event-images/posteventimagetest555",
      payload: form,
      headers: form.getHeaders()
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json().message).toEqual("complete")
  })

  test("posting unmatched file extension", async () => {
    const form = new FormData()
    form.append(
      "image",
      createReadStream(resolve(__dirname, "unmatched-file-extension.md"))
    )

    const response = await app.inject({
      method: "POST",
      url: "/event-images/posteventimagetest555",
      payload: form,
      headers: form.getHeaders()
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json().message).toEqual("unmatched file extension")
  })
})
