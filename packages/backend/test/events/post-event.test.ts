import dotenv from 'dotenv-flow'
import { resolve } from 'path'
import { Client } from 'pg'
import t from 'tap'

import { SigninReplyBody } from '@reeba/common'

import createServer from '../../src/app'

dotenv.config({
  path: resolve(__dirname, '..', '..')
})

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME
})

void t.test('post event', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    await client.end()
  })

  try {
    await client.connect()
    await client.query('delete from "events" where user_username = \'postindiveventtest\'')

    await client.query(
      `insert into users (
        user_username,
        user_email,
        user_password,
        user_phone_country_code,
        user_phone_number
      ) values ($1, $2, $3, $4, $5)
      on conflict (user_username) do nothing`,
      [
        'postindiveventtest',
        'postindivevent@gmail.com',
        // * sansastark
        '$2b$10$stcsoa28Ym.QM3f3NyQI2Oac7XByJIzv3mjLO/fsmkQjLPBi8HMj2',
        '66',
        '0394859403'
      ]
    )
  } catch (error) {
    t.error(error)
    t.fail()
  }

  const response = await app.inject({
    url: '/auth/signin',
    method: 'POST',
    payload: {
      email: 'postindivevent@gmail.com',
      password: 'aryastark'
    }
  })

  const token = response.json<SigninReplyBody>().token

  const perfectEvent = {
    eventName: 'BTS',
    createdBy: 'postindiveventtest',
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

  // * These tests should fail with 400 (Bad Request: user is wrong because they don't send what API wants.
  // * Our API have to be REALLY STRICT. So there would be no errors when it is talking with the client)
  const emptyStringEventName = { ...perfectEvent, ...{ eventName: '' } }
  const undefinedEventName = (({ eventName, ...others }) => ({ ...others }))(perfectEvent)

  const emptyStringCreatedBy = { ...perfectEvent, ...{ createdBy: '' } }
  const undefinedCreatedBy = (({ createdBy, ...others }) => ({ ...others }))(perfectEvent)

  const undefinedDescription = (({ description, ...others }) => ({ ...others }))(perfectEvent)

  const undefinedWebsite = (({ website, ...others }) => ({ ...others }))(perfectEvent)

  const emptyStringVenueName = { ...perfectEvent, ...{ venueName: '' } }
  const undefinedVenueName = (({ venueName, ...others }) => ({ ...others }))(perfectEvent)

  const emptyObjectVenueCoordinates = { ...perfectEvent, ...{ venueCoordinates: {} } }
  const wrongKeyNameOfVenueCoordinates = { ...perfectEvent, ...{ venueCoordinates: { lat: 123, long: 456 } } }
  const wrongKeyNameOfVenueCoordinatesForY = { ...perfectEvent, ...{ venueCoordinates: { x: 123, long: 456 } } }
  const wrongTypeVenueCoordinates = { ...perfectEvent, ...{ venueCoordinates: { x: '2345', y: 1234 } } }
  const undefinedVenueCoordinates = (({ venueCoordinates, ...others }) => ({ ...others }))(perfectEvent)

  const emptyStringOpeningDate = { ...perfectEvent, ...{ openingDate: '' } }
  const undefinedOpeningDate = (({ openingDate, ...others }) => ({ ...others }))(perfectEvent)

  const undefinedTags = (({ tags, ...others }) => ({ ...others }))(perfectEvent)

  const emptyArrayTicketPrices = { ...perfectEvent, ...{ ticketPrices: [] } }
  const undefinedTicketPrices = (({ ticketPrices, ...others }) => ({ ...others }))(perfectEvent)

  const emptyStringDatetimes = { ...perfectEvent, ...{ datetimes: [] } }
  const containsEmptyStringDatetimes = { ...perfectEvent, ...{ datetimes: [{ start: '', end: '' }] } }
  const undefinedDatetimes = (({ datetimes, ...others }) => ({ ...others }))(perfectEvent)

  const negativeMinimumAge = { ...perfectEvent, ...{ minimumAge: -5 } }
  const undefinedMinimumAge = (({ minimumAge, ...others }) => ({ ...others }))(perfectEvent)

  const emptyArraySections = { ...perfectEvent, ...{ sections: [] } }
  const undefinedSections = (({ sections, ...others }) => ({ ...others }))(perfectEvent)

  const undefinedSeats = {
    ...perfectEvent,
    ...{
      sections: [
        [
          {
            sectionRowPosition: 0,
            sectionColumnPosition: 0,
            seats: undefined
          },
          {
            sectionRowPosition: 0,
            sectionColumnPosition: 1,
            seats: undefined
          }
        ],
        [
          {
            sectionRowPosition: 1,
            sectionColumnPosition: 0,
            seats: undefined
          },
          {
            sectionRowPosition: 1,
            sectionColumnPosition: 1,
            seats: undefined
          }
        ]
      ]
    }
  }
  // * need more test for seats, but those code will be generated by javascript so there should not be error

  void t.test('missing eventName (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: emptyStringEventName
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing eventNames')
      t.strictSame(response.json().message, 'body should have required property \'eventName\'', 'Error message from missing eventNames')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing eventName (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedEventName
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing eventNames')
      t.strictSame(response.json().message, 'body should have required property \'eventName\'', 'Error message from missing eventNames')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing createdBy (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: emptyStringCreatedBy
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing createdBy')
      t.strictSame(response.json().message, 'body should have required property \'createdBy\'', 'Error message from missing createdBy')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing createdBy (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedCreatedBy
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing createdBy')
      t.strictSame(response.json().message, 'body should have required property \'createdBy\'', 'Error message from missing createdBy')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing description (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedDescription
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing description')
      t.strictSame(response.json().message, 'body should have required property \'description\'', 'Error message from missing description')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing website (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedWebsite
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing website')
      t.strictSame(response.json().message, 'body should have required property \'website\'', 'Error message from missing website')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing venueName (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: emptyStringVenueName
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing venueName')
      t.strictSame(response.json().message, 'body should have required property \'venueName\'', 'Error message from missing venueName')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing venueName (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedVenueName
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing venueName')
      t.strictSame(response.json().message, 'body should have required property \'venueName\'', 'Error message from missing venueName')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing venueCoordinates (as empty object)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: emptyObjectVenueCoordinates
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing venueCoordinates')
      t.strictSame(response.json().message, 'venueCoordinates.x should be type of \'string\'', 'Error message from missing venueCoordinates')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing venueCoordinates (wrong key name)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: wrongKeyNameOfVenueCoordinates
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing venueCoordinates')
      t.strictSame(response.json().message, 'venueCoordinates.x should be type of \'string\'', 'Error message from missing venueCoordinates')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing venueCoordinates (wrong key name) for y value', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: wrongKeyNameOfVenueCoordinatesForY
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing venueCoordinates')
      t.strictSame(response.json().message, 'venueCoordinates.x should be type of \'string\'', 'Error message from missing venueCoordinates')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing venueCoordinates (wrong type)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: wrongTypeVenueCoordinates
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing venueCoordinates')
      t.strictSame(response.json().message, 'venueCoordinates.y should be type of \'string\'', 'Error message from missing venueCoordinates')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing venueCoordinates (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedVenueCoordinates
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing venueCoordinates')
      t.strictSame(response.json().message, 'body should have required property \'eventVenuCoordinates\'', 'Error message from missing venueCoordinates')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing openingDate (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: emptyStringOpeningDate
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing openingDate')
      t.strictSame(response.json().message, 'body should have required property \'openingDate\'', 'Error message from missing openingDate')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing openingDate (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedOpeningDate
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing openingDate')
      t.strictSame(response.json().message, 'body should have required property \'openingDate\'', 'Error message from missing openingDate')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing tags (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedTags
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing tags')
      t.strictSame(response.json().message, 'body should have required property \'tags\'', 'Error message from missing tags')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing ticketPrices (as empty array)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: emptyArrayTicketPrices
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing ticketPrices')
      t.strictSame(response.json().message, 'body should have required property \'ticketPrices\'', 'Error message from missing ticketPrices')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing ticketPrices (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedTicketPrices
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing ticketPrices')
      t.strictSame(response.json().message, 'body should have required property \'ticketPrices\'', 'Error message from missing ticketPrices')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing datetimes (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: emptyStringDatetimes
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing datetimes')
      t.strictSame(response.json().message, 'body should have required property \'datetimes\'', 'Error message from missing datetimes')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing datetimes (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: containsEmptyStringDatetimes
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing datetimes')
      t.strictSame(response.json().message, 'body should have required property \'datetimes\'', 'Error message from missing datetimes')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing datetimes (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedDatetimes
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing datetimes')
      t.strictSame(response.json().message, 'body should have required property \'datetimes\'', 'Error message from missing datetimes')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing minimumAge (age negative)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: negativeMinimumAge
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing minimumAge')
      t.strictSame(response.json().message, 'body should have required property \'minimumAge\'', 'Error message from missing minimumAge')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing minimumAge (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedMinimumAge
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing minimumAge')
      t.strictSame(response.json().message, 'body should have required property \'minimumAge\'', 'Error message from missing minimumAge')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing sections (as empty array)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: emptyArraySections
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing sections')
      t.strictSame(response.json().message, 'body should have required property \'sections\'', 'Error message from missing sections')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing sections (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedSections
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing sections')
      t.strictSame(response.json().message, 'body should have required property \'sections\'', 'Error message from missing sections')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing seats (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: undefinedSeats
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing seats')
      t.strictSame(response.json().message, 'body.sections[0][0] should have required property \'seats\'', 'Error message from missing seats')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('successfully add an event', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/events',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: perfectEvent
      })

      t.strictSame(response.statusCode, 200)
      t.type(response.json().eventId, 'string')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  t.end()
})
