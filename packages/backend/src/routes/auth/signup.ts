import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  BCRYPT_GENSALT_ROUNDS,
  SignupBody,
  SignupBodySchema,
  SignupReplyBody,
  SignupReplyBodySchema,
  users,
  validateEmail,
  validateUsername
} from '@reeba/common'

const signupSchema: FastifySchema = {
  body: SignupBodySchema,
  response: {
    200: SignupReplyBodySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: SignupBody, Reply: SignupReplyBody }>(
    '/signup',
    {
      schema: signupSchema,
      preValidation: async (request, reply) => {
        const { username, email, password } = request.body

        if (username == null || username === '') {
          void reply.code(400)
          throw new Error('body should have required property \'username\'')
        }

        if (!validateUsername(username)) {
          void reply.code(400)
          throw new Error('invalid \'username\' format')
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
        throw new Error('duplicate \'email\'')
      }

      const salt = await bcrypt.genSalt(BCRYPT_GENSALT_ROUNDS)
      const encryptedPassword = await bcrypt.hash(password, salt)

      try {
        await instance.pg.query<users, [users['user_username'], users['user_email'], users['user_password']]>(
          'insert into users (user_username, user_email, user_password) values ($1, $2, $3)',
          [username, email, encryptedPassword]
        )
      } catch (error) {
        throw new Error(`${error as string}`)
      }

      return {
        message: 'complete'
      }
    }
  )
}
