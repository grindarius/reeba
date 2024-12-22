import t from 'tap'

import createServer from '../../src/app'
import client from '../pool'

void t.test('getting events data for admin', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query('delete from "users" where user_username in ($1)', ['fakeadminfather'])

  const adminResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'sansastark@gmail.com',
      password: 'sansastark'
    }
  })

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'fakeadminfather',
      email: 'fakeadminfather@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '9483943483',
      iso31662: 'TH'
    }
  })

  const fakeAdminResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'fakeadminfather@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  const adminToken = adminResponse.json<{ token: string }>().token
  const fakeAdminToken = fakeAdminResponse.json<{ token: string }>().token

  console.log(fakeAdminToken, 'fake addmin token is hereeeeee')

  void t.test('403 for fake admin', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${fakeAdminToken}`
        },
        query: {
          page: '1',
          sort: 'event-name-asc'
        }
      })

      t.strictSame(response.json().message, 'forbidden')
      expect(response.statusCode).toEqual( 403)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('real admin, negative page number', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '0',
          sort: 'event-name-asc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('real admin, negative page number', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '0',
          sort: 'event-name-desc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('real admin, NaN page number', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: 'who?',
          sort: 'username-asc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('sort being empty string', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: ''
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 1', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'event-name-asc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 2', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'event-name-desc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 3', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'username-asc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 4', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'username-desc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 5', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'creation-date-asc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 6', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'creation-date-desc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 7', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'opening-date-asc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 8', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'opening-date-desc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 9', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'status-asc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 10', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'status-desc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 11', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'seat-fullness-percentage-asc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 12', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'seat-fullness-percentage-desc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 13', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'total-seats-asc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 14', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'total-seats-desc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 15', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'total-taken-seats-asc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('testing switch for query builder 16', async t => {
    try {
      const response = await app.inject({
        method: 'get',
        url: '/admin/events',
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        query: {
          page: '1',
          sort: 'total-taken-seats-desc'
        }
      })

      expect(response.statusCode).toEqual( 200)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
