import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  PostUnfollowReply,
  PostUnfollowReplySchema,
  PostUnfollowRequestBody,
  PostUnfollowRequestBodySchema,
  user_followers
} from '@reeba/common'

const schema: FastifySchema = {
  body: PostUnfollowRequestBodySchema,
  response: {
    200: PostUnfollowReplySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: PostUnfollowRequestBody, Reply: PostUnfollowReply }>(
    '/unfollow',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async (request, reply) => {
        const { usernameToUnfollow } = request.body

        if (usernameToUnfollow == null || usernameToUnfollow === '') {
          void reply.code(400)
          throw new Error('body should have required property \'usernameToUnfollow\'')
        }
      }
    },
    async (request) => {
      const { usernameToUnfollow } = request.body

      await instance.pg.query<user_followers, [user_followers['following_username'], user_followers['followed_username']]>(
        'delete from "user_followers" where following_username = $1 and followed_username = $2',
        [request.user.username, usernameToUnfollow]
      )

      return {
        message: 'complete'
      }
    }
  )
}
