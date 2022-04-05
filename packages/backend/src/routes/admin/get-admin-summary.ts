import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import {
  AdminGetMapsDataReply,
  AdminGetMapsDataReplySchema,
  AdminGetMapsDataRequestQuerystring,
  AdminGetMapsDataRequestQuerystringSchema,
  AdminGetStatisticsSummaryReply,
  AdminGetStatisticsSummaryReplySchema,
  events,
  t_user_role,
  users
} from '@reeba/common'

type DateInput = [Date, Date]

/**
 * Percentage difference calculator for user and event amount
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
  instance.get<{ Reply: AdminGetStatisticsSummaryReply }>(
    '/summary',
    {
      schema: {
        response: {
          200: AdminGetStatisticsSummaryReplySchema
        }
      },
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

      return {
        totalUsers: totalUsers.rows[0].total_users,
        newUsersThisMonth: newUsersThisMonth.rows[0].new_users_this_month,
        newUsersPastMonth: newUsersPastMonth.rows[0].new_users_past_month,
        newUsersPercentageDifferenceToLastMonth: percentageDifference(newUsersThisMonth.rows[0].new_users_this_month, newUsersPastMonth.rows[0].new_users_past_month),
        totalEvents: totalEvents.rows[0].total_events,
        newEventsThisMonth: newEventsThisMonth.rows[0].new_events_this_month,
        newEventsPastMonth: newEventsPastMonth.rows[0].new_events_past_month,
        newEventsPercentageDifferenceToLastMonth: percentageDifference(newEventsThisMonth.rows[0].new_events_this_month, newEventsPastMonth.rows[0].new_events_past_month)
      }
    }
  )

  instance.get<{ Querystring: AdminGetMapsDataRequestQuerystring, Reply: AdminGetMapsDataReply }>(
    '/maps',
    {
      schema: {
        querystring: AdminGetMapsDataRequestQuerystringSchema,
        response: {
          200: AdminGetMapsDataReplySchema
        }
      }
      // onRequest: [
      //   instance.authenticate,
      //   async (request, reply) => {
      //     if (request.user.role !== t_user_role.admin) {
      //       void reply.code(403)
      //       throw new Error('forbidden')
      //     }
      //   }
      // ]
    },
    async (request) => {
      const { start, end } = request.query

      const usersGroupByCountry = await instance.pg.query<Pick<users, 'user_iso_31662_code'> & { user_count: number }>(
        `select
          user_iso_31662_code,
          count(user_username)::int as user_count
        from "users"
        where $1 <= user_registration_datetime and user_registration_datetime <= $2
        group by user_iso_31662_code`,
        [dayjs(start).toDate(), dayjs(end).toDate()]
      )

      const eventsGroupByCountry = await instance.pg.query<Pick<events, 'event_venue_country_code_alpha_2'> & { event_count: number }>(
        `select
          event_venue_country_code_alpha_2,
          count(event_id)::int as event_count
        from "events"
        where $1 <= event_creation_date and event_creation_date <= $2
        group by event_venue_country_code_alpha_2`,
        [dayjs(start).toDate(), dayjs(end).toDate()]
      )

      return {
        users: usersGroupByCountry.rows.map(u => {
          return {
            country: u.user_iso_31662_code,
            amount: u.user_count
          }
        }),
        events: eventsGroupByCountry.rows.map(e => {
          return {
            country: e.event_venue_country_code_alpha_2,
            amount: e.event_count
          }
        })
      }
    }
  )
}
