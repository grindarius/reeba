import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { nanoid } from 'nanoid'

import {
  BadRequestReplySchema,
  PostFollowReply,
  PostFollowReplySchema,
  PostFollowRequestBody,
  PostFollowRequestBodySchema,
  PostFollowRequestParams,
  PostFollowRequestParamsSchema,
  user_followers
} from '@reeba/common'

const schema: FastifySchema = {
  params: PostFollowRequestParamsSchema,
  body: PostFollowRequestBodySchema,
  response: {
    200: PostFollowReplySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Params: PostFollowRequestParams, Body: PostFollowRequestBody, Reply: PostFollowReply }>(
    '/:username/follow',
    {
      schema,
      preValidation: async (request, reply) => {
        const { username } = request.params
        const { usernameToFollow } = request.body

        if (username == null || username === '') {
          void reply.code(400)
          throw new Error('params should have required property \'username\'')
        }

        if (usernameToFollow == null || usernameToFollow === '') {
          void reply.code(400)
          throw new Error('body should have required property \'usernameToFollow\'')
        }
      }
    },
    async (request) => {
      const { username } = request.params
      const { usernameToFollow } = request.body

      await instance.pg.query<user_followers, [user_followers['follow_id'], user_followers['following_user_id'], user_followers['followed_user_id']]>(
        'insert into user_followers (follow_id, following_user_id, followed_user_id) values ($1, $2, $3)',
        [nanoid(), username, usernameToFollow]
      )

      return {
        message: 'complete'
      }
    }
  )
}
