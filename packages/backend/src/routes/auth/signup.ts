import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  BCRYPT_GENSALT_ROUNDS,
  SignupParams,
  SignupParamsSchema,
  SignupReply,
  SignupReplySchema,
  t_user_roles,
  users
} from '@reeba/common'

import { ACCESS_TOKEN_EXPIRES_TIME } from '../../constants'
import { createSignPayload, validateEmail } from '../../utils'

const signupSchema: FastifySchema = {
  body: SignupParamsSchema,
  response: {
    200: SignupReplySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: SignupParams, Reply: SignupReply }>(
    '/signup',
    {
      schema: signupSchema,
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

      const possibleDuplicateEmails = await instance.pg.query<users, [users['user_email']]>(
        'select * from users where user_email = $1',
        [email]
      ).catch(error => {
        throw new Error(`${error as string}`)
      })

      if (possibleDuplicateEmails.rows.length > 0) {
        void reply.code(400)
        throw new Error('duplicate email')
      }

      const salt = await bcrypt.genSalt(BCRYPT_GENSALT_ROUNDS)
      const encryptedPassword = await bcrypt.hash(password, salt)

      try {
        await instance.pg.query<users, [users['user_username'], users['user_email'], users['user_password']]>(
          'insert into users (user_username, user_email, user_password) VALUES ($1, $2, $3)',
          [username, email, encryptedPassword]
        )
      } catch (error) {
        throw new Error(`error while inserting new user into the database ${error as string}`)
      }

      const token = instance.jwt.sign(createSignPayload(username, t_user_roles.user), {
        expiresIn: ACCESS_TOKEN_EXPIRES_TIME
      })

      return {
        token
      }
    }
  )
}
