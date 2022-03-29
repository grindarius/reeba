import dayjs from 'dayjs'
import t from 'tap'

import createServer from '../../src/app'
import client from '../pool'

void t.test('get profile data', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query('delete from "users" where user_username = $1', ['profiledataguy'])

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'profiledataguy',
      email: 'profiledataguy@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '4589403342'
    }
  })

  const birthdate = dayjs().subtract(20, 'years').toDate()
  await client.query('update "users" set user_birthdate = $1 where user_username = $2', [birthdate, 'profiledataguy'])

  const userResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'profiledataguy@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  const token = userResponse.json<{ token: string }>().token

  void t.test('route does not exist', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/accounts//profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      t.strictSame(response.statusCode, 400)
      t.strictSame(response.json().message, 'params should have required property \'username\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('inexistent username', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/accounts/randomguylolsdf/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      t.strictSame(response.statusCode, 404)
      t.strictSame(response.json().message, 'user not found')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('successful call', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/accounts/aryastark/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      t.strictSame(response.json(), {
        email: 'aryastark@gmail.com',
        phoneCountryCode: '66',
        phoneNumber: '994485893',
        birthdate: '',
        iso31662: ''
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('guys with a birthdate', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/accounts/profiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      t.strictSame(response.json(), {
        email: 'profiledataguy@gmail.com',
        phoneCountryCode: '66',
        phoneNumber: '4589403342',
        birthdate: dayjs(birthdate).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString(),
        iso31662: ''
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
