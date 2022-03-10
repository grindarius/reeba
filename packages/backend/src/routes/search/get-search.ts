import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetSearchResultRequestQuerystring,
  GetSearchResultRequestQuerystringSchema,
  NotFoundReplySchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetSearchResultRequestQuerystringSchema,
  response: {
    404: NotFoundReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetSearchResultRequestQuerystring }>(
    '/',
    {
      schema
    },
    async () => {

    }
  )
}
