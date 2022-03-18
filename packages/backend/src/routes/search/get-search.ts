import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetSearchResultRequestQuerystring,
  GetSearchResultRequestQuerystringSchema,
  NotFoundReplySchema
} from '@reeba/common'

const schema: FastifySchema = {
  querystring: GetSearchResultRequestQuerystringSchema,
  response: {
    404: NotFoundReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Querystring: GetSearchResultRequestQuerystring }>(
    '/',
    {
      schema,
      preValidation: async (request) => {
        const { q } = request.query
        const { price } = request.query

        if (q == null) {
          request.query = { ...request.query, ...{ q: '' } }
        }

        if (price == null) {
          request.query = { ...request.query, ...{ price: '' } }
        }
      }
    },
    async () => {

    }
  )
}
