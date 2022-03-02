import dotenv from 'dotenv-flow'
import { resolve } from 'node:path'
import t from 'tap'

import createServer from '../../src/app'

dotenv.config({
  path: resolve(__dirname, '..', '..'),
  silent: true
})

void t.test('get user test', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  const resp = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'sansastark@gmail.com',
      password: 'sansastark'
    }
  })

  const token = resp.json().token

  void t.test('get data from ceratain user', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        url: '/users/sansastark',
        headers: {
          Authorization: `Bearer ${token as string}`
        }
      })

      t.strictSame(response.json().username, 'sansastark')
      t.strictSame(response.json().verificationStatus, true)
      t.strictSame(response.json().socialMedias, {
        facebook: '',
        instagram: '',
        twitter: '',
        tiktok: '',
        email: '',
        website: ''
      })
      t.strictSame(response.json().profileDescription, 'I am Arya Stark\'s older sister.')
      t.strictSame(response.json().eventsCreatedAmount, undefined)
      t.strictSame(response.json().eventsAttendedAmount, undefined)
      t.strictSame(response.json().followersAmount, 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('empty querystring', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        url: '/users/',
        headers: {
          Authorization: `Bearer ${token as string}`
        }
      })

      t.strictSame(response.statusCode, 400)
      t.strictSame(response.json().message, 'params should have required property \'username\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('user not found', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        url: '/users/sdfsdfddfdf',
        headers: {
          Authorization: `Bearer ${token as string}`
        }
      })

      t.strictSame(response.statusCode, 404)
      t.strictSame(response.json().message, 'User not found')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing the user, admin logic', async t => {
    const login = await app.inject({
      method: 'post',
      url: '/auth/signin',
      payload: {
        email: 'aryastark@gmail.com',
        password: 'aryastark'
      }
    })

    try {
      const response = await app.inject({
        method: 'GET',
        url: '/users/aryastark',
        headers: {
          Authorization: `Bearer ${login.json().token as string}`
        }
      })

      t.strictSame(response.json().username, 'aryastark')
      t.strictSame(response.json().verificationStatus, false)
      t.strictSame(response.json().socialMedias, {
        facebook: '',
        instagram: '',
        twitter: '',
        tiktok: '',
        email: '',
        website: ''
      })
      t.strictSame(response.json().profileDescription, 'I am Sansa Stark\'s youger sister.')
      t.strictSame(response.json().eventsCreatedAmount, undefined)
      t.strictSame(response.json().eventsAttendedAmount, undefined)
      t.strictSame(response.json().followersAmount, 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
