import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { nanoid } from 'nanoid'

import {
  BadRequestReplySchema,
  PostFollowReply,
  PostFollowReplySchema,
  PostFollowRequestBody,
  PostFollowRequestBodySchema,
  user_followers,
  users
} from '@reeba/common'

const schema: FastifySchema = {
  body: PostFollowRequestBodySchema,
  response: {
    200: PostFollowReplySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: PostFollowRequestBody, Reply: PostFollowReply }>(
    '/follow',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async (request, reply) => {
        const { usernameToFollow } = request.body

        if (usernameToFollow == null || usernameToFollow === '') {
          void reply.code(400)
          throw new Error('body should have required property \'usernameToFollow\'')
        }
      }
    },
    async (request, reply) => {
      const { usernameToFollow } = request.body

      const baseUser = await instance.pg.query<users, [user_followers['following_username'], user_followers['followed_username']]>(
        'select * from "users" where user_username in ($1, $2)',
        [request.user.username, usernameToFollow]
      )

      if (baseUser.rowCount < 2) {
        void reply.code(400)
        throw new Error('one of the users does not exist')
      }

      const previouslyFollowedInstance = await instance.pg.query(
        'select * from "user_followers" where following_username = $1 and followed_username = $2',
        [request.user.username, usernameToFollow]
      )

      if (previouslyFollowedInstance.rowCount > 0) {
        void reply.code(400)
        throw new Error('already following this username')
      }

      await instance.pg.query<user_followers, [user_followers['follow_id'], user_followers['following_username'], user_followers['followed_username']]>(
        'insert into "user_followers" (follow_id, following_username, followed_username) values ($1, $2, $3)',
        [nanoid(), request.user.username, usernameToFollow]
      )

      return {
        message: 'complete'
      }
    }
  )
}
