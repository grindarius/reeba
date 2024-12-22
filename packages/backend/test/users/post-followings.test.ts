import t from 'tap'

import createServer from '../../src/app'
import client from '../pool'

void t.test('following and unfollowing user', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query('delete from "users" where user_username in ($1, $2)', ['baseguy', 'followerguy'])

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'baseguy',
      email: 'baseguy@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '94859384'
    }
  })

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'followerguy',
      email: 'followerguy@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '44',
      phoneNumber: '48394859'
    }
  })

  const baseguyToken = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'baseguy@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  void t.test('missing username in body', async t => {
    try {
      const response = await app.inject({
        method: 'post',
        url: '/followings/follow',
        headers: {
          Authorization: `Bearer ${baseguyToken.json().token as string}`
        },
        payload: {
          anotherUsername: ''
        }
      })

      expect(response.statusCode).toEqual( 400)
      t.strictSame(response.json().message, 'body should have required property \'anotherUsername\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('user to follow does not exist', async t => {
    try {
      const response = await app.inject({
        method: 'post',
        url: '/followings/follow',
        headers: {
          Authorization: `Bearer ${baseguyToken.json().token as string}`
        },
        payload: {
          anotherUsername: 'whodis'
        }
      })

      expect(response.statusCode).toEqual( 400)
      t.strictSame(response.json().message, 'one of the users does not exist')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('successful call', async t => {
    try {
      const response = await app.inject({
        method: 'post',
        url: '/followings/follow',
        headers: {
          Authorization: `Bearer ${baseguyToken.json().token as string}`
        },
        payload: {
          anotherUsername: 'followerguy'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json()).toEqual( { isFollowingCurrentUser: true })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('following same username should unfollow', async t => {
    try {
      const response = await app.inject({
        method: 'post',
        url: '/followings/follow',
        headers: {
          Authorization: `Bearer ${baseguyToken.json().token as string}`
        },
        payload: {
          anotherUsername: 'followerguy'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json()).toEqual( { isFollowingCurrentUser: false })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('unfollowing same username should follow', async t => {
    try {
      const response = await app.inject({
        method: 'post',
        url: '/followings/follow',
        headers: {
          Authorization: `Bearer ${baseguyToken.json().token as string}`
        },
        payload: {
          anotherUsername: 'followerguy'
        }
      })

      expect(response.statusCode).toEqual( 200)
      expect(response.json()).toEqual( { isFollowingCurrentUser: true })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
