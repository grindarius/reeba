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

const userPassword = '$argon2id$v=19$m=4096,t=12,p=4$snysIHKmfhvtO+uORE8jwA$KemeOraiG6zasIT8bgYljyEuoGHgl5RQAUhr9bRBTVhJ11sGaErGuA'
const adminPassword = '$argon2id$v=19$m=4096,t=12,p=4$/abpY3TZYk3ChzK054P26Q$q2QUJ52HaOUKD4U7NUsemnqxMOUlXpn3mFKAv4+dl2EWJ1peA+4SKQ'

console.log(chalk.green('deleting data in tables'));
// eslint-disable-next-line
(async () => {
  await client.connect()

  console.log(chalk.green('deleting transactions'))
  await client.query('delete from transaction_details')
  await client.query('delete from transactions')
  console.log(chalk.green('deleting users'))
  await client.query('delete from users')
  console.log(chalk.green('deleting followers'))
  await client.query('delete from user_followers')
  console.log(chalk.green('deleting events'))
  await client.query('delete from events')
  console.log(chalk.green('deleting event tags'))
  await client.query('delete from event_tags_bridge')
  await client.query('delete from event_tags')

  console.log(chalk.green('successfully removes data from the db'))
  const usersCount = await client.query('select count(*) as users_count from "users"')
  const eventsCount = await client.query('select count(*) as events_count from "events"')
  const eventDatetimesCount = await client.query('select count(*) as event_datetimes_count from "event_datetimes"')
  const eventSectionsCount = await client.query('select count(*) as event_sections_count from "event_sections"')
  const eventSeatsCount = await client.query('select count(*) as event_seats_count from "event_seats"')
  const transactionsCount = await client.query('select count(*) as transactions_count from "transactions"')
  const transactionDetailsCount = await client.query('select count(*) as transaction_details_count from "transaction_details"')
  const eventTagsCount = await client.query('select count(*) as event_tags_count from "event_tags"')
  const eventTagsBridgeCount = await client.query('select count(*) as event_tags_bridge_count from "event_tags_bridge"')

  console.log(chalk.green('users_count'), usersCount.rows[0].users_count)
  console.log(chalk.green('events_count'), eventsCount.rows[0].events_count)
  console.log(chalk.green('event_datetimes_count'), eventDatetimesCount.rows[0].event_datetimes_count)
  console.log(chalk.green('event_sections_count'), eventSectionsCount.rows[0].event_sections_count)
  console.log(chalk.green('event_seats_count'), eventSeatsCount.rows[0].event_seats_count)
  console.log(chalk.green('transactions_count'), transactionsCount.rows[0].transactions_count)
  console.log(chalk.green('transaction_details_count'), transactionDetailsCount.rows[0].transaction_details_count)
  console.log(chalk.green('event_tags_count'), eventTagsCount.rows[0].event_tags_count)
  console.log(chalk.green('event_tags_bridge_count'), eventTagsBridgeCount.rows[0].event_tags_bridge_count)

  await client.query(
    `insert into event_tags (event_tag_label) values
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
    on conflict (event_tag_label) do nothing`
  )

  await client.query(
    `insert into users (
      user_username,
      user_email,
      user_password,
      user_phone_country_code,
      user_phone_number,
      user_role,
      user_profile_description,
      user_image_profile_path,
      user_iso_31662_code
    ) values (
      'aryastark',
      'aryastark@gmail.com',
      '${userPassword}',
      '66',
      '994485893',
      'user',
      'I am Sansa Stark''s youger sister.',
      'arya-stark.png',
      'TH'
    ), (
      'sansastark',
      'sansastark@gmail.com',
      '${adminPassword}',
      '66',
      '995894833',
      'admin',
      'I am Arya Stark''s older sister.',
      'sansa-stark.png',
      'TH'
    ) on conflict (user_username) do nothing`
  )

  await client.end()
})()
