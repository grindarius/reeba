import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifySchema
} from 'fastify'

import { hash } from '@node-rs/argon2'
import {
  type SignupBody,
  type SignupReply,
  signupBodySchema,
  signupReplySchema,
  type users,
  validateEmail,
  validatePhoneNumber,
  validateUsername
} from '@reeba/common'

import argon2Options from '../../constants/argon2.js'

const schema: FastifySchema = {
  body: signupBodySchema,
  response: {
    200: signupReplySchema
  }
}

export default async (
  instance: FastifyInstance,
  _: FastifyPluginOptions
): Promise<void> => {
  instance.post<{ Body: SignupBody; Reply: SignupReply }>(
    '/signup',
    {
      schema,
      preValidation: (request, reply) => {
        const { username, email, password, phoneCountryCode, phoneNumber } =
          request.body

        if (username == null || username === '') {
          void reply.code(400)
          throw new Error("body should have required property 'username'")
        }

        if (!validateUsername(username)) {
          void reply.code(400)
          throw new Error("invalid 'username' format")
        }

        if (email == null || email === '') {
          void reply.code(400)
          throw new Error("body should have required property 'email'")
        }

        if (phoneCountryCode == null || phoneCountryCode === '') {
          void reply.code(400)
          throw new Error(
            "body should have required property 'phoneCountryCode'"
          )
        }

        if (phoneNumber == null || phoneNumber === '') {
          void reply.code(400)
          throw new Error("body should have required property 'phoneNumber'")
        }

        if (!validatePhoneNumber(phoneNumber)) {
          void reply.code(400)
          throw new Error("invalid 'phoneNumber' format")
        }

        if (!validateEmail(email)) {
          void reply.code(400)
          throw new Error("invalid 'email' format")
        }

        if (password == null || password === '') {
          void reply.code(400)
          throw new Error("body should have required property 'password'")
        }
      },
      config: {
        name: 'Signup'
      }
    },
    async (request, reply) => {
      const {
        username,
        email,
        password,
        phoneCountryCode,
        phoneNumber,
        iso31662
      } = request.body

      const possibleDuplicateEmails = await instance.pg.query<
        users,
        [users['user_email']]
      >('select * from users where user_email = $1', [email])

      if (possibleDuplicateEmails.rows.length > 0) {
        void reply.code(400)
        throw new Error("duplicate 'email'")
      }

      const possibleDuplicateUsernames = await instance.pg.query<
        users,
        [users['user_username']]
      >('select * from users where user_username = $1', [username])

      if (possibleDuplicateUsernames.rows.length > 0) {
        void reply.code(400)
        throw new Error("duplicate 'username'")
      }

      const encryptedPassword = await hash(password, argon2Options)

      type InsertUserValues = [
        users['user_username'],
        users['user_email'],
        users['user_password'],
        users['user_phone_country_code'],
        users['user_phone_number'],
        users['user_iso_31662_code']
      ]

      await instance.pg.query<users, InsertUserValues>(
        'insert into users (user_username, user_email, user_password, user_phone_country_code, user_phone_number, user_iso_31662_code) values ($1, $2, $3, $4, $5, $6)',
        [
          username,
          email,
          encryptedPassword,
          phoneCountryCode,
          phoneNumber,
          iso31662
        ]
      )

      return {
        message: 'complete'
      }
    }
  )
}
