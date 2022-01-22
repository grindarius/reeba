import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  SigninBody,
  SigninBodySchema,
  SigninReplyBody,
  SigninReplyBodySchema,
  users
} from '@reeba/common'

import { ACCESS_TOKEN_EXPIRES_TIME } from '../../constants'
import { createSignPayload } from '../../utils'

const signinSchema: FastifySchema = {
  body: SigninBodySchema,
  response: {
    200: SigninReplyBodySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: SigninBody, Reply: SigninReplyBody }>(
    '/signin',
    {
      schema: signinSchema,
      preValidation: async (request, reply) => {
        const { email, password } = request.body

        if (email == null || email === '') {
          void reply.code(400)
          throw new Error('body should have required property \'email\'')
        }

        if (password == null || password === '') {
          void reply.code(400)
          throw new Error('body should have required property \'password\'')
        }
      }
    }, async (request, reply) => {
      const { email, password } = request.body

      const user = await instance.pg.query<users, [users['user_email']]>(
        'select * from users where user_email = $1',
        [email]
      ).catch(error => {
        throw new Error(error as string)
      })

      if (user.rowCount === 0) {
        throw new Error('\'email\' not found')
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.rows[0].user_password
      ).catch(error => {
        throw new Error(error as string)
      })

      if (!isPasswordValid) {
        void reply.code(400)
        throw new Error('invalid \'password\'')
      }

      const token = instance.jwt.sign(createSignPayload(user.rows[0].user_username, user.rows[0].user_role), {
        expiresIn: ACCESS_TOKEN_EXPIRES_TIME
      })

      return {
        token,
        username: user.rows[0].user_username,
        role: user.rows[0].user_role
      }
    }
  )
}
