import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetUserParams,
  GetUserParamsSchema,
  GetUserQuerystring,
  GetUserQuerystringSchema,
  GetUserReply,
  GetUserReplySchema,
  t_user_role,
  user_followers,
  users
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetUserParamsSchema,
  querystring: GetUserQuerystringSchema,
  response: {
    200: GetUserReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetUserParams, Querystring: GetUserQuerystring, Reply: GetUserReply }>(
    '/:username',
    {
      schema,
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

      const isCurrentUserFollowing = await instance.pg.query<user_followers, [string, string]>(
        'select * from "user_followers" where following_username = $1 and followed_username = $2',
        [request.query.u, request.params.username]
      )

      const followersAmount = await instance.pg.query<{ followers_amount: number }, [users['user_username']]>(
        'select count(*) as followers_amount from "user_followers" where followed_username = $1',
        [request.params.username]
      )

      const followingsAmount = await instance.pg.query<{ followings_amount: number }, [users['user_username']]>(
        'select count(*) as followings_amount from "user_followers" where following_username = $1',
        [request.params.username]
      )

      return {
        username: existingUser.rows[0].user_username,
        verificationStatus: existingUser.rows[0].user_role === t_user_role.admin ? true : existingUser.rows[0].user_verification_status,
        isAdmin: existingUser.rows[0].user_role === t_user_role.admin,
        socialMedias: existingUser.rows[0].user_social_medias,
        profileDescription: existingUser.rows[0].user_profile_description,
        followersAmount: followersAmount.rows[0].followers_amount,
        followingsAmount: followingsAmount.rows[0].followings_amount,
        isCurrentUserFollowing: isCurrentUserFollowing.rowCount !== 0
      }
    }
  )
}
