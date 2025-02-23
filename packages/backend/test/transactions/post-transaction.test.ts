import t from "tap"

import createServer from "../../src/app"
import client from "../pool"

const ev = {
  eventName: "BTS Armffgfdfgy",
  createdBy: "posttransactiontest",
  description: "## No description provided",
  website: "www.github.com/sindresorhus/ky",
  venueName: "Rajamangkala Stadium",
  venueCoordinates: {
    x: "13.755313892097984",
    y: "100.62221451070221"
  },
  openingDate: "2021-03-01T12:00:00.000+07:00",
  tags: ["concert", "stand-up-comedy"],
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
            },
            {
              seatRowPosition: 0,
              seatColumnPosition: 2,
              seatPrice: 1000
            },
            {
              seatRowPosition: 0,
              seatColumnPosition: 3,
              seatPrice: 1000
            },
            {
              seatRowPosition: 0,
              seatColumnPosition: 4,
              seatPrice: 1000
            }
          ]
        ]
      }
    ]
  ]
}

void t.test("transaction creation route", async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query('delete from "events" where user_username = $1', [
    "posttransactiontest"
  ])
  await client.query(
    'delete from "users" where user_username = $1 and user_username = $2 and user_username = $3',
    ["posttransactiontest", "thattransactionguy", "theinterrupter"]
  )

  await app.inject({
    method: "post",
    url: "/auth/signup",
    payload: {
      username: "posttransactiontest",
      email: "posttransactiontest@gmail.com",
      password: "asdfghjkl123",
      phoneCountryCode: "66",
      phoneNumber: "449583924"
    }
  })

  await app.inject({
    method: "post",
    url: "/auth/signup",
    payload: {
      username: "thattransactionguy",
      email: "thattransactionguy@gmail.com",
      password: "asdfghjkl123",
      phoneCountryCode: "44",
      phoneNumber: "39493023"
    }
  })

  await app.inject({
    method: "post",
    url: "/auth/signup",
    payload: {
      username: "theinterrupter",
      email: "theinterrupter@gmail.com",
      password: "asdfghjkl123",
      phoneCountryCode: "43",
      phoneNumber: "329493023"
    }
  })

  const eventOwnerToken = await app.inject({
    method: "post",
    url: "/auth/signin",
    payload: {
      email: "posttransactiontest@gmail.com",
      password: "asdfghjkl123"
    }
  })

  const ticketBuyerToken = await app.inject({
    method: "post",
    url: "/auth/signin",
    payload: {
      email: "thattransactionguy@gmail.com",
      password: "asdfghjkl123"
    }
  })

  const interrupterToken = await app.inject({
    method: "post",
    url: "/auth/signin",
    payload: {
      email: "theinterrupter@gmail.com",
      password: "asdfghjkl123"
    }
  })

  const eventId = await app.inject({
    method: "post",
    url: "/events",
    headers: {
      Authorization: `Bearer ${eventOwnerToken.json<{ token: string }>().token}`
    },
    payload: ev
  })

  const submittedEvent = await client.query<{
    event_id: string
    event_datetime_id: string
    event_section_id: string
    event_seat_id: string
  }>(
    `select
      events.event_id,
      event_datetimes.event_datetime_id,
      event_sections.event_section_id,
      event_seats.event_seat_id
    from "event_seats"
    inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
    inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
    inner join "events" on event_datetimes.event_id = events.event_id
    where events.event_id = $1`,
    [eventId.json<{ eventId: string }>().eventId]
  )

  await t.test("test missing eventId", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        },
        payload: {
          eventId: "",
          datetimeId: "asdv",
          sectionId: "dkvnkdv",
          seatIds: ["sdkfndf", "osidfndf"]
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "body should have required property 'eventId'"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("test missing eventId as no property", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        },
        payload: {
          datetimeId: "asdv",
          sectionId: "dkvnkdv",
          seatIds: ["sdkfndf", "osidfndf"]
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "body should have required property 'eventId'"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("test missing datetimeId", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        },
        payload: {
          eventId: "sdfdfeefe",
          datetimeId: "",
          sectionId: "dkvnkdv",
          seatIds: ["sdkfndf", "osidfndf"]
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "body should have required property 'datetimeId'"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("test missing id as no property", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        },
        payload: {
          eventId: "sdfdfeefe",
          sectionId: "dkvnkdv",
          seatIds: ["sdkfndf", "osidfndf"]
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "body should have required property 'datetimeId'"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("missing sectionId", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        },
        payload: {
          eventId: "sdfdfeefe",
          datetimeId: "asdv",
          sectionId: "",
          seatIds: ["sdkfndf", "osidfndf"]
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "body should have required property 'sectionId'"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("missing sectionId as no property", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        },
        payload: {
          eventId: "sdfdfeefe",
          datetimeId: "asdv",
          seatIds: ["sdkfndf", "osidfndf"]
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "body should have required property 'sectionId'"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("missing seatIds", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        },
        payload: {
          eventId: "sdfdfeefe",
          datetimeId: "asdv",
          sectionId: "dkvnkdv"
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "body should have required property 'seatIds'"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("seatIds of different type", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        },
        payload: {
          eventId: "sdfdfeefe",
          datetimeId: "asdv",
          sectionId: "dkvnkdv",
          seatIds: "lknvnienfe"
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(response.json().message, "wrong 'seatIds' format")
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("empty array seatIds", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        },
        payload: {
          eventId: "sdfdfeefe",
          datetimeId: "asdv",
          sectionId: "dkvnkdv",
          seatIds: []
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "body should have required property 'seatIds'"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("all empty seats", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        },
        payload: {
          eventId: "sdfdfeefe",
          datetimeId: "asdv",
          sectionId: "dkvnkdv",
          seatIds: ["", "", ""]
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "no seatIds available after it's filtered for empty string"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("same seats being bought", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        },
        payload: {
          eventId: submittedEvent.rows[0].event_id,
          datetimeId: submittedEvent.rows[0].event_datetime_id,
          sectionId: submittedEvent.rows[0].event_section_id,
          seatIds: submittedEvent.rows.slice(0, 2).map(r => r.event_seat_id)
        }
      })

      t.strictSame(response.json(), { message: "complete" })

      const lateGuyResponse = await app.inject({
        method: "post",
        url: "/transactions",
        headers: {
          Authorization: `Bearer ${interrupterToken.json<{ token: string }>().token}`
        },
        payload: {
          eventId: submittedEvent.rows[0].event_id,
          datetimeId: submittedEvent.rows[0].event_datetime_id,
          sectionId: submittedEvent.rows[0].event_section_id,
          seatIds: submittedEvent.rows.slice(0, 2).map(r => r.event_seat_id)
        }
      })

      expect(lateGuyResponse.statusCode).toEqual(400)
      t.strictSame(
        lateGuyResponse
          .json<{ message: string }>()
          .message.split(":")[1]
          .split(",")
          .map(s => s.trim())
          .sort(),
        submittedEvent.rows
          .slice(0, 2)
          .map(r => r.event_seat_id)
          .sort()
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  const transactionId = await client.query(
    'select * from "transactions" where user_username = $1',
    ["thattransactionguy"]
  )

  await t.test("viewing invoice: no transaction id", async t => {
    try {
      const response = await app.inject({
        method: "get",
        url: "/transactions/",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "params should have required property 'transactionId'"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("viewing invoice: nonexistent transaction id", async t => {
    try {
      const response = await app.inject({
        method: "get",
        url: "/transactions/1234",
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        }
      })

      expect(response.statusCode).toEqual(404)
      t.strictSame(response.json().message, "transaction not found")
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("viewing invoice: successful call", async t => {
    try {
      const response = await app.inject({
        method: "get",
        url: `/transactions/${transactionId.rows[0].transaction_id as string}`,
        headers: {
          Authorization: `Bearer ${ticketBuyerToken.json<{ token: string }>().token}`
        }
      })

      expect(response.statusCode).toEqual(200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("viewing invoice: successful call to get pdf", async t => {
    try {
      const response = await app.inject({
        method: "get",
        url: `/transactions/${transactionId.rows[0].transaction_id as string}/pdf`
      })

      expect(response.statusCode).toEqual(200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("viewing invoice: transaction not found", async t => {
    try {
      const response = await app.inject({
        method: "get",
        url: `/transactions/${"3948483"}/pdf`
      })

      expect(response.statusCode).toEqual(404)
      t.strictSame(response.json().message, "transaction not found")
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
