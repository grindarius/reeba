import { FastifyInstance, FastifyPluginOptions, FastifySchema } from "fastify";

import { GetFollowersRequestParamsSchema, GetFollowersRequestParams, GetFollowersReplySchema, GetFollowersReply, user } from '@reeba/common'

const schema: FastifySchema = {
  prams: GetFollowersRequestParamsSchema,
  response: {
    200: GetFollowersReplySchema
  }
}
