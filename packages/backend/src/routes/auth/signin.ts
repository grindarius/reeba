import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  SigninParams,
  SigninParamsSchema,
  SigninReply,
  SigninReplySchema
} from '@reeba/common'

import { users } from '../../types'
import { createSignPayload } from '../../utils'

const signinSchema: FastifySchema = {
  body: SigninParamsSchema,
  response: {
    200: SigninReplySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: SigninParams, Reply: SigninReply }>(
    '/signin',
    {
      schema: signinSchema,
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
