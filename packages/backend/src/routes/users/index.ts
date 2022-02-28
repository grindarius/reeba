import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  GetUserParams,
  GetUserParamsSchema,
  GetUserReply,
  GetUserReplySchema,
  users
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetUserParamsSchema,
  response: {
    200: GetUserReplySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetUserParams, Reply: GetUserReply }>(
    '/:username',
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
      const existingUser = await instance.pg.query<users, [users['user_username']]>(
        'select * from "users" where user_username = $1',
        [request.params.username]
      )

      if (existingUser.rowCount === 0) {
        void reply.code(404)
        throw new Error('User not found')
      }

      const eventsCreatedAmount = await instance.pg.query<{ events_created_amount: number }, [users['user_username']]>(
        'select count(*) as events_created_amount from "events" where user_username = $1',
        [request.params.username]
      )

      const eventsAttendedAmount = await instance.pg.query<{ events_attended_amount: number }, [users['user_username']]>(
        'select count(*) as events_attended_amount from "transactions" where user_username = $1',
        [request.params.username]
      )

      const followersAmount = await instance.pg.query<{ followers_amount: number }, [users['user_username']]>(
        'select count(*) as followers_amount from "user_followers" where followed_user_id = $1',
        [request.params.username]
      )

      return {
        username: existingUser.rows[0].user_username,
        verificationStatus: existingUser.rows[0].user_verification_status,
        socialMedias: existingUser.rows[0].user_social_medias,
        profileDescription: existingUser.rows[0].user_profile_description,
        eventsCreatedAmount: eventsCreatedAmount.rows[0].events_created_amount,
        eventsAttendedAmount: eventsAttendedAmount.rows[0].events_attended_amount,
        followersAmount: followersAmount.rows[0].followers_amount
      }
    }
  )
}
