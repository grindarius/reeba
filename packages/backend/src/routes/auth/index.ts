import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { nanoid } from 'nanoid'

import {
  LoginParams,
  LoginParamsSchema,
  RegisterParams,
  RegisterParamsSchema,
  RegisterReplySchema
} from '@reeba/common'

const loginSchema: FastifySchema = {
  body: LoginParamsSchema
}

const registerSchema: FastifySchema = {
  body: RegisterParamsSchema,
  response: {
    200: RegisterReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: RegisterParams }>(
    '/register',
    {
      schema: registerSchema
    }, async (request) => {
      const { username, email, password } = request.body

      try {
        const possibleDuplicateEmails = await instance.pg.query<{ user_email: string }, [string]>(
          'SELECT * FROM users WHERE user_email = $1',
          [email]
        )

        if (possibleDuplicateEmails.rows.length > 0) {
          throw new Error('Duplicate email')
        }
      } catch (error) {
        throw new Error(`Error while finding email duplicates ${error as string}`)
      }

      const userId = nanoid(25)
      const salt = await bcrypt.genSalt(10)
      const encryptedPassword = await bcrypt.hash(password, salt)

      await instance.pg.query<{
        user_id: string
        user_name: string
        user_email: string
        user_password: string
      }, [string, string, string, string]>(
        'INSERT INTO users (user_id, user_name, user_email, user_password) VALUES ($1, $2, $3, $4)',
        [userId, username, email, encryptedPassword]
      )

      const token = instance.jwt.sign({ user: { id: userId } }, {
        expiresIn: '5m'
      })

      return {
        token
      }
    }
  )

  instance.post<{ Body: LoginParams }>(
    '/login',
    {
      schema: loginSchema
    }, async (request) => {
      const { email, password } = request.body

      return {
        message: `you have been to the login route, email is ${email}, password is ${password}`
      }
    }
  )
}
