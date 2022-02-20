import dotenv from 'dotenv-flow'
import FormData from 'form-data'
import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'
import { Client } from 'pg'
import t from 'tap'

import createServer from '../../src/app'

dotenv.config({
  path: resolve(__dirname, '..', '..')
})

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME
})

void t.test('get image', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    await client.end()
  })

  try {
    await client.connect()

    const email = await client.query('select * from "events" where event_name = \'posteventimagetest\'')

    if (email.rowCount <= 0) {
      await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'posteventimagetest',
          email: 'postevenimagetest@gmail.com',
          password: 'posteventimagetest_123',
          phoneCountryCod: '334',
          phonNumber: '4304849384'
        }
      })
    }
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
      t.strictSame(response.json().message, 'eventImagePath not found', 'error message')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('posting image to existing', async t => {
    const form = new FormData()
    form.append('image', createReadStream(resolve(__dirname, 'test-event-image.png')))

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/event-images/posteventimagetest',
        payload: form,
        headers: form.getHeaders()
      })

      t.strictSame(response.statusCode, 200, 'status code from posting')
      t.strictSame(response.json().message, 'complete', 'message from posting')
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
        url: '/event-images/posteventimagestest',
        payload: form,
        headers: form.getHeaders()
      })

      t.strictSame(response.statusCode, 200, 'status code from posting unmatched file extension')
      t.strictSame(response.json().message, 'eventImagePath not found', 'message from posting unmatched file extension')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  t.end()
})
