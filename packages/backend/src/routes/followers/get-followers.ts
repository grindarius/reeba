import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetFollowersReply,
  GetFollowersReplySchema,
  GetFollowersRequestParams,
  GetFollowersRequestParamsSchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetFollowersRequestParamsSchema,
  response: {
    200: GetFollowersReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetFollowersRequestParams, Replay: GetFollowersReply }>(
    '/:username/followers',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async () => {
      }
    }, async () => { }
  )
}
