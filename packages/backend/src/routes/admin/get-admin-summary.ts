import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  AdminGetStatisticsSummaryReply,
  AdminGetStatisticsSummaryReplySchema,
  AdminGetStatisticsSummaryRequestQuerystring,
  AdminGetStatisticsSummaryRequestQuerystringSchema,
  t_user_role
} from '@reeba/common'

const schema: FastifySchema = {
  querystring: AdminGetStatisticsSummaryRequestQuerystringSchema,
  response: {
    200: AdminGetStatisticsSummaryReplySchema
  }
}

type DateInput = [Date, Date]

/**
 * Percentage difference calculator for user amount
 *
 * @see https://www.skillsyouneed.com/num/percent-change.html
 */
const percentageDifference = (now: number, then: number): number => {
  if (then === 0) {
    if (now - then > 0) {
      return 100
    }

    if (now - then < 0) {
      return -100
    }
  }

  return (now - then) / then * 100
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Querystring: AdminGetStatisticsSummaryRequestQuerystring, Reply: AdminGetStatisticsSummaryReply }>(
    '/summary',
    {
      schema,
      onRequest: [
        instance.authenticate,
        async (request, reply) => {
          if (request.user.role !== t_user_role.admin) {
            void reply.code(403)
            throw new Error('forbidden')
          }
        }
      ]
    },
    async (request) => {
      const { start, end } = request.query

      const now = dayjs().toDate()
      const startOfNow = dayjs().startOf('month').toDate()
      const oneMonthPrior = dayjs().subtract(1, 'month').startOf('month').toDate()

      const totalUsers = await instance.pg.query<{ total_users: number }>(
        'select count(user_username) as total_users from "users"'
      )

      const newUsersThisMonth = await instance.pg.query<{ new_users_this_month: number }, DateInput>(
        'select count(user_username) as new_users_this_month from "users" where $1 <= user_registration_datetime and user_registration_datetime <= $2',
        [startOfNow, now]
      )

      const newUsersPastMonth = await instance.pg.query<{ new_users_past_month: number }, DateInput>(
        'select count(user_username) as new_users_past_month from "users" where $1 <= user_registration_datetime and user_registration_datetime <= $2',
        [oneMonthPrior, startOfNow]
      )

      const newUsersInTimeRange = await instance.pg.query<{ new_users_in_time_range: number }, DateInput>(
        'select count(user_username) as new_users_in_time_range from "users" where $1 <= user_registration_datetime and user_registration_datetime <= $2',
        [dayjs(start).toDate(), dayjs(end).toDate()]
      )

      const totalEvents = await instance.pg.query<{ total_events: number }>(
        'select count(events.event_id) as total_events from "events"'
      )

      const newEventsThisMonth = await instance.pg.query<{ new_events_this_month: number }, DateInput>(
        'select count(event_id) as new_events_this_month from "events" where $1 <= event_creation_date and event_creation_date <= $2',
        [startOfNow, now]
      )

      const newEventsPastMonth = await instance.pg.query<{ new_events_past_month: number }>(
        'select count(event_id) as new_events_past_month from "events" where $1 <= event_creation_date and event_creation_date <= $2',
        [oneMonthPrior, startOfNow]
      )

      const newEventsInTimeRange = await instance.pg.query<{ new_events_in_time_range: number }, DateInput>(
        'select count(event_id) as new_events_in_time_range from "events" where $1 <= event_creation_date and event_creation_date <= $2',
        [dayjs(start).toDate(), dayjs(end).toDate()]
      )

      return {
        totalUsers: totalUsers.rows[0].total_users,
        newUsersThisMonth: newUsersThisMonth.rows[0].new_users_this_month,
        newUsersPastMonth: newUsersPastMonth.rows[0].new_users_past_month,
        newUsersPercentageDifferenceToLastMonth: percentageDifference(newUsersThisMonth.rows[0].new_users_this_month, newUsersPastMonth.rows[0].new_users_past_month),
        newUsersInTimeRange: newUsersInTimeRange.rows[0].new_users_in_time_range,
        totalEvents: totalEvents.rows[0].total_events,
        newEventsThisMonth: newEventsThisMonth.rows[0].new_events_this_month,
        newEventsPastMonth: newEventsPastMonth.rows[0].new_events_past_month,
        newEventsPercentageDifferenceToLastMonth: percentageDifference(newEventsThisMonth.rows[0].new_events_this_month, newEventsPastMonth.rows[0].new_events_past_month),
        newEventsInTimeRange: newEventsInTimeRange.rows[0].new_events_in_time_range
      }
    }
  )
}
