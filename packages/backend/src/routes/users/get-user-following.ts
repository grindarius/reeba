import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetUserFollowingsListReply,
  GetUserFollowingsListReplySchema,
  GetUserFollowingsListRequestParams,
  GetUserFollowingsListRequestParamsSchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetUserFollowingsListRequestParamsSchema,
  response: {
    200: GetUserFollowingsListReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetUserFollowingsListRequestParams, Reply: GetUserFollowingsListReply }>(
    '/:username/followings',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async () => {

      }
    }, async () => { }
  )
}
