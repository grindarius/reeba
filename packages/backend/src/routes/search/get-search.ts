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
  instance.get<{ Querystring: GetSearchResultRequestQuerystring }>(
    '/search',
    {
      schema,
      preValidation: async (request) => {
        const { q } = request.query
        const { price } = request.query

        if (q == null) {
          request.body = { q: '' }
        }

        if (price == null) {
          request.body = { price: '' }
        }
      }
    },
    async () => {

    }
  )
}
