import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetUserFollowersListReply,
  GetUserFollowersListReplySchema,
  GetUserFollowersListRequestParams,
  GetUserFollowersListRequestParamsSchema,
  GetUserFollowersListRequestQuerystring,
  GetUserFollowersListRequestQuerystringSchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetUserFollowersListRequestParamsSchema,
  querystring: GetUserFollowersListRequestQuerystringSchema,
  response: {
    200: GetUserFollowersListReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetUserFollowersListRequestParams, Querystring: GetUserFollowersListRequestQuerystring, Reply: GetUserFollowersListReply }>(
    '/:username/followers',
    {
      schema,
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
      },
      config: {
        name: 'GetUserFollowersList'
      }
    },
    async (request) => {
      const { username } = request.params

      const followers = await instance.pg.query<{ username: string, isAdmin: boolean, isVerified: boolean}>(
        `select
          user_followers.following_username as username,
          case when users.user_role = 'user' then 'false'::boolean else 'true'::boolean end "isAdmin",
          users.user_verification_status as "isVerified"
        from "user_followers"
        inner join "users" on user_followers.following_username = users.user_username
        where user_followers.followed_username = $1`,
        [username]
      )

      return {
        followers: followers.rows
      }
    }
  )
}
