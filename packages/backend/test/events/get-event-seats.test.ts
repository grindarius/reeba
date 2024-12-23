import { resolve } from "node:path"
import dayjs from "dayjs"
import dotenv from "dotenv-flow"
import { nanoid } from "nanoid"

import { afterAll, beforeAll, describe, expect, test } from "vitest"
import createServer from "../../src/app.js"
import client from "../pool.js"
import { officialEventsList } from "./get-event-data.js"

dotenv.config({
  path: resolve(__dirname, "..", ".."),
  silent: true
})

describe("get sections and seats from the API", async () => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
    const tid = await client.query(
      "select transaction_id from \"transactions\" where user_username = 'therichchick'"
    )
    await client.query(
      'delete from "transaction_details" where transaction_id = $1',
      [tid.rows[0].transaction_id]
    )

    await client.query(
      "delete from \"events\" where event_name = 'geteventseats'"
    )
    await client.query(
      "delete from \"transactions\" where user_username = 'therichchick'"
    )
  })

  beforeAll(async () => {
    const ev = {
      ...officialEventsList[0],
      ...{
        eventName: "geteventseats",
        createdBy: "geteveseats",
        datetimes: [
          {
            start: dayjs()
              .subtract(60, "days")
              .set("hour", 0)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0)
              .toISOString(),
            end: dayjs()
              .subtract(60, "days")
              .add(2, "hours")
              .set("hour", 0)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0)
              .toISOString()
          },
          {
            start: dayjs()
              .subtract(55, "days")
              .set("hour", 0)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0)
              .toISOString(),
            end: dayjs()
              .subtract(55, "days")
              .add(2, "hours")
              .set("hour", 0)
              .set("minute", 0)
              .set("second", 0)
              .set("millisecond", 0)
              .toISOString()
          }
        ],
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
                    seatPrice: 1000
                  },
                  {
                    seatRowPosition: 0,
                    seatColumnPosition: 1,
                    seatPrice: 1500
                  }
                ]
              ]
            }
          ]
        ]
      }
    }

    const isUser1Existed = await client.query(
      'select * from "users" where user_username = $1',
      ["geteveseats"]
    )
    const isUser2Existed = await client.query(
      'select * from "users" where user_username = $1',
      ["therichchick"]
    )

    if (isUser1Existed.rows.length === 0) {
      await app.inject({
        method: "post",
        url: "/auth/signup",
        payload: {
          username: "geteveseats",
          email: "geteveseats@hotmail.com",
          password: "asdfghjkl123",
          phoneCountryCode: "66",
          phoneNumber: "49850948584"
        }
      })
    }

    if (isUser2Existed.rows.length === 0) {
      await app.inject({
        method: "post",
        url: "/auth/signup",
        payload: {
          username: "therichchick",
          email: "therichchick@hotmail.com",
          password: "asdfghjkl123",
          phoneCountryCode: "66",
          phoneNumber: "49853948584"
        }
      })
    }

    const user1Response = await app.inject({
      method: "post",
      url: "/auth/signin",
      payload: {
        email: "geteveseats@hotmail.com",
        password: "asdfghjkl123"
      }
    })

    const token = user1Response.json<{ token: string }>().token

    const evId = await app.inject({
      method: "post",
      url: "/events",
      payload: ev,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const datetimeIds = await client.query<{ event_datetime_id: string }>(
      'select event_datetime_id from "event_datetimes" where event_id = $1',
      [evId.json<{ eventId: string }>().eventId]
    )
  })

  test("no eventId params", async () => {
    const response = await app.inject({
      method: "get",
      url: "/events//seats",
      query: {
        datetimeId: datetimeIds.rows[0].event_datetime_id
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    expect(response.statusCode).toEqual(400)
    expect(
      response.json().message,
      "params should have required property 'eventId'"
    )
  })

  test("no event datetime id query", async () => {
    const response = await app.inject({
      method: "get",
      url: `/events/${evId.json<{ eventId: string }>().eventId}/seats`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    expect(response.statusCode).toEqual(400)
    expect(
      response.json().message,
      "querystring should have required property 'datetimeId'"
    )
  })

  test("nonexistent eventId", async () => {
    const response = await app.inject({
      method: "get",
      url: "/events/blahblahblah/seats",
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        datetimeId: datetimeIds.rows[0].event_datetime_id
      }
    })

    expect(response.statusCode).toEqual(404)
    expect(response.json().message, "Event not found")
  })

  test("nonexistent datetimeId", async () => {
    const response = await app.inject({
      method: "get",
      url: `/events/${evId.json<{ eventId: string }>().eventId}/seats`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        datetimeId: "ksndfdnfienfe"
      }
    })

    expect(response.statusCode).toEqual(404)
    expect(response.json().message, "Event datetime not found")
  })

  test("successful call", async () => {
    const response = await app.inject({
      method: "get",
      url: `/events/${evId.json<{ eventId: string }>().eventId}/seats`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        datetimeId: datetimeIds.rows[0].event_datetime_id
      }
    })

    const json = response.json()

    expect(response.statusCode).toEqual(200)

    expect(json).toHaveProperty("ticketPrices", [
      { color: "#4C9141", price: 1000 },
      { color: "#C1876B", price: 1500 }
    ])
    expect(json).toHaveProperty("")
  })

  const seats = await client.query(
    `select
      event_seats.*
    from "event_seats"
    inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
    inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
    inner join "events" on event_datetimes.event_id = events.event_id
    where events.event_id = $1 and event_datetimes.event_datetime_id = $2`,
    [evId.json().eventId, datetimeIds.rows[0].event_datetime_id]
  )

  const tid = await client.query(
    'insert into "transactions" (transaction_id, user_username) values ($1, $2) returning transaction_id',
    [nanoid(), "therichchick"]
  )

  await client.query(
    'insert into "transaction_details" (event_seat_id, transaction_id) values ($1, $2)',
    [
      seats.rows.find(s => s.event_seat_price === 1500)?.event_seat_id ??
        "unknown",
      tid.rows[0].transaction_id
    ]
  )

  test("false seatings when it's bought", async () => {
    const response = await app.inject({
      method: "get",
      url: "/events/" + evId.json<{ eventId: string }>().eventId + "/seats",
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        datetimeId: datetimeIds.rows[0].event_datetime_id
      }
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json().ticketPrices).toStrictEqual([
      { color: "#4C9141", price: 1000 },
      { color: "#C1876B", price: 1500 }
    ])
  })

  test("another datetime should not be affected", async () => {
    const response = await app.inject({
      method: "get",
      url: "/events/" + evId.json<{ eventId: string }>().eventId + "/seats",
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        datetimeId: datetimeIds.rows[1].event_datetime_id
      }
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json().ticketPrices).toEqual([
      { color: "#4C9141", price: 1000 },
      { color: "#C1876B", price: 1500 }
    ])
  })
})
