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

void t.test('get image', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    await client.end()
  })

  try {
    await client.connect()

    // * Looking for existing logged in user, if not. create one (without image path).
    const email = await client.query('select * from "users" where user_username = \'getavatartest\'')

    if (email.rowCount <= 0) {
      await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'getavatartest',
          email: 'getavatartest@gmail.com',
          password: 'getavatartest_123',
          phoneCountryCode: '332',
          phoneNumber: '9384937485'
        }
      })
    }

    const form = new FormData()
    form.append('image', createReadStream(resolve(__dirname, 'test-get-avatar.png')))

    await app.inject({
      method: 'POST',
      url: '/avatars/getavatartest',
      payload: form,
      headers: form.getHeaders()
    })
  } catch (error) {
    t.error(error)
    t.fail()
  }

  void t.test('get default user image when emptystring is passed', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        path: '/avatars/'
      })

      Resemble(response.rawPayload).compareTo(readFileSync(resolve(__dirname, '..', '..', 'uploads', 'default-user-profile.png'))).onComplete((result) => {
        t.strictSame(result.isSameDimensions, true, 'same image dimension')
        t.strictSame(Number(result.misMatchPercentage), 0, 'image mismatch percentage')
      })
    } catch (error) {
      t.error(error)
      t.fail()
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
          t.strictSame(Number(result.misMatchPercentage), 0, 'image mismatch percentage')
        })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('get avatar of user getavatartest', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        path: '/avatars/getavatartest'
      })

      Resemble(response.rawPayload).compareTo(readFileSync(resolve(__dirname, 'test-get-avatar.png')))
        .onComplete(result => {
          t.strictSame(result.isSameDimensions, true, 'same image dimension')
          t.strictSame(Number(result.misMatchPercentage), 0, 'image mismatch percentage')
        })
    } catch (error) {
      t.error(error)
      t.fail()
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
          t.strictSame(Number(result.misMatchPercentage), 0, 'image mismatch percentage')
        })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
