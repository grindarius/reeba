import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetProfileDataReply,
  GetProfileDataReplySchema,
  GetProfileDataRequestParams,
  GetProfileDataRequestParamsSchema,
  users
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetProfileDataRequestParamsSchema,
  response: {
    200: GetProfileDataReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetProfileDataRequestParams, Reply: GetProfileDataReply }>(
    '/:username/profile-data',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async (request, reply) => {
        const { username } = request.params

        if (username == null || username === '') {
          void reply.code(400)
          throw new Error('params should have required property \'username\'')
        }
      }
    },
    async (request, reply) => {
      const { username } = request.params

      type UserData = Pick<users, 'user_email' | 'user_phone_number' | 'user_phone_country_code' | 'user_birthdate' | 'user_iso_31662_code'>

      const userData = await instance.pg.query<UserData, [users['user_username']]>(
        `select
          user_email,
          user_phone_country_code,
          user_phone_number,
          user_iso_31662_code,
          user_birthdate
        from "users"
        where user_username = $1`,
        [username]
      )

      if (userData.rowCount === 0) {
        void reply.code(404)
        throw new Error('user not found')
      }

      return {
        email: userData.rows[0].user_email,
        phoneCountryCode: userData.rows[0].user_phone_country_code,
        iso31662: userData.rows[0].user_iso_31662_code,
        phoneNumber: userData.rows[0].user_phone_number,
        birthdate: userData.rows[0].user_birthdate ?? ''
      }
    }
  )
}
