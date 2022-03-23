import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetSearchResultReply,
  GetSearchResultReplySchema,
  GetSearchResultRequestQuerystring,
  GetSearchResultRequestQuerystringSchema
} from '@reeba/common'

const schema: FastifySchema = {
  querystring: GetSearchResultRequestQuerystringSchema,
  response: {
    200: GetSearchResultReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Querystring: GetSearchResultRequestQuerystring, Reply: GetSearchResultReply }>(
    '/',
    {
      schema,
      preValidation: async (request) => {
        const { creatorType, tags } = request.query

        // * in case nothing is sent (ui did not click anything)
        // * attach empty array to the api
        if (creatorType == null) {
          request.query.creatorType = []
        }

        // * in case there is one value being sent
        // * node api will convert it to a string
        // * so we have to create and add it to an array
        if (!Array.isArray(creatorType)) {
          request.query.creatorType = []

          if (creatorType != null) {
            request.query.creatorType.push(creatorType)
          }
        }

        // * same goes for other param
        if (tags == null) {
          request.query.tags = []
        }

        if (!Array.isArray(tags)) {
          request.query.tags = []

          if (tags != null) {
            request.query.tags.push(tags)
          }
        }
      }
    },
    async (request) => {
      const { q } = request.query

      const searchEvent = await instance.pg.query(
        'select * from events where to_tsvector(\'english\', event_name) @@ to_tsquery(\'english\', $1)',
        [q.split(' ').join(' <-> ')]
      )

      console.log(searchEvent.rows)

      return {
        amount: 0,
        events: [],
        users: []
      }
    }
  )
}
