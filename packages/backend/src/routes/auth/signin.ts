import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { verify } from '@node-rs/argon2'
import {
  SigninBody,
  SigninBodySchema,
  SigninReply,
  SigninReplySchema,
  users
} from '@reeba/common'

import { ACCESS_TOKEN_EXPIRES_TIME } from '../../constants'
import argon2Options from '../../constants/argon2'

const schema: FastifySchema = {
  body: SigninBodySchema,
  response: {
    200: SigninReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: SigninBody, Reply: SigninReply }>(
    '/signin',
    {
      schema,
      preValidation: (request, reply) => {
        const { email, password } = request.body

        if (email == null || email === '') {
          void reply.code(400)
          throw new Error('body should have required property \'email\'')
        }

        if (password == null || password === '') {
          void reply.code(400)
          throw new Error('body should have required property \'password\'')
        }
      },
      config: {
        name: 'Signin'
      }
    }, async (request, reply) => {
      const { email, password } = request.body

      const user = await instance.pg.query<Pick<users, 'user_username' | 'user_email' | 'user_role' | 'user_verification_status' | 'user_password' | 'user_deletion_status'>, [users['user_email']]>(
        'select user_username, user_email, user_role, user_verification_status, user_password, user_deletion_status from users where user_email = $1',
        [email]
      )

      if (user.rowCount === 0) {
        void reply.code(404)
        throw new Error('user with supplied \'email\' not found')
      }

      if (user.rows[0].user_deletion_status) {
        throw new Error('you are banned')
      }

      const isPasswordValid = await verify(
        user.rows[0].user_password,
        password,
        argon2Options
      )

      if (!isPasswordValid) {
        void reply.code(400)
        throw new Error('invalid \'password\'')
      }

      const token = instance.jwt.sign({
        username: user.rows[0].user_username,
        role: user.rows[0].user_role
      }, {
        expiresIn: ACCESS_TOKEN_EXPIRES_TIME
      })

      return {
        token,
        username: user.rows[0].user_username,
        email: user.rows[0].user_email,
        role: user.rows[0].user_role,
        verificationStatus: user.rows[0].user_verification_status
      }
    }
  )
}
