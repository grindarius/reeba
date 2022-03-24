import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  event_datetimes,
  events,
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
      preValidation: async (request, reply) => {
        const { q, creatorType, priceRange, tags, dateRange, type } = request.query

        console.log(request.query)

        if (q == null || q === '') {
          void reply.send({
            events: [],
            users: []
          })
        }

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

          if (creatorType != null && creatorType !== '') {
            request.query.creatorType.push(creatorType)
          }
        }

        // @ts-expect-error checking if priceRange could be null is valid
        if (priceRange == null || priceRange === '') {
          request.query.priceRange = 'Any'
        }

        // * same goes for other param
        if (tags == null) {
          request.query.tags = []
        }

        if (!Array.isArray(tags)) {
          request.query.tags = []

          if (tags != null && tags !== '') {
            request.query.tags.push(tags)
          }
        }

        // @ts-expect-error checking if dateRange could be null is valid
        if (dateRange == null || dateRange === '') {
          request.query.dateRange = 'All dates'
        }

        // @ts-expect-error checking if type could be null is valid
        if (type == null || type === '') {
          request.query.type = 'Events'
        }

        console.log(request.query)
      }
    },
    async (request) => {
      const { q } = request.query

      const searchedResult = await instance.pg.query<events & Pick<event_datetimes, 'event_datetime_id' | 'event_start_datetime' | 'event_end_datetime'>, [string]>(
        `select
          events.*,
          event_datetimes.event_datetime_id,
          event_datetimes.event_start_datetime,
          event_datetimes.event_end_datetime
        from "events"
        inner join "event_datetimes" on event_datetimes.event_id = events.event_id
        where array[event_name, user_username, event_website] &@ $1`,
        [q]
      )

      console.log(searchedResult.rows)

      return {
        events: [],
        users: []
      }
    }
  )
}
