import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetSearchRequestParams,
  GetSearchRequestParamsSchema,
  NotFoundReplySchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetSearchRequestParamsSchema,
  response: {
    404: NotFoundReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetSearchRequestParams }>(
    '/',
    {
      schema
    },
    async () => {

    }
  )
}
