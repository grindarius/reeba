import bcrypt from 'bcrypt'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { nanoid } from 'nanoid'

import {
  LoginParams,
  LoginParamsSchema,
  LoginReplySchema,
  RegisterParams,
  RegisterParamsSchema,
  RegisterReplySchema
} from '@reeba/common'

import { users } from '../../types'
import { createSignPayload } from '../../utils'

const loginSchema: FastifySchema = {
  body: LoginParamsSchema,
  response: {
    200: LoginReplySchema
  }
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
        const possibleDuplicateEmails = await instance.pg.query<users, [string]>(
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

      try {
        await instance.pg.query<users, [string, string, string, string]>(
          'INSERT INTO users (user_id, user_name, user_email, user_password) VALUES ($1, $2, $3, $4)',
          [userId, username, email, encryptedPassword]
        )
      } catch (error) {
        throw new Error(`Error while inserting new user into the database ${error as string}`)
      }

      const token = instance.jwt.sign(createSignPayload(userId), {
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

      try {
        const user = await instance.pg.query<users, [string]>(
          'SELECT * FROM users WHERE user_email = $1',
          [email]
        )

        if (user.rows.length === 0) {
          throw new Error('Error: email not found.')
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.rows[0].user_password
        )

        if (!isPasswordValid) {
          throw new Error('Error: Invalid password.')
        }

        const token = instance.jwt.sign(createSignPayload(user.rows[0].user_id), {
          expiresIn: '5m'
        })

        return {
          token
        }
      } catch (error) {
        throw new Error(`Error while logging you in: ${error as string}`)
      }
    }
  )
}
