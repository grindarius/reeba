import t from 'tap'

import createServer from '../../src/app'
import client from '../pool'

void t.test('manipulating verification status of user', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query(
    'delete from "users" where user_username in ($1, $2)',
    ['wannabeverified', 'thatadminboss']
  )

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'wannabeverified',
      email: 'wannabeverified@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '94833283984',
      iso31662: 'TH'
    }
  })

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'thatadminboss',
      email: 'thatadminboss@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '94859339824',
      iso31662: 'TH'
    }
  })

  const fakeAdminResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'thatadminboss@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  const fakeAdminToken = fakeAdminResponse.json<{ token: string }>().token

  await t.test('granting verification status by fake admin', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/users/wannabeverified/verification',
        headers: {
          Authorization: `Bearer ${fakeAdminToken}`
        }
      })

      t.strictSame(response.statusCode, 403)
      t.strictSame(response.json().message, 'forbidden')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await client.query(
    'update "users" set user_role = $1 where user_username = $2',
    ['admin', 'thatadminboss']
  )

  const realAdminResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'thatadminboss@gmail.com',
      password: 'asdfghjkl123'
    }
  })
  const realAdminToken = realAdminResponse.json<{ token: string }>().token

  await t.test('no user to grant verification status to', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/users//verification',
        headers: {
          Authorization: `Bearer ${realAdminToken}`
        }
      })

      t.strictSame(response.statusCode, 400)
      t.strictSame(response.json().message, 'params should have required property \'username\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test('successfully grant verification status', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/users/wannabeverified/verification',
        headers: {
          Authorization: `Bearer ${realAdminToken}`
        }
      })

      t.strictSame(response.statusCode, 200)
      t.strictSame(response.json(), { message: 'complete' })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test('revoke verification status by fake admin', async t => {
    try {
      const response = await app.inject({
        method: 'delete',
        url: '/users/wannabeverified/verification',
        headers: {
          Authorization: `Bearer ${fakeAdminToken}`
        }
      })

      t.strictSame(response.statusCode, 403)
      t.strictSame(response.json().message, 'forbidden')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test('no username to revoke verification status from', async t => {
    try {
      const response = await app.inject({
        method: 'delete',
        url: '/users//verification',
        headers: {
          Authorization: `Bearer ${realAdminToken}`
        }
      })

      t.strictSame(response.statusCode, 400)
      t.strictSame(response.json().message, 'params should have required property \'username\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test('successfully revoke verification status', async t => {
    try {
      const response = await app.inject({
        method: 'delete',
        url: '/users/wannabeverified/verification',
        headers: {
          Authorization: `Bearer ${realAdminToken}`
        }
      })

      t.strictSame(response.statusCode, 200)
      t.strictSame(response.json(), { message: 'complete' })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
