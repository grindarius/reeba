import bcrypt from 'bcrypt'
import chalk from 'chalk'
import Chance from 'chance'
import dotenv from 'dotenv-flow'
import { dirname, resolve } from 'node:path'
import { exit } from 'node:process'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const Client = pg.Client

dotenv.config({
  path: resolve(__dirname, '..', 'packages', 'backend')
})

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME
})

console.log(chalk.blue('inserting random users into database'))

client.connect().then(async () => {
  const chance = new Chance(223345)

  const users = Array.from({ length: 10 }, () => {
    const hash = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync('asdfghjkl123', hash)

    return [`${chance.first({ nationality: 'en' }).toLowerCase()}_${chance.last({ nationality: 'en' }).toLowerCase()}`, chance.email(), hashedPassword]
  })

  await client.query(
    'delete from "users"'
  )

  for await (const user of users) {
    const dupes = await client.query(
      'select user_username from "users" where user_email = $1',
      [user[0]]
    )

    if (dupes.rowCount <= 0) {
      await client.query(
        'insert into users (user_username, user_email, user_password) values ($1, $2, $3)',
        user
      )

      console.log(chalk.green(`welcome ${chalk.cyan(user[0])} to the system!`))
    }
  }

  console.log(chalk.blue('successfully generated random users'))
  await client.end()
  exit(1)
})
