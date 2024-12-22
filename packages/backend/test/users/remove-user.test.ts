import t from 'tap'

import createServer from '../../src/app'
import client from '../pool'

void t.test('removing a user', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query(
    'delete from "users" where user_username in ($1, $2)',
    ['rolebulliedguy2', 'fakeadminguy2']
  )

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'rolebulliedguy2',
      email: 'rolebulliedguy2@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '948599984',
      iso31662: 'TH'
    }
  })

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'fakeadmin2',
      email: 'fakeadmin2@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '9485273984',
      iso31662: 'TH'
    }
  })

  const fakeAdminResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'fakeadmin2@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  const fakeAdminToken = fakeAdminResponse.json<{ token: string }>().token

  await t.test('fake adming deleting a user', async t => {
    try {
      const response = await app.inject({
        method: 'delete',
        url: '/users/rolebulliedguy2',
        headers: {
          Authorization: `Bearer ${fakeAdminToken}`
        }
      })

      expect(response.statusCode).toEqual( 403)
      t.strictSame(response.json().message, 'forbidden')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await client.query(
    'update "users" set user_role = $1 where user_username = $2',
    ['admin', 'fakeadmin2']
  )

  const realAdminResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'fakeadmin2@gmail.com',
      password: 'asdfghjkl123'
    }
  })
  const realAdminToken = realAdminResponse.json<{ token: string }>().token

  await t.test('no username to remove', async t => {
    try {
      const response = await app.inject({
        method: 'delete',
        url: '/users/',
        headers: {
          Authorization: `Bearer ${realAdminToken}`
        }
      })

      expect(response.statusCode).toEqual( 400)
      t.strictSame(response.json().message, 'params should have required property \'username\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test('successfully mark a user as deleted', async t => {
    try {
      const response = await app.inject({
        method: 'delete',
        url: '/users/rolebulliedguy2',
        headers: {
          Authorization: `Bearer ${realAdminToken}`
        }
      })

      expect(response.statusCode).toEqual( 200)
      t.strictSame(response.json(), { message: 'complete' })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
