import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetFollowReply,
  GetFollowReplySchema,
  GetFollowRequestParams,
  GetFollowRequestParamsSchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetFollowRequestParamsSchema,
  response: {
    200: GetFollowReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetFollowRequestParams, Replay: GetFollowReply }>(
    '/:username/followers',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async () => {
      }
    }, async () => { }
  )
}
