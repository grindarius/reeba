import dotenv from 'dotenv-flow'
import { resolve } from 'path'
import { Client } from 'pg'
import t from 'tap'

import createServer from '../src/app'

dotenv.config({
  path: resolve(__dirname, '..')
})

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME
})

void t.test('Registeration process', async t => {
  const app = createServer()

  t.teardown(async () => await app.close())

  try {
    await client.connect()
  } catch (error) {
    t.error(error)
    t.fail('Error while connecting to database')
  }

  await client.query('DELETE FROM users')

  void t.test('Missing username (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          username: '',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing username')
      t.strictSame(response.json().message, 'Missing \'username\'', 'Error message from missing username')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error, but rather bad request')
    }
  })

  void t.test('Missing username (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing username')
      t.strictSame(response.json().message, 'Missing \'username\'', 'Error message from missing username')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error, but rather bad request')
    }
  })

  void t.test('Missing email (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          username: 'grindarius',
          email: '',
          password: 'asdfghjkl123'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing email')
      t.strictSame(response.json().message, 'Missing \'email\'', 'Error message from missing email')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error, but rather bad request.')
    }
  })

  void t.test('Missing email (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          username: 'grindarius',
          password: 'asdfghjkl123'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing email')
      t.strictSame(response.json().message, 'Missing \'email\'', 'Error message from missing email')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error, but rather bad request.')
    }
  })

  void t.test('Email is not empty but wrong format', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          username: 'grindarius',
          email: 'authtest @gmail.com',
          password: 'asdfghjkl123'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when email is in wrong format')
      t.strictSame(response.json().message, 'Invalid \'email\' format', 'Error message when email is in wrong format')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error, but rather a normal request.')
    }
  })

  void t.test('Missing password (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          password: ''
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when missing password')
      t.strictSame(response.json().message, 'Missing \'password\'', 'Error message when missing password')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error, but rather a normal request.')
    }
  })

  void t.test('Missing password (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          password: ''
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when missing password')
      t.strictSame(response.json().message, 'Missing \'password\'', 'Error message when missing password')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error, but rather a normal request.')
    }
  })

  void t.todo('Successful registration')
  void t.todo('Duplicate email when same email trying to register')

  await client.end()
  t.end()
})
