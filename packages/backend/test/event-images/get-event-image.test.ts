import { createReadStream, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { type event_seats, t_event_status } from "@reeba/common"
import dayjs from "dayjs"
import dotenv from "dotenv-flow"
import FormData from "form-data"
import { nanoid } from "nanoid"
import Resemble from "resemblejs"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import createServer from "../../src/app.js"
import { officialEventsList } from "../events/get-event-data.js"
import client from "../pool.js"

dotenv.config({
  path: resolve(__dirname, "..", ".."),
  silent: true
})

describe("get event image", async t => {
  const app = createServer()

  afterAll(async () => {
    await client.query(
      'update "events" set event_cover_image_path = $1 where event_id = $2',
      ["", "empty_string_event_name"]
    )

    await app.close()
  })

  beforeAll(async () => {
    const perfectEV = {
      ...officialEventsList[0],
      ...{
        eventName: "test get event image",
        id: "test_get_event_image",
        createdBy: "geteventimagetest"
      }
    }
    const anotherEV = {
      ...officialEventsList[1],
      ...{
        eventName: "test get event with emptyString",
        id: "empty_string_event_name",
        createdBy: "geteventimagetest"
      }
    }

    const user = await client.query(
      "select * from \"users\" where user_username = 'geteventimagetest'"
    )

    if (user.rows.length <= 0) {
      await app.inject({
        method: "POST",
        url: "/auth/signup",
        payload: {
          username: "geteventimagetest",
          email: "geteventimagetest@gmail.com",
          password: "geteventimagetest_123",
          phoneCountryCode: "332",
          phoneNumber: "9384937485"
        }
      })
    }

    for (const ev of [perfectEV, anotherEV]) {
      const targetEvent = await client.query(
        'select * from "events" where event_id = $1',
        [ev.id]
      )
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
              event_min_ticket_price,
              event_max_ticket_price,
              event_minimum_age
            ) values ($1, $2, $3, $4, $5, $6, $7::point, $8, $9, $10, $11::jsonb, $12, $13, $14) on conflict (event_id) do nothing returning event_id`,
          [
            ev.id,
            ev.createdBy,
            ev.eventName,
            ev.description,
            ev.website,
            ev.venueName,
            `${ev.venueCoordinates.x}, ${ev.venueCoordinates.y}`,
            dayjs(ev.openingDate).subtract(7, "days"),
            ev.openingDate,
            t_event_status.open,
            JSON.stringify(
              ev.ticketPrices.reduce<Record<string, number>>((obj, item) => {
                obj[item.color] = item.price
                return obj
              }, {})
            ),
            Math.min(...ev.ticketPrices.map(t => t.price)),
            Math.max(...ev.ticketPrices.map(t => t.price)),
            ev.minimumAge
          ]
        )

        for await (const tag of ev.tags) {
          await client.query(
            "insert into event_tags_bridge (event_tag_label, event_id) values ($1, $2)",
            [tag, eventId.rows[0].event_id]
          )
        }

        for await (const datetime of ev.datetimes) {
          const datetimeId = await client.query<{ event_datetime_id: string }>(
            "insert into event_datetimes (event_datetime_id, event_id, event_start_datetime, event_end_datetime) values ($1, $2, $3, $4) returning event_datetime_id",
            [nanoid(), eventId.rows[0].event_id, datetime.start, datetime.end]
          )

          for await (const sectionRow of ev.sections) {
            for await (const section of sectionRow) {
              const sectionId = await client.query<{
                event_section_id: string
              }>(
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

    const form = new FormData()
    form.append(
      "image",
      createReadStream(resolve(__dirname, "test-event-image.png"))
    )

    await app.inject({
      method: "POST",
      url: "/event-images/test_get_event_image",
      payload: form,
      headers: form.getHeaders()
    })
  })

  test("get default event image when emptystring is passed", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/event-images/"
    })

    Resemble(response.rawPayload)
      .compareTo(
        readFileSync(
          resolve(__dirname, "..", "..", "uploads", "default-event-image.png")
        )
      )
      .onComplete(result => {
        expect(result.isSameDimensions).toEqual(true)
        expect(Number(result.misMatchPercentage)).toEqual(0)
      })
  })

  test("get event image of unknown event id", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/event-images/unknown_event_id"
    })

    Resemble(response.rawPayload)
      .compareTo(
        readFileSync(
          resolve(__dirname, "..", "..", "uploads", "default-event-image.png")
        )
      )
      .onComplete(result => {
        expect(result.isSameDimensions).toEqual(true)
        expect(Number(result.misMatchPercentage)).toEqual(0)
      })
  })

  test("get event image of known event id", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/event-images/test_get_event_image"
    })

    Resemble(response.rawPayload)
      .compareTo(readFileSync(resolve(__dirname, "test-event-image.png")))
      .onComplete(result => {
        expect(result.isSameDimensions).toEqual(true)
        expect(Number(result.misMatchPercentage)).toEqual(0)
      })
  })

  test("get event image of event with empty string image", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/event-images/empty_string_event_name"
    })

    Resemble(response.rawPayload)
      .compareTo(
        readFileSync(
          resolve(__dirname, "..", "..", "uploads", "default-event-image.png")
        )
      )
      .onComplete(result => {
        expect(result.isSameDimensions).toEqual(true)
        expect(Number(result.misMatchPercentage)).toEqual(0)
      })
  })

  await client.query(
    'update "events" set event_cover_image_path = $1 where event_id = $2',
    ["unknown-file.png", "empty_string_event_name"]
  )

  test("get event image of event with image profile path but file does not exist", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/event-images/empty_string_event_name"
    })

    Resemble(response.rawPayload)
      .compareTo(
        readFileSync(
          resolve(__dirname, "..", "..", "uploads", "default-event-image.png")
        )
      )
      .onComplete(result => {
        expect(result.isSameDimensions).toEqual(true)
        expect(Number(result.misMatchPercentage)).toEqual(0)
      })
  })

  await client.query(
    'update "events" set event_cover_image_path = $1 where event_id = $2',
    ["", "empty_string_event_name"]
  )
})
