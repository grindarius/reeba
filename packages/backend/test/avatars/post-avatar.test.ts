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

void t.test('post image', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    await client.end()
  })

  try {
    await client.connect()

    // * Looking for existing logged in user, if not. create one (without image path).
    const email = await client.query('select * from "users" where user_username = \'postavatartest\'')

    if (email.rowCount <= 0) {
      await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'postavatartest',
          email: 'postavatartest@gmail.com',
          password: 'postavatartest_123',
          phoneCountryCode: '334',
          phoneNumber: '4304849384'
        }
      })
    }
  } catch (error) {
    t.error(error)
    t.fail()
  }

  void t.test('passing empty string as username', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/avatars/'
      })

      t.strictSame(response.statusCode, 400, 'status code from posting without username')
      t.strictSame(response.json().message, 'params should have required property \'username\'', 'error message')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('passing unknown username', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/avatars/unknown_username'
      })

      t.strictSame(response.statusCode, 404, 'status code from posting without username')
      t.strictSame(response.json().message, 'user not found', 'error message')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('posting image to existing profile', async t => {
    const form = new FormData()
    form.append('image', createReadStream(resolve(__dirname, 'test-post-avatar.png')))

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/avatars/postavatartest',
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
        url: '/avatars/postavatartest',
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
