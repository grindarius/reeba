import dotenv from 'dotenv-flow'
import FormData from 'form-data'
import { createReadStream, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Client } from 'pg'
import Resemble from 'resemblejs'
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
    const email = await client.query('select * from "users" where user_username = \'avatar_test\'')

    if (email.rowCount <= 0) {
      await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'avatar_test',
          email: 'avatartest@gmail.com',
          password: 'avatartest_123'
        }
      })
    }
  } catch (error) {
    t.error(error)
    t.fail('Error while connecting to database')
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
      t.fail('There should not be an error')
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
      t.fail('There should not be an error')
    }
  })

  void t.test('posting image to existing profile', async t => {
    const form = new FormData()

    form.append('image', createReadStream(resolve(__dirname, 'test-avatar.jpg')))

    try {
      const response = await app.inject({
        method: 'POST',
        url: '/avatars/avatar_test',
        payload: form,
        headers: form.getHeaders()
      })

      t.strictSame(response.statusCode, 200, 'status code from posting image')
      t.strictSame(response.json().message, 'complete', 'message from posting image')
    } catch (error) {
      t.error(error)
      t.fail('Error while posting image to existing profile')
    }
  })
})

void t.test('Get image', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    await client.end()
  })

  void t.test('get default user image when emptystring is passed', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        path: '/avatars/'
      })

      Resemble(response.rawPayload).compareTo(readFileSync(resolve(__dirname, '..', '..', 'uploads', 'default-user-profile.png'))).onComplete((result) => {
        t.strictSame(result.isSameDimensions, true, 'same image dimension')
        t.strictSame(result.misMatchPercentage, '0.00', 'image mismatch percentage')
      })
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error')
    }
  })

  void t.test('get avatar of unknown user', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        path: '/avatars/unknown_user'
      })

      Resemble(response.rawPayload).compareTo(readFileSync(resolve(__dirname, '..', '..', 'uploads', 'default-user-profile.png')))
        .onComplete(result => {
          t.strictSame(result.isSameDimensions, true, 'same image dimension')
          t.strictSame(result.misMatchPercentage, '0.00', 'image mismatch percentage')
        })
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error')
    }
  })

  void t.test('get avatar of user avatar_test', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        path: '/avatars/avatar_test'
      })

      Resemble(response.rawPayload).compareTo(readFileSync(resolve(__dirname, 'test-avatar.jpg')))
        .onComplete(result => {
          t.strictSame(result.isSameDimensions, true, 'same image dimension')
          t.strictSame(result.misMatchPercentage, '0.00', 'image mismatch percentage')
        })
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error')
    }
  })

  void t.test('get avatar of a user that doesn\'t have image', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        url: '/avatars/login_test_boy'
      })

      Resemble(response.rawPayload).compareTo(readFileSync(resolve(__dirname, '..', '..', 'uploads', 'default-user-profile.png')))
        .onComplete(result => {
          t.strictSame(result.isSameDimensions, true, 'same image dimension')
          t.strictSame(result.misMatchPercentage, '0.00', 'image mismatch percentage')
        })
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error in a successful registration.')
    }
  })
})
