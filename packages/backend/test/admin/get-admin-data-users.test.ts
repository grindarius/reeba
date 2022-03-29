import t from 'tap'

import createServer from '../../src/app'
import client from '../pool'

void t.test('getting admin data about user', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query('delete from "users" where user_username = $1', ['thatnolevelguy'])

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'thatnolevelguy',
      email: 'thatnolevelguy@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '94839483',
      iso31662: 'TH'
    }
  })

  const resp = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'thatnolevelguy@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  const adminResp = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'sansastark@gmail.com',
      password: 'sansastark'
    }
  })

  const token = resp.json<{ token: string }>().token
  const adminToken = adminResp.json<{ token: string }>().token

  void t.test('forbidden user', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/users',
        headers: {
          Authorization: `Bearer ${token}`
        },
        query: {
          page: '1',
          sort: 'name-asc'
        }
      })

      t.strictSame(response.statusCode, 403)
      t.strictSame(response.json().message, 'forbidden')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('successful call', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/users',
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })

      t.strictSame(response.statusCode, 200)
      t.not(response.json().users.length, 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('page being empty string', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/users',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '',
          sort: 'name-desc'
        }
      })

      t.strictSame(response.statusCode, 200)
      t.not(response.json().users.length, 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('page being null', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/users',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: 'null',
          sort: 'regis-asc'
        }
      })

      t.strictSame(response.statusCode, 200)
      t.not(response.json().users.length, 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('page being zero', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/users',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '0',
          sort: 'regis-desc'
        }
      })

      t.strictSame(response.statusCode, 200)
      t.not(response.json().users.length, 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('page too high until count becomes undefined', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/users',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '10',
          sort: 'name-asc'
        }
      })

      t.strictSame(response.statusCode, 200)
      t.equal(response.json().users.length, 0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
