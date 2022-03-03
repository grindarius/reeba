import dotenv from 'dotenv-flow'
import { resolve } from 'node:path'
import t from 'tap'

import createServer from '../../src/app'
import client from '../pool'

dotenv.config({
  path: resolve(__dirname, '..', '..'),
  silent: true
})

void t.test('jwt check test', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  const existingUser = await client.query('select * from "users" where user_username = \'decoratortest\'')

  if (existingUser.rows.length === 0) {
    try {
      await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'decoratortest',
          email: 'decoratortest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '938493892'
        }
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  }

  const response = await app.inject({
    method: 'POST',
    url: '/auth/signin',
    payload: {
      email: 'decoratortest@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  const { token } = response.json<{ token: string, username: string, role: string, verificationStatus: boolean }>()

  void t.test('success test', async t => {
    try {
      const responseSuccess = await app.inject({
        method: 'GET',
        url: '/auth/verification',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      t.strictSame(responseSuccess.statusCode, 200)
      t.strictSame(responseSuccess.json().user.username, 'decoratortest')
      t.strictSame(responseSuccess.json().user.role, 'user')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('timeout token', async t => {
    try {
      const responseError = await app.inject({
        method: 'GET',
        url: '/auth/verification',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlY29yYXRvcnRlc3QiLCJyb2xlIjoidXNlciIsImlhdCI6MTY0NTM4NjgyNSwiZXhwIjoxNjQ1Mzg2ODM1fQ.kDYMo1qrrTsoZwEqnuR8EWZFYvyjQEojkGGKrqFaxHA'
        }
      })

      t.strictSame(responseError.statusCode, 401)
      t.strictSame(responseError.json().message, 'Authorization token expired')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  t.end()
})
