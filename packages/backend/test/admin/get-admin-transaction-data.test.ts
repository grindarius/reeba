import t from 'tap'

import createServer from '../../src/app'
import client from '../pool'

void t.test('getting transaction data', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query('delete from "users" where user_username = $1', ['thatfakeadminbrother'])

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'thatfakeadminbrother',
      email: 'thatfakeadminbrother@gmail.com',
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
      email: 'thatfakeadminbrother@gmail.com',
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

  void t.test('forbidden request by fake admin', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/transactions',
        headers: {
          Authorization: `Bearer ${token}`
        },
        query: {
          page: '1',
          sort: 'time-asc'
        }
      })

      t.strictSame(response.statusCode, 403)
      t.strictSame(response.json().message, 'forbidden')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('page being 0', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/transactions',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '0'
        }
      })

      t.strictSame(response.statusCode, 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('undefined causing 0 in number conversion', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/transactions',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: 'undefined',
          sort: 'time-desc'
        }
      })

      t.strictSame(response.statusCode, 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('null causing NaN in number conversion', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/transactions',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: 'null',
          sort: 'username-asc'
        }
      })

      t.strictSame(response.statusCode, 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('sort being empty string', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/transactions',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: ''
        }
      })

      t.strictSame(response.statusCode, 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('successful order', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/transactions',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'username-desc'
        }
      })

      t.strictSame(response.statusCode, 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('page too high', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/transactions',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '10',
          sort: 'price-asc'
        }
      })

      t.strictSame(response.statusCode, 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('another one for price desc', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/transactions',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '10',
          sort: 'price-desc'
        }
      })

      t.strictSame(response.statusCode, 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
