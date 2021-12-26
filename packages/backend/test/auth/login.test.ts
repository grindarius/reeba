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

void t.todo('Login process', async t => {
  const app = createServer()

  t.teardown(async () => await app.close())

  try {
    await client.connect()
  } catch (error) {
    t.error(error)
    t.fail('Error while connecting to database')
  }

  void t.todo('Missing email (as empty string)')
  void t.todo('Missing email (as missing params)')
  void t.todo('Missing password (as empty string)')
  void t.todo('Missing password (as missing params)')

  void t.todo('Successful login')

  await client.end()
  t.end()
})
