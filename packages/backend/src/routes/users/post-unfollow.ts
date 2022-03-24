import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  PostUnfollowReply,
  PostUnfollowReplySchema,
  PostUnfollowRequestBody,
  PostUnfollowRequestBodySchema,
  PostUnfollowRequestParams,
  PostUnfollowRequestParamsSchema,
  user_followers
} from '@reeba/common'

const schema: FastifySchema = {
  params: PostUnfollowRequestParamsSchema,
  body: PostUnfollowRequestBodySchema,
  response: {
    200: PostUnfollowReplySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Params: PostUnfollowRequestParams, Body: PostUnfollowRequestBody, Reply: PostUnfollowReply }>(
    '/:username/unfollow',
    {
      schema,
      preValidation: async (request, reply) => {
        const { username } = request.params
        const { usernameToUnfollow } = request.body

        if (username == null || username === '') {
          void reply.code(400)
          throw new Error('params should have required property \'username\'')
        }

        if (usernameToUnfollow == null || usernameToUnfollow === '') {
          void reply.code(400)
          throw new Error('body should have required property \'usernameToFollow\'')
        }
      }
    },
    async (request) => {
      const { username } = request.params
      const { usernameToUnfollow } = request.body

      await instance.pg.query<user_followers, [user_followers['following_user_id'], user_followers['followed_user_id']]>(
        'delete from user_followers where following_user_id = $1 and followed_user_id = $2',
        [username, usernameToUnfollow]
      )

      return {
        message: 'complete'
      }
    }
  )
}
