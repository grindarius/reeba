import dotenv from 'dotenv-flow'
import { resolve } from 'path'
import { Client } from 'pg'
import t from 'tap'

import createServer from '../../src/app'

dotenv.config({
  path: resolve(__dirname, '..', '..'),
  silent: true
})

const client = new Client({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME
})

void t.test('signup process', async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
    await client.end()
  })

  try {
    await client.connect()
    await client.query('delete from "users" where user_email = \'authtest@gmail.com\'')
  } catch (error) {
    t.error(error)
    t.fail()
  }

  void t.test('missing username (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: '',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '983322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing username')
      t.strictSame(response.json().message, 'body should have required property \'username\'', 'Error message from missing username')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing username (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '983322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing username')
      t.strictSame(response.json().message, 'body should have required property \'username\'', 'Error message from missing username')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing email (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: '',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '983322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing email')
      t.strictSame(response.json().message, 'body should have required property \'email\'', 'Error message from missing email')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing email (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '983322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from missing email')
      t.strictSame(response.json().message, 'body should have required property \'email\'', 'Error message from missing email')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('email is not empty but wrong format', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest @gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '983322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when email is in wrong format')
      t.strictSame(response.json().message, 'invalid \'email\' format', 'Error message when email is in wrong format')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing password (as empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          password: '',
          phoneCountryCode: '66',
          phoneNumber: '983322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when missing password')
      t.strictSame(response.json().message, 'body should have required property \'password\'', 'Error message when missing password')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing password (as missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          phoneCountryCode: '66',
          phoneNumber: '983322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when missing password')
      t.strictSame(response.json().message, 'body should have required property \'password\'', 'Error message when missing password')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing phone country code (empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '',
          phoneNumber: '9823322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when missing phone country code')
      t.strictSame(response.json().message, 'body should have required property \'phoneCountryCode\'', 'Error message when missing phone country code')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing phone country code (missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneNumber: '9823322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when missing phone country code')
      t.strictSame(response.json().message, 'body should have required property \'phoneCountryCode\'', 'Error message when missing phone country code')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing phone number (empty string)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: ''
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when missing phone number')
      t.strictSame(response.json().message, 'body should have required property \'phoneNumber\'', 'Error message when missing phone number')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('missing phone number (missing params)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when missing phone number')
      t.strictSame(response.json().message, 'body should have required property \'phoneNumber\'', 'Error message when missing phone number')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('wrong phone number format (includes space)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: ' 98 23322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when phone number wrong format')
      t.strictSame(response.json().message, 'invalid \'phoneNumber\' format', 'Error message when wrong phone number format')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('wrong phone number format (includes \\n)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '\n43445452'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when phone number wrong format')
      t.strictSame(response.json().message, 'invalid \'phoneNumber\' format', 'Error message when wrong phone number format')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('wrong phone number format (includes \\t)', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '\t43445452'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code when phone number wrong format')
      t.strictSame(response.json().message, 'invalid \'phoneNumber\' format', 'Error message when wrong phone number format')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('successful signup', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '9823322552'
        }
      })

      t.strictSame(response.statusCode, 200, 'Success code from registration.')
      t.strictSame(response.json().message, 'complete', 'response message from signup.')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('duplicate email signup', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius2',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '9823322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from redundant email.')
      t.strictSame(response.json().message, 'duplicate \'email\'', 'Error message from redundant email.')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test('duplicate username signup', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'grindarius',
          email: 'authtest2@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '9823322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from redundant username.')
      t.strictSame(response.json().message, 'duplicate \'username\'', 'Error message from redundant username.')
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error in a successful registration.')
    }
  })

  void t.test('invalid username', async t => {
    try {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/signup',
        payload: {
          username: 'longgggggggggggggggggggggggggggggggggggggggg',
          email: 'authtest@gmail.com',
          password: 'asdfghjkl123',
          phoneCountryCode: '66',
          phoneNumber: '9823322552'
        }
      })

      t.strictSame(response.statusCode, 400, 'Error code from invalid name format.')
      t.strictSame(response.json().message, 'invalid \'username\' format', 'Error message from invalid username.')
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  t.end()
})
