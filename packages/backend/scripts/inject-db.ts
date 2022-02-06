import { parse } from 'fast-csv'
import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'

import { event_datetimes, event_seats, event_sections, events, users } from '@reeba/common'

import createServer from '../src/app'

const parsedUsers: Array<users> = []

createReadStream(resolve(__dirname, '..', '..', 'scripts', 'output', 'users.csv'))
  .pipe(parse({ headers: true }))
  .on('error', err => { throw err })
  .on('data', row => parsedUsers.push(row))
  .on('end', () => {
    void injectUsers()
  })

const injectUsers = async (): Promise<void> => {
  const app = createServer()

  for await (const user of parsedUsers) {
    try {
      await app.inject({
        method: 'post',
        url: '/auth/signup',
        payload: {
          username: user.user_username,
          email: user.user_email,
          password: 'asdfghjkl123',
          phoneCountryCode: user.user_telephone_country_code,
          phoneNumber: user.user_telephone_number
        }
      })
    } catch (err) {
      throw new Error(err as string)
    }
  }
}

const parsedEvents: Array<events> = []
const parsedEventDatetimes: Array<event_datetimes> = []
const parsedEventSections: Array<event_sections> = []
const parsedEventSeats: Array<event_seats> = []

createReadStream(resolve(__dirname, '..', '..', 'scripts', 'output', 'events.csv'))
  .pipe(parse({ headers: true }))
  .on('error', err => { throw err })
  .on('data', row => parsedEvents.push(row))
  .on('end', () => {
    createReadStream(resolve(__dirname, '..', '..', 'scripts', 'output', 'event_datetimes.csv'))
      .pipe(parse({ headers: true }))
      .on('error', err => { throw err })
      .on('data', row => parsedEventDatetimes.push(row))
      .on('end', () => {
        createReadStream(resolve(__dirname, '..', '..', 'scripts', 'output', 'event_sections.csv'))
          .pipe(parse({ headers: true }))
          .on('error', err => { throw err })
          .on('data', row => parsedEventSections.push(row))
          .on('end', () => {
            createReadStream(resolve(__dirname, '..', '..', 'scripts', 'output', 'event_seats.csv'))
              .pipe(parse({ headers: true }))
              .on('error', err => { throw err })
              .on('data', row => parsedEventSeats.push(row))
              .on('end', () => {
                void injectEvents()
              })
          })
      })
  })

const injectEvents = async (): Promise<void> => {

}
