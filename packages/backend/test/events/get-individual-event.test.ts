import dotenv from 'dotenv-flow'
import { resolve } from 'node:path'
import { Client } from 'pg'
import t from 'tap'

import createServer from '../../src/app'

dotenv.config({
  path: resolve(__dirname, '..', '..', 'src')
})

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME
})

const mockEvent = async (): Promise<void> => {
}

void t.todo('get individual event', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    await client.end()
  })

  try {
    await client.connect()

    await mockEvent()

    const email = await client.query('select * from "users" where user_email = \'logintest@gmail.com\'')

    if (email.rowCount <= 0) {
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
    t.fail()
  }
})
