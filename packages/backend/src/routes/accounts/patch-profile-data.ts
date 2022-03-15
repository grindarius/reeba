import bcrypt from 'bcrypt'
import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  BCRYPT_GENSALT_ROUNDS,
  PatchProfileDataReply,
  PatchProfileDataReplySchema,
  PatchProfileDataRequestBody,
  PatchProfileDataRequestBodySchema,
  PatchProfileDataRequestParams,
  PatchProfileDataRequestParamsSchema,
  users,
  validateEmail,
  validatePhoneNumber
} from '@reeba/common'

const schema: FastifySchema = {
  params: PatchProfileDataRequestParamsSchema,
  body: PatchProfileDataRequestBodySchema,
  response: {
    200: PatchProfileDataReplySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.patch<{ Params: PatchProfileDataRequestParams, Body: PatchProfileDataRequestBody, Reply: PatchProfileDataReply }>(
    '/:username/profile-data',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async (request, reply) => {
        const { username } = request.params
        const { email, password, phoneCountryCode, phoneNumber, birthdate } = request.body

        if (username == null || username === '') {
          void reply.code(400)
          throw new Error('params should have required property \'username\'')
        }

        if (email == null) {
          void reply.code(400)
          throw new Error('body should have required property \'email\'')
        }

        if (!validateEmail(email)) {
          void reply.code(400)
          throw new Error('invalid \'email\' format')
        }

        if (password == null) {
          void reply.code(400)
          throw new Error('body should have required property \'password\'')
        }

        if (phoneCountryCode == null) {
          void reply.code(400)
          throw new Error('body should have required property \'phoneCountryCode\'')
        }

        if (phoneNumber == null) {
          void reply.code(400)
          throw new Error('body should have required property \'phoneNumber\'')
        }

        if (!validatePhoneNumber(phoneNumber)) {
          void reply.code(400)
          throw new Error('invalid \'phoneNumber\' format')
        }

        if (birthdate == null) {
          void reply.code(400)
          throw new Error('body should have required property \'birthdate\'')
        }
      }
    },
    async (request) => {
      const { username } = request.params
      const { email, password, phoneCountryCode, phoneNumber, birthdate } = request.body

      return await instance.pg.transact<PatchProfileDataReply>(async client => {
        await client.query(
          `update "users" set
            user_email = coalesce($1, user_email),
            user_phone_country_code = coalesce($2, user_phone_country_code),
            user_phone_number = coalesce($3, user_phone_number),
            user_birthdate = coalesce($4, user_birthdate)
          where
            user_username = $5 and
            $1 is distinct from user_email and
            $2 is distinct from user_phone_country_code and
            $3 is distinct from user_phone_number and
            $4::date is not null and $4::date is distinct from user_birthdate`,
          [
            email,
            phoneCountryCode,
            phoneNumber,
            dayjs(birthdate).toDate(),
            username
          ]
        )

        const oldPasswordHash = await client.query<Pick<users, 'user_password'>, [users['user_username']]>(
          'select user_password from "users" where user_username = $1',
          [username]
        )

        const isSamePassword = await bcrypt.compare(password, oldPasswordHash.rows[0].user_password)

        if (!isSamePassword) {
          const salt = await bcrypt.genSalt(BCRYPT_GENSALT_ROUNDS)
          const hashedPassword = await bcrypt.hash(password, salt)

          await client.query(
            'update "users" set user_password = $1 where user_username = $2',
            [hashedPassword, username]
          )
        }

        return {
          message: 'complete'
        }
      })
    }
  )
}
