import chalk from 'chalk'
import dotenv from 'dotenv-flow'
import { resolve } from 'node:path'
import { Client } from 'pg'

dotenv.config({
  path: resolve(__dirname, '..', '..', 'backend')
})

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME
})

console.log(chalk.green('deleting data in tables'));
// eslint-disable-next-line
(async () => {
  await client.connect()

  console.log(chalk.green('deleting transactions'))
  await client.query('delete from transactions')
  console.log(chalk.green('deleting users'))
  await client.query('delete from users')
  console.log(chalk.green('deleting followers'))
  await client.query('delete from user_followers')
  console.log(chalk.green('deleting events'))
  await client.query('delete from events')

  console.log(chalk.green('successfully removes data from the db'))

  await client.query(`insert into event_tags (event_tag_label) values
    ('amphitheater'),
    ('business'),
    ('concert'),
    ('entertainment'),
    ('fan-meet'),
    ('gameshow'),
    ('lifestyle'),
    ('live'),
    ('musical'),
    ('online'),
    ('opera'),
    ('seminar'),
    ('stand-up-comedy'),
    ('technology'),
    ('variety')
  on conflict (event_tag_label) do nothing;`)

  await client.query(`insert into users (
    user_username,
    user_email,
    user_password,
    user_phone_country_code,
    user_phone_number,
    user_role,
    user_profile_description
  ) values (
    'aryastark',
    'aryastark@gmail.com',
    '$2b$10$stcsoa28Ym.QM3f3NyQI2Oac7XByJIzv3mjLO/fsmkQjLPBi8HMj2',
    '66',
    '994485893',
    'user',
    'I am Sansa Stark''s youger sister.'
  ), (
    'sansastark',
    'sansastark@gmail.com',
    '$2b$10$COLqSOrDQUFMGB1oIr7GUexOf7myts.5YILB868jOA1OIIALEX0KG',
    '66',
    '995894833',
    'admin',
    'I am Arya Stark''s older sister.'
  ) on conflict (user_username) do nothing;`)

  await client.end()
})()
