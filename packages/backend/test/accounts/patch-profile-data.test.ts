import dayjs from 'dayjs'
import t from 'tap'

import { verify } from '@node-rs/argon2'
import { users } from '@reeba/common'

import createServer from '../../src/app'
import argon2Options from '../../src/constants/argon2'
import client from '../pool'

void t.test('patch profile data', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query('delete from "users" where user_username = $1', ['patchprofiledataguy'])

  await app.inject({
    method: 'post',
    url: '/auth/signup',
    payload: {
      username: 'patchprofiledataguy',
      email: 'patchprofiledataguy@gmail.com',
      password: 'asdfghjkl123',
      phoneCountryCode: '66',
      phoneNumber: '4589403342'
    }
  })

  const userResponse = await app.inject({
    method: 'post',
    url: '/auth/signin',
    payload: {
      email: 'patchprofiledataguy@gmail.com',
      password: 'asdfghjkl123'
    }
  })

  const token = userResponse.json<{ token: string }>().token

  void t.test('no username in params', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts//profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '4589403342',
          birthdate: dayjs().toISOString()
        }
      })

      expect(response.statusCode).toEqual( 400)
      t.strictSame(response.json().message, 'params should have required property \'username\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing email', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '4589403342',
          birthdate: dayjs().toISOString()
        }
      })

      expect(response.statusCode).toEqual( 400)
      t.strictSame(response.json().message, 'body should have required property \'email\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing password', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: 'patchprofiledataguy@gmail.com',
          phoneCountryCode: '66',
          phoneNumber: '4589403342',
          birthdate: dayjs().toISOString()
        }
      })

      expect(response.statusCode).toEqual( 400)
      t.strictSame(response.json().message, 'body should have required property \'password\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing phone country code', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: 'patchprofiledataguy@gmail.com',
          password: 'asdfghjkl123',
          phoneNumber: '4589403342',
          birthdate: dayjs().toISOString()
        }
      })

      expect(response.statusCode).toEqual( 400)
      t.strictSame(response.json().message, 'body should have required property \'phoneCountryCode\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing phone number', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: 'patchprofiledataguy@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          birthdate: dayjs().toISOString()
        }
      })

      expect(response.statusCode).toEqual( 400)
      t.strictSame(response.json().message, 'body should have required property \'phoneNumber\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing birthdate', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: 'patchprofiledataguy@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '4589403342'
        }
      })

      expect(response.statusCode).toEqual( 400)
      t.strictSame(response.json().message, 'body should have required property \'birthdate\'')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('wrong email format', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: 'patchprofiledataguygmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '4589403342',
          birthdate: dayjs().toISOString()
        }
      })

      expect(response.statusCode).toEqual( 400)
      t.strictSame(response.json().message, 'invalid \'email\' format')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('wrong phone number format', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: 'patchprofiledataguy@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '4589403342sdffdfsf33232',
          birthdate: dayjs().toISOString()
        }
      })

      expect(response.statusCode).toEqual( 400)
      t.strictSame(response.json().message, 'invalid \'phoneNumber\' format')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  const newBirthdate = dayjs().subtract(30, 'years').format('YYYY-MM-DD')

  void t.test('sending empty string should not change value', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: '',
          password: '',
          phoneCountryCode: '',
          phoneNumber: '',
          birthdate: ''
        }
      })

      const newUserData = await client.query<users>(
        'select * from "users" where user_username = $1',
        ['patchprofiledataguy']
      )

      const isSamePassword = await verify(newUserData.rows[0].user_password, 'asdfghjkl123', argon2Options)

      t.strictSame(response.json(), { message: 'complete' })
      t.strictSame(newUserData.rows[0].user_email, 'patchprofiledataguy@gmail.com')
      t.ok(isSamePassword)
      t.strictSame(newUserData.rows[0].user_phone_country_code, '66')
      t.strictSame(newUserData.rows[0].user_phone_number, '4589403342')
      t.throws(() => {
        dayjs(newUserData.rows[0].user_birthdate).toISOString()
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('changing email', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: 'patchprofiledataguy2@gmail.com',
          password: '',
          phoneCountryCode: '',
          phoneNumber: '',
          birthdate: ''
        }
      })

      const newUserData = await client.query<users>(
        'select * from "users" where user_username = $1',
        ['patchprofiledataguy']
      )

      const isSamePassword = await verify(newUserData.rows[0].user_password, 'asdfghjkl123', argon2Options)

      t.strictSame(response.json(), { message: 'complete' })
      t.strictSame(newUserData.rows[0].user_email, 'patchprofiledataguy2@gmail.com')
      t.ok(isSamePassword)
      t.strictSame(newUserData.rows[0].user_phone_country_code, '66')
      t.strictSame(newUserData.rows[0].user_phone_number, '4589403342')
      t.throws(() => {
        dayjs(newUserData.rows[0].user_birthdate).toISOString()
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('changing phone country code', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: '',
          password: '',
          phoneCountryCode: '44',
          phoneNumber: '',
          birthdate: ''
        }
      })

      const newUserData = await client.query<users>(
        'select * from "users" where user_username = $1',
        ['patchprofiledataguy']
      )

      const isSamePassword = await verify(newUserData.rows[0].user_password, 'asdfghjkl123', argon2Options)

      t.strictSame(response.json(), { message: 'complete' })
      t.strictSame(newUserData.rows[0].user_email, 'patchprofiledataguy2@gmail.com')
      t.ok(isSamePassword)
      t.strictSame(newUserData.rows[0].user_phone_country_code, '44')
      t.strictSame(newUserData.rows[0].user_phone_number, '4589403342')
      t.throws(() => {
        dayjs(newUserData.rows[0].user_birthdate).toISOString()
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('changing phone number', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: '',
          password: '',
          phoneCountryCode: '',
          phoneNumber: '949504939',
          birthdate: ''
        }
      })

      const newUserData = await client.query<users>(
        'select * from "users" where user_username = $1',
        ['patchprofiledataguy']
      )

      const isSamePassword = await verify(newUserData.rows[0].user_password, 'asdfghjkl123', argon2Options)

      t.strictSame(response.json(), { message: 'complete' })
      t.strictSame(newUserData.rows[0].user_email, 'patchprofiledataguy2@gmail.com')
      t.ok(isSamePassword)
      t.strictSame(newUserData.rows[0].user_phone_country_code, '44')
      t.strictSame(newUserData.rows[0].user_phone_number, '949504939')
      t.throws(() => {
        dayjs(newUserData.rows[0].user_birthdate).toISOString()
      })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
  void t.test('changing birthdate', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: '',
          password: '',
          phoneCountryCode: '',
          phoneNumber: '949504939',
          birthdate: dayjs(newBirthdate).toISOString()
        }
      })

      const newUserData = await client.query<users>(
        'select * from "users" where user_username = $1',
        ['patchprofiledataguy']
      )

      const isSamePassword = await verify(newUserData.rows[0].user_password, 'asdfghjkl123', argon2Options)

      t.strictSame(response.json(), { message: 'complete' })
      t.strictSame(newUserData.rows[0].user_email, 'patchprofiledataguy2@gmail.com')
      t.ok(isSamePassword)
      t.strictSame(newUserData.rows[0].user_phone_country_code, '44')
      t.strictSame(newUserData.rows[0].user_phone_number, '949504939')
      t.doesNotThrow(() => {
        dayjs(newUserData.rows[0].user_birthdate).toISOString()
      })
      t.strictSame(dayjs(newUserData.rows[0].user_birthdate).format('YYYY-MM-DD'), dayjs(newBirthdate).format('YYYY-MM-DD'))
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('changing things except password', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: 'patchprofiledataguy2@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '55',
          phoneNumber: '968483948',
          birthdate: dayjs(newBirthdate).toISOString()
        }
      })

      const newUserData = await client.query<users>(
        'select * from "users" where user_username = $1',
        ['patchprofiledataguy']
      )

      const isSamePassword = await verify(newUserData.rows[0].user_password, 'asdfghjkl123', argon2Options)

      t.strictSame(response.json(), { message: 'complete' })
      t.strictSame(newUserData.rows[0].user_email, 'patchprofiledataguy2@gmail.com')
      t.ok(isSamePassword)
      t.strictSame(newUserData.rows[0].user_phone_country_code, '55')
      t.strictSame(newUserData.rows[0].user_phone_number, '968483948')
      t.strictSame(dayjs(newUserData.rows[0].user_birthdate ?? dayjs().toISOString()).toISOString(), dayjs(newBirthdate).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString())
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('changing password', async t => {
    try {
      const response = await app.inject({
        method: 'patch',
        url: '/accounts/patchprofiledataguy/profile-data',
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: 'patchprofiledataguy2@gmail.com',
          password: 'asdfghjkl1234',
          phoneCountryCode: '55',
          phoneNumber: '968483948',
          birthdate: newBirthdate
        }
      })

      const newUserData = await client.query(
        'select * from "users" where user_username = $1',
        ['patchprofiledataguy']
      )

      const isSamePassword = await verify(newUserData.rows[0].user_password as string, 'asdfghjkl1234')

      t.strictSame(response.json(), { message: 'complete' })
      t.strictSame(newUserData.rows[0].user_email, 'patchprofiledataguy2@gmail.com')
      t.ok(isSamePassword)
      t.strictSame(newUserData.rows[0].user_phone_country_code, '55')
      t.strictSame(newUserData.rows[0].user_phone_number, '968483948')
      t.strictSame(dayjs(newUserData.rows[0].user_birthdate ?? dayjs().toISOString()).toISOString(), dayjs(newBirthdate).set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toISOString())
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
