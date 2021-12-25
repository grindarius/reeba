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
    t.fail('There should not be an error')
  }

  await client.query('DELETE FROM users')
  await client.end()

  t.end()
})
