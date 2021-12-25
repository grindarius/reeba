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

  void t.test('Missing username should return 400', async t => {
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

      t.strictSame(response.statusCode, 400, 'Bad request because of missing username')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error, but rather bad request')
    }
  })

  void t.todo('Missing email should return 400', async t => {
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

      t.strictSame(response.statusCode, 400, 'Bad request because of missing email')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error, but rather bad request.')
    }
  })

  void t.todo('Email is not empty but wrong format', async t => {
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

      t.strictSame(response.statusCode, 400, 'Bad request because of missing email')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error,')
    }
  })
  void t.todo('Missing password should return 400')

  await client.end()
  t.end()
})
