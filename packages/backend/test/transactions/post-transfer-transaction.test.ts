import t from "tap"

import { transactions } from "@reeba/common"

import createServer from "../../src/app"
import client from "../pool"

const ev = {
  eventName: "BTS Armffgfdfgy",
  createdBy: "eventowneryeah",
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

void t.test("transferring a ticket to a user", async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  const tid = await client.query(
    'select * from "transactions" where user_username = $1',
    ["dripped_out"]
  )
  const tid2 = await client.query(
    'select * from "transactions" where user_username = $1',
    ["another_rich_dude_lol"]
  )

  if (tid.rowCount !== 0) {
    await client.query('delete from "transactions" where transaction_id = $1', [
      tid.rows[0].transaction_id
    ])
  }

  if (tid2.rowCount !== 0) {
    await client.query('delete from "transactions" where transaction_id = $1', [
      tid2.rows[0].transaction_id
    ])
  }

  await client.query('delete from "events" where user_username = $1', [
    "eventowneryeah"
  ])
  await client.query(
    'delete from "users" where user_username in ($1, $2, $3, $4)',
    ["eventowneryeah", "firstbuyer", "dripped_out", "another_rich_dude_lol"]
  )

  await app.inject({
    method: "post",
    url: "/auth/signup",
    payload: {
      username: "eventowneryeah",
      email: "eventowneryeah@gmail.com",
      password: "asdfghjkl123",
      phoneCountryCode: "66",
      phoneNumber: "449583323924",
      iso31662: "TH"
    }
  })

  await app.inject({
    method: "post",
    url: "/auth/signup",
    payload: {
      username: "firstbuyer",
      email: "firstbuyer@gmail.com",
      password: "asdfghjkl123",
      phoneCountryCode: "66",
      phoneNumber: "3949302323",
      iso31662: "TH"
    }
  })

  await app.inject({
    method: "post",
    url: "/auth/signup",
    payload: {
      username: "dripped_out",
      email: "dripped_out@gmail.com",
      password: "asdfghjkl123",
      phoneCountryCode: "66",
      phoneNumber: "3294923023",
      iso31662: "TH"
    }
  })

  await app.inject({
    method: "post",
    url: "/auth/signup",
    payload: {
      username: "another_rich_dude_lol",
      email: "another_rich_dude_lol@gmail.com",
      password: "asdfghjkl123",
      phoneCountryCode: "66",
      phoneNumber: "483893928",
      iso31662: "TH"
    }
  })

  const eventOwnerResponse = await app.inject({
    method: "post",
    url: "/auth/signin",
    payload: {
      email: "eventowneryeah@gmail.com",
      password: "asdfghjkl123"
    }
  })

  const firstBuyerResponse = await app.inject({
    method: "post",
    url: "/auth/signin",
    payload: {
      email: "firstbuyer@gmail.com",
      password: "asdfghjkl123"
    }
  })

  const anotherBuyerTryingToTransferResponse = await app.inject({
    method: "post",
    url: "/auth/signin",
    payload: {
      email: "another_rich_dude_lol@gmail.com",
      password: "asdfghjkl123"
    }
  })

  const eventOwnerToken = eventOwnerResponse.json<{ token: string }>().token
  const firstBuyerToken = firstBuyerResponse.json<{ token: string }>().token
  const anotherBuyerTryingToTransferToken =
    anotherBuyerTryingToTransferResponse.json<{ token: string }>().token

  const eventIdResponse = await app.inject({
    method: "post",
    url: "/events",
    headers: {
      Authorization: `Bearer ${eventOwnerToken}`
    },
    payload: ev
  })

  const eventId = eventIdResponse.json<{ eventId: string }>().eventId

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
    [eventId]
  )

  await app.inject({
    method: "post",
    url: "/transactions",
    headers: {
      Authorization: `Bearer ${firstBuyerToken}`
    },
    payload: {
      eventId: submittedEvent.rows[0].event_id,
      datetimeId: submittedEvent.rows[0].event_datetime_id,
      sectionId: submittedEvent.rows[0].event_section_id,
      seatIds: [submittedEvent.rows[0].event_seat_id]
    }
  })

  await app.inject({
    method: "post",
    url: "/transactions",
    headers: {
      Authorization: `Bearer ${anotherBuyerTryingToTransferToken}`
    },
    payload: {
      eventId: submittedEvent.rows[1].event_id,
      datetimeId: submittedEvent.rows[1].event_datetime_id,
      sectionId: submittedEvent.rows[1].event_section_id,
      seatIds: [submittedEvent.rows[1].event_seat_id]
    }
  })

  const transactionIdOfFirstUser = await client.query<transactions>(
    'select * from "transactions" where user_username = $1',
    ["firstbuyer"]
  )

  void t.test("missing destination username", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: `/transactions/${transactionIdOfFirstUser.rows[0].transaction_id}/transfer`,
        headers: {
          Authorization: `Bearer ${firstBuyerToken}`
        },
        payload: {}
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "body should have required property 'username'"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test("username not found", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: `/transactions/${transactionIdOfFirstUser.rows[0].transaction_id}/transfer`,
        headers: {
          Authorization: `Bearer ${firstBuyerToken}`
        },
        payload: {
          username: "whodis"
        }
      })

      expect(response.statusCode).toEqual(404)
      t.strictSame(response.json().message, "username to transfer to not found")
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test("wrong transaction id", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: "/transactions/abc/transfer",
        headers: {
          Authorization: `Bearer ${firstBuyerToken}`
        },
        payload: {
          username: "dripped_out"
        }
      })

      expect(response.statusCode).toEqual(404)
      t.strictSame(
        response.json().message,
        "event related to transactionId not found"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test("successful call", async t => {
    try {
      const response = await app.inject({
        method: "post",
        url: `/transactions/${transactionIdOfFirstUser.rows[0].transaction_id}/transfer`,
        headers: {
          Authorization: `Bearer ${firstBuyerToken}`
        },
        payload: {
          username: "dripped_out"
        }
      })

      expect(response.statusCode).toEqual(200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test(
    "not be able to transfer to a user who already had the event",
    async t => {
      try {
        const response = await app.inject({
          method: "post",
          url: `/transactions/${transactionIdOfFirstUser.rows[0].transaction_id}/transfer`,
          headers: {
            Authorization: `Bearer ${anotherBuyerTryingToTransferToken}`
          },
          payload: {
            username: "dripped_out"
          }
        })

        expect(response.statusCode).toEqual(400)
        t.strictSame(
          response.json().message,
          "this user already had a ticket for this event"
        )
      } catch (error) {
        t.error(error)
        t.fail()
      }
    }
  )
})
