import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { nanoid } from 'nanoid'

import {
  BadRequestReplySchema,
  BCRYPT_GENSALT_ROUNDS,
  LoginParams,
  LoginParamsSchema,
  LoginReply,
  LoginReplySchema,
  NANOID_USERID_LENGTH,
  RegisterParams,
  RegisterParamsSchema,
  RegisterReply,
  RegisterReplySchema
} from '@reeba/common'

import { UserRoles, users } from '../../types'
import { createSignPayload, validateEmail } from '../../utils'

const registerSchema: FastifySchema = {
  body: RegisterParamsSchema,
  response: {
    200: RegisterReplySchema,
    400: BadRequestReplySchema
  }
}

const loginSchema: FastifySchema = {
  body: LoginParamsSchema,
  response: {
    200: LoginReplySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: RegisterParams, Reply: RegisterReply }>(
    '/register',
    {
      schema: registerSchema,
      preValidation: async (request, reply) => {
        const { username, email, password } = request.body

        if (username === '') {
          void reply.code(400)
          throw new Error('body should have required property \'username\'')
        }

        if (email == null || email === '') {
          void reply.code(400)
          throw new Error('body should have required property \'email\'')
        }

        if (!validateEmail(email)) {
          void reply.code(400)
          throw new Error('invalid \'email\' format')
        }

        if (password == null || password === '') {
          void reply.code(400)
          throw new Error('body should have required property \'password\'')
        }
      }
    }, async (request, reply) => {
      const { username, email, password } = request.body

      const possibleDuplicateEmails = await instance.pg.query<users, [string]>(
        'select * from users where user_email = $1',
        [email]
      ).catch(error => {
        throw new Error(`error while finding email duplicates: ${error as string}`)
      })

      if (possibleDuplicateEmails.rows.length > 0) {
        void reply.code(400)
        throw new Error('duplicate \'email\'')
      }

      const userId = nanoid(NANOID_USERID_LENGTH)
      const salt = await bcrypt.genSalt(BCRYPT_GENSALT_ROUNDS)
      const encryptedPassword = await bcrypt.hash(password, salt)

      try {
        await instance.pg.query<users, [string, string, string, string]>(
          'insert into users (user_id, user_name, user_email, user_password) VALUES ($1, $2, $3, $4)',
          [userId, username, email, encryptedPassword]
        )
      } catch (error) {
        throw new Error(`error while inserting new user into the database ${error as string}`)
      }

      const token = instance.jwt.sign(createSignPayload(userId, UserRoles.User), {
        expiresIn: '5m'
      })

      return {
        token
      }
    }
  )

  instance.post<{ Body: LoginParams, Reply: LoginReply }>(
    '/login',
    {
      schema: loginSchema,
      preValidation: async (request, reply) => {
        const { email, password } = request.body

        if (email === '') {
          void reply.code(400)
          throw new Error('body should have required property \'email\'')
        }

        if (password === '') {
          void reply.code(400)
          throw new Error('body should have required property \'password\'')
        }
      }
    }, async (request) => {
      const { email, password } = request.body

      try {
        const user = await instance.pg.query<users, [string]>(
          'select * from users where user_email = $1',
          [email]
        )

        if (user.rows.length === 0) {
          throw new Error('email not found')
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.rows[0].user_password
        )

        if (!isPasswordValid) {
          throw new Error('invalid password')
        }

        const token = instance.jwt.sign(createSignPayload(user.rows[0].user_id, user.rows[0].user_role), {
          expiresIn: '5m'
        })

        return {
          token
        }
      } catch (error) {
        throw new Error(`error while logging you in: ${error as string}`)
      }
    }
  )
}
