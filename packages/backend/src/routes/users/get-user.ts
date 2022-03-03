import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  GetUserParams,
  GetUserParamsSchema,
  GetUserReply,
  GetUserReplySchema,
  NotFoundReplySchema,
  t_user_role,
  users
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetUserParamsSchema,
  response: {
    200: GetUserReplySchema,
    400: BadRequestReplySchema,
    404: NotFoundReplySchema
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

      const followersAmount = await instance.pg.query<{ followers_amount: number }, [users['user_username']]>(
        'select count(*) as followers_amount from "user_followers" where followed_user_id = $1',
        [request.params.username]
      )

      return {
        username: existingUser.rows[0].user_username,
        verificationStatus: existingUser.rows[0].user_role === t_user_role.admin ? true : existingUser.rows[0].user_verification_status,
        socialMedias: existingUser.rows[0].user_social_medias,
        profileDescription: existingUser.rows[0].user_profile_description,
        followersAmount: followersAmount.rows[0].followers_amount
      }
    }
  )
}