import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetUserFollowingsListReply,
  GetUserFollowingsListReplySchema,
  GetUserFollowingsListRequestParams,
  GetUserFollowingsListRequestParamsSchema,
  GetUserFollowingsListRequestQuertsring,
  GetUserFollowingsListRequestQuertstringSchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetUserFollowingsListRequestParamsSchema,
  querystring: GetUserFollowingsListRequestQuertstringSchema,
  response: {
    200: GetUserFollowingsListReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetUserFollowingsListRequestParams, Querystring: GetUserFollowingsListRequestQuertsring, Reply: GetUserFollowingsListReply }>(
    '/:username/followings',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async (request, reply) => {
        const { username } = request.params
        const { u } = request.query

        if (username == null || username === '') {
          void reply.code(400)
          throw new Error('params should have required property \'username\'')
        }

        if (u == null) {
          request.query.u = ''
        }
      }
    },
    async (request) => {
      const { username } = request.params

      const followings = await instance.pg.query<{ username: string, isAdmin: boolean, isVerified: boolean }>(
        `select
          user_followings.follower_username as username,
          case when users.user_role = 'user' then 'true'::boolean else 'false'::boolean end "isAdmin",
          users.user_verification_status as "isVerified"
        from "user_followings"
        inner join "users" on user_followings.follower_username = users.user_username
        where user_followings.followed_username = $1`,
        [username]
      )

      return {
        followings: followings.rows
      }
    }
  )
}
