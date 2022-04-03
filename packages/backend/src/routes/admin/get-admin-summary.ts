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
    async () => {
      const now = dayjs().toDate()
      const twoMonthPrior = dayjs().subtract(2, 'month').startOf('month').toDate()

      const newUsersGroupByMonths = await instance.pg.query<{ total_users_each_month: number, date: string }>(
        `select
          count(user_username) as total_users,
          to_char(date_trunc($3, user_registration_datetime), $4)
        from "users"
        where $1 <= user_registration_datetime and user_registration_datetime <= $2
        group by to_char(date_trunc($3, user_registration_datetime), $4)
        order by to_char(date_trunc($3, user_registration_datetime), $4) asc`,
        [twoMonthPrior, now, 'month', 'YYYY-MM-DD']
      )

      console.log(newUsersGroupByMonths.rows)

      // const totalUsers = await instance.pg.query<{ total_users: number }>(
      //   'select count(user_username) as total_users from "users"'
      // )

      // const newUsersPast3Months = await instance.pg.query(
      //   'select count(event_id) as event_count, date_trunc($1, event_creation_date) as event_date from "events" group by event_date',
      //   ['month']
      // )

      // console.log(newUsersPast3Months.rows)

      // const newUsersThisMonth = await instance.pg.query<{ new_users_this_month: number }, DateInput>(
      //   'select count(user_username) as new_users_this_month from "users" where user_registration_datetime <= $1 and $2 <= user_registration_datetime',
      //   [oneMonthPrior, now]
      // )

      // const newUsersPastMonth = await instance.pg.query<{ new_users_past_month: number }, DateInput>(
      //   'select count(user_username) as new_users_past_month from "users" where user_registration_datetime <= $1 and $2 <= user_registration_datetime',
      //   [twoMonthPrior, oneMonthPrior]
      // )

      // const newUsersInTimeRange = await instance.pg.query<{ new_users_in_time_range: number }, DateInput>(
      //   'select count(user_username) as new_users_in_time_range from "users" where user_registration_datetime <= $1 and $2 <= user_registration_datetime',
      //   [dayjs(start).toDate(), dayjs(end).toDate()]
      // )

      // const totalEvents = await instance.pg.query<{ total_events: number }>(
      //   'select count(events.event_id) as total_events from "events"'
      // )

      // const newEventsThisMonth = await instance.pg.query<{ new_events_this_month: number }, DateInput>(
      //   'select count(event_id) as new_events_this_month from "events" where event_creation_date <= $1 and $2 <= event_creation_date',
      //   [oneMonthPrior, now]
      // )

      // const newEventsPastMonth = await instance.pg.query<{ new_events_past_month: number }>(
      //   'select count(event_id) as new_events_past_month from "events" where event_creation_date <= $1 and $2 <= event_creation_date',
      //   [twoMonthPrior, oneMonthPrior]
      // )

      // const newEventsInTimeRange = await instance.pg.query<{ new_events_in_time_range: number }, DateInput>(
      //   'select count(event_id) as new_events_in_time_range from "events" where event_creation_date <= $1 and $2 <= event_creation_date',
      //   [dayjs(start).toDate(), dayjs(end).toDate()]
      // )

      return {
        totalUsers: 0,
        newUsersThisMonth: 0,
        newUsersPercentageDifferenceToLastMonth: 0,
        newUsersInTimeRange: 0,
        totalEvents: 0,
        newEventsThisMonth: 0,
        newEventsPercentageDifferenceToLastMonth: 0,
        newEventsInTimeRange: 0
      }

      // return {
      //   totalUsers: totalUsers.rows[0].total_users,
      //   newUsersThisMonth: newUsersThisMonth.rows[0].new_users_this_month,
      //   newUsersPercentageDifferenceToLastMonth: isNaN(((newUsersThisMonth.rows[0].new_users_this_month - newUsersPastMonth.rows[0].new_users_past_month) / newUsersPastMonth.rows[0].new_users_past_month) * 100),
      //   newUsersInTimeRange: newUsersInTimeRange.rows[0].new_users_in_time_range,
      //   totalEvents: totalEvents.rows[0].total_events,
      //   newEventsThisMonth: newEventsThisMonth.rows[0].new_events_this_month,
      //   newEventsPercentageDifferenceToLastMonth: isNaN(((newEventsThisMonth.rows[0].new_events_this_month - newEventsPastMonth.rows[0].new_events_past_month) / newEventsPastMonth.rows[0].new_events_past_month) * 100)
      //     ? 0
      //     : (((newEventsThisMonth.rows[0].new_events_this_month - newEventsPastMonth.rows[0].new_events_past_month) / newEventsPastMonth.rows[0].new_events_past_month) * 100),
      //   newEventsInTimeRange: newEventsInTimeRange.rows[0].new_events_in_time_range
      // }
    }
  )
}
