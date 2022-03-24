import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  DateRange,
  event_tags_bridge,
  events,
  GetSearchResultReply,
  GetSearchResultReplySchema,
  GetSearchResultRequestQuerystring,
  GetSearchResultRequestQuerystringSchema,
  normalizeTag,
  PriceRange,
  users
} from '@reeba/common'

const schema: FastifySchema = {
  querystring: GetSearchResultRequestQuerystringSchema,
  response: {
    200: GetSearchResultReplySchema
  }
}

interface QueryBuilder<T extends Array<unknown> = Array<unknown>> {
  where: string
  values: T
}

const dateRangeList: Record<DateRange, Array<Date>> = {
  'All dates': [],
  'Today': [dayjs().startOf('day').toDate(), dayjs().endOf('day').toDate()],
  'This week': [dayjs().startOf('week').toDate(), dayjs().endOf('week').toDate()],
  'Next week': [dayjs().add(7, 'days').startOf('week').toDate(), dayjs().add(7, 'days').endOf('week').toDate()],
  'This month': [dayjs().startOf('month').toDate(), dayjs().endOf('month').toDate()],
  'Next month': [dayjs().add(1, 'month').startOf('month').toDate(), dayjs().add(1, 'month').endOf('month').toDate()]
}

const priceRangeList: Record<PriceRange, Array<number>> = {
  'Any': [],
  '< 300': [0, 300],
  '< 600': [0, 600],
  '< 1,200': [0, 1200],
  '< 2,400': [0, 2400],
  '< 4,800': [0, 4800],
  '< 7,200': [0, 7200],
  '< 10,000': [0, 10000],
  '10,000 and above': []
}

const eventQueryBuilder = (query: Required<GetSearchResultRequestQuerystring>): QueryBuilder => {
  let templateCount = 1
  const queryToReturn: QueryBuilder = {
    where: '',
    values: []
  }

  if (query.creatorType.length !== 0 && query.creatorType.length !== 2) {
    queryToReturn.where += `users.user_verification_status = ${query.creatorType.includes('Official') ? 'true' : 'false'}::boolean and `
  }

  if (query.dateRange !== 'All dates') {
    queryToReturn.where += `first_start_datetime >= $${templateCount} and `
    templateCount += 1
    queryToReturn.where += `last_start_datetime <= $${templateCount} and `
    queryToReturn.values.push(...dateRangeList[query.dateRange])
    templateCount += 1
  }

  if (query.priceRange !== 'Any') {
    if (query.priceRange === '10,000 and above') {
      queryToReturn.where += 'min_seat_price <= 10000::int and '
    } else {
      queryToReturn.where += `min_seat_price <= $${templateCount}::int and `
      templateCount += 1
      queryToReturn.where += `max_seat_price >= $${templateCount}::int and `
      templateCount += 1

      queryToReturn.values.push(...priceRangeList[query.priceRange])
    }
  }

  if (query.tags.length !== 0) {
    queryToReturn.where += `event_tags_bridge.event_tag_label in (${query.tags.map((_, i) => `$${i + templateCount}`).join(', ')}) and `
    templateCount += query.tags.length
    queryToReturn.values.push(...query.tags.map(q => normalizeTag(q)))
  }

  queryToReturn.where += 'array[events.event_name, events.user_username, events.event_website] &@ $' + templateCount.toString()
  queryToReturn.values.push(query.q)

  return queryToReturn
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Querystring: GetSearchResultRequestQuerystring, Reply: GetSearchResultReply }>(
    '/',
    {
      schema,
      preValidation: async (request, reply) => {
        const { q, creatorType, priceRange, tags, dateRange, type } = request.query

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
      }
    },
    async (request) => {
      const { q, type } = request.query as Required<GetSearchResultRequestQuerystring>

      type SearchedEventResult = events
      & Pick<users, 'user_verification_status'>
      & Pick<event_tags_bridge, 'event_tag_label'>
      & {
        first_start_datetime: Date
        last_start_datetime: Date
        min_seat_price: Date
        max_seat_price: Date
      }

      const { where, values } = eventQueryBuilder(request.query as Required<GetSearchResultRequestQuerystring>)

      if (type === 'Events') {
        const searchedResult = await instance.pg.query<SearchedEventResult>(
          `select
            events.*,
            min(event_datetimes.event_start_datetime) as first_start_datetime,
            max(event_datetimes.event_start_datetime) as last_start_datetime,
            min(event_seats.event_seat_price) as min_seat_price,
            max(event_seats.event_seat_price) as max_seat_price,
            users.user_verification_status,
            event_tags_bridge.event_tag_label
          from "event_seats"
          inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
          inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
          inner join "events" on event_datetimes.event_id = events.event_id
          inner join "event_tags" on events.event_id = event_tags_bridge.event_id
          inner join "users" on events.user_username = users.user_username
          where ${where}`,
          values
        )

        return {
          events: searchedResult.rows.map(s => {
            return {
              id: s.event_id,
              name: s.event_name,
              type: s.user_verification_status ? 'Official' : 'Local',
              firstStartDatetime: dayjs(s.first_start_datetime).toISOString(),
              lastStartDatetime: dayjs(s.last_start_datetime).toISOString(),
              openingDate: dayjs(s.event_opening_date).toISOString(),
              venueName: s.event_venue_name,
              venueCoordinates: {
                x: s.event_venue_coordinates.x.toString(),
                y: s.event_venue_coordinates.y.toString()
              }
            }
          }),
          users: []
        }
      }

      if (type === 'Users') {
        const searchedResult = await instance.pg.query<users, [string]>(
          `select
            *
          from "users"
          where array[user_username, user_social_medias, user_profile_description] &@ $1`,
          [q]
        )

        return {
          events: [],
          users: searchedResult.rows.map(s => {
            return {
              username: s.user_username,
              description: s.user_profile_description,
              socialMedias: s.user_social_medias,
              accountType: s.user_verification_status
            }
          })
        }
      }

      return {
        events: [],
        users: []
      }
    }
  )
}
