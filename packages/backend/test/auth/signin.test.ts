import dotenv from 'dotenv-flow'
import { resolve } from 'path'
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

void t.test('signin process', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    await client.end()
  })

  try {
    await client.connect()

    // * Looking for existing logged in user, if not. create one.
    const email = await client.query('select * from "users" where user_email = \'logintest@gmail.com\'')

    if (email.rows.length <= 0) {
      await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'login_test_boy',
          email: 'logintest@gmail.com',
          password: 'logintest_123'
        }
      })
    }
  } catch (error) {
    t.error(error)
    t.fail('Error while connecting to database')
  }

  void t.test('Missing email (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signin',
        payload: {
          email: '',
          password: 'logintest_123'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing email as empty string')
      t.strictSame(response.json().message, 'body should have required property \'email\'', 'Error message from missing email as empty string')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error.')
    }
  })

  void t.test('Missing email (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signin',
        payload: {
          password: 'logintest_123'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing email as missing params')
      t.strictSame(response.json().message, 'body should have required property \'email\'', 'Error message from missing email as missing params')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error.')
    }
  })

  void t.test('Missing password (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signin',
        payload: {
          email: 'logintest@gmail.com',
          password: ''
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing password as missing params')
      t.strictSame(response.json().message, 'body should have required property \'password\'', 'Error message from missing password as empty string')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error.')
    }
  })

  void t.test('Missing password (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signin',
        payload: {
          password: 'logintest_123'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing email as missing params')
      t.strictSame(response.json().message, 'body should have required property \'email\'', 'Error message from missing password as missing params')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error.')
    }
  })

  void t.test('Successful login', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signin',
        payload: {
          email: 'logintest@gmail.com',
          password: 'logintest_123'
        }
      })

      t.strictSame(response.statusCode, 200, 'Success code from success signin')
      t.type(response.json().token, 'string', 'Error message from missing email as missing params')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error.')
    }
  })

  t.end()
})
