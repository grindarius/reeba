import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import {
  AdminGetMapsDataReply,
  AdminGetMapsDataReplySchema,
  AdminGetMapsDataRequestQuerystring,
  AdminGetMapsDataRequestQuerystringSchema,
  AdminGetRegistrationSummaryReply,
  AdminGetRegistrationSummaryReplySchema,
  AdminGetRegistrationSummaryRequestQuerystring,
  AdminGetRegistrationSummaryRequestQuerystringSchema,
  AdminGetStatisticsSummaryReply,
  AdminGetStatisticsSummaryReplySchema,
  AdminGetTopEventTagsOfAllTimeReply,
  AdminGetTopEventTagsOfAllTimeReplySchema,
  AdminGetTopEventTagsOfAllTimeRequestQuerystring,
  AdminGetTopEventTagsOfAllTimeRequestQuerystringSchema,
  AdminGetTransactionSummaryReply,
  AdminGetTransactionSummaryReplySchema,
  AdminGetTransactionSummaryRequestQuerystring,
  AdminGetTransactionSummaryRequestQuerystringSchema,
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

    if (now - then === 0) {
      return 0
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
      ],
      config: {
        name: 'AdminGetStatisticsSummary'
      }
    },
    async () => {
      const now = dayjs().toDate()
      const startOfNow = dayjs().startOf('month').toDate()
      const oneMonthPrior = dayjs().subtract(1, 'month').startOf('month').toDate()

      const totalUsers = await instance.pg.query<{ total_users: number }>(
        'select count(user_username)::int as total_users from "users"'
      )

      const newUsersThisMonth = await instance.pg.query<{ new_users_this_month: number }, DateInput>(
        'select count(user_username)::int as new_users_this_month from "users" where $1 <= user_registration_datetime and user_registration_datetime <= $2',
        [startOfNow, now]
      )

      const newUsersPastMonth = await instance.pg.query<{ new_users_past_month: number }, DateInput>(
        'select count(user_username)::int as new_users_past_month from "users" where $1 <= user_registration_datetime and user_registration_datetime <= $2',
        [oneMonthPrior, startOfNow]
      )

      const totalEvents = await instance.pg.query<{ total_events: number }>(
        'select count(events.event_id)::int as total_events from "events"'
      )

      const newEventsThisMonth = await instance.pg.query<{ new_events_this_month: number }, DateInput>(
        'select count(event_id)::int as new_events_this_month from "events" where $1 <= event_creation_date and event_creation_date <= $2',
        [startOfNow, now]
      )

      const newEventsPastMonth = await instance.pg.query<{ new_events_past_month: number }>(
        'select count(event_id)::int as new_events_past_month from "events" where $1 <= event_creation_date and event_creation_date <= $2',
        [oneMonthPrior, startOfNow]
      )

      const incomes = await instance.pg.query<{ total_gross_income: number, total_pure_income: number }>(
        `select
          coalesce(sum(event_seats.event_seat_price), 0)::float as total_gross_income,
          (coalesce(sum(event_seats.event_seat_price), 0) * 0.1)::float as total_pure_income
        from "transaction_details"
        inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id`
      )

      return {
        totalUsers: totalUsers.rows[0].total_users,
        newUsersThisMonth: newUsersThisMonth.rows[0].new_users_this_month,
        newUsersPastMonth: newUsersPastMonth.rows[0].new_users_past_month,
        newUsersPercentageDifferenceToLastMonth: percentageDifference(newUsersThisMonth.rows[0].new_users_this_month, newUsersPastMonth.rows[0].new_users_past_month),
        totalEvents: totalEvents.rows[0].total_events,
        newEventsThisMonth: newEventsThisMonth.rows[0].new_events_this_month,
        newEventsPastMonth: newEventsPastMonth.rows[0].new_events_past_month,
        newEventsPercentageDifferenceToLastMonth: percentageDifference(newEventsThisMonth.rows[0].new_events_this_month, newEventsPastMonth.rows[0].new_events_past_month),
        totalGrossIncome: incomes.rows[0].total_gross_income,
        totalPureIncome: incomes.rows[0].total_pure_income
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
      },
      onRequest: [
        instance.authenticate,
        async (request, reply) => {
          if (request.user.role !== t_user_role.admin) {
            void reply.code(403)
            throw new Error('forbidden')
          }
        }
      ],
      config: {
        name: 'AdminGetMapsData'
      }
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

  instance.get<{ Querystring: AdminGetTransactionSummaryRequestQuerystring, Reply: AdminGetTransactionSummaryReply }>(
    '/transaction-summary',
    {
      schema: {
        querystring: AdminGetTransactionSummaryRequestQuerystringSchema,
        response: {
          200: AdminGetTransactionSummaryReplySchema
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
      ],
      config: {
        name: 'AdminGetTransactionSummary'
      }
    },
    async (request) => {
      const { start, end, group } = request.query

      const transactions = await instance.pg.query<{ date: string, amount: number | null }, [Date, Date, string, string]>(
        `select
          *
        from (
          select to_char(date, 'YYYY-MM-DD') as date
          from generate_series(
            $1::date,
            $2::date,
            $3::interval
          ) date
        ) d
        left join (
          select
            to_char(date_trunc($4, transactions.transaction_time), 'YYYY-MM-DD') as date,
            coalesce(sum(event_seats.event_seat_price), 0)::int as amount
          from "transactions"
          inner join "transaction_details" on transactions.transaction_id = transaction_details.transaction_id
          inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id
          where $1::date <= transactions.transaction_time and transactions.transaction_time <= $2::date
          group by date
        ) t using (date)
        order by date`,
        [dayjs(start).toDate(), dayjs(end).toDate(), `1 ${group}`, group]
      )

      return {
        transactions: transactions.rows.map(t => {
          return {
            date: t.date,
            amount: t.amount ?? 0
          }
        })
      }
    }
  )

  instance.get<{ Querystring: AdminGetRegistrationSummaryRequestQuerystring, Reply: AdminGetRegistrationSummaryReply }>(
    '/registration-summary',
    {
      schema: {
        querystring: AdminGetRegistrationSummaryRequestQuerystringSchema,
        response: {
          200: AdminGetRegistrationSummaryReplySchema
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
      ],
      config: {
        name: 'AdminGetRegistrationSummary'
      }
    },
    async (request) => {
      const { start, end, group } = request.query

      const registrations = await instance.pg.query<{ date: string, amount: number }, [Date, Date, string, string]>(
        `select
          *
        from (
          select to_char(date, 'YYYY-MM-DD') as date
          from generate_series(
            $1::date,
            $2::date,
            $3::interval
          ) date
        ) d
        left join (
          select
            to_char(date_trunc($4, users.user_registration_datetime), 'YYYY-MM-DD') as date,
            count(users.user_username)::int as amount
          from "users"
          where $1::date <= users.user_registration_datetime and users.user_registration_datetime <= $2::date
          group by date
        ) t using (date)
        order by date`,
        [dayjs(start).toDate(), dayjs(end).toDate(), `1 ${group}`, group]
      )

      return {
        registrations: registrations.rows
      }
    }
  )

  instance.get<{ Querystring: AdminGetTopEventTagsOfAllTimeRequestQuerystring, Reply: AdminGetTopEventTagsOfAllTimeReply }>(
    '/top-event-tags',
    {
      schema: {
        querystring: AdminGetTopEventTagsOfAllTimeRequestQuerystringSchema,
        response: {
          200: AdminGetTopEventTagsOfAllTimeReplySchema
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
      ],
      config: {
        name: 'AdminGetTopEventTagsOfAllTime'
      }
    },
    async (request) => {
      const { top } = request.query

      const topEventTags = await instance.pg.query<{ tag: string, amount: number }>(
        `select
          event_tag_label as tag,
          count(event_tag_label) as amount
        from "event_tags_bridge"
        group by event_tag_label
        order by amount desc
        limit $1`,
        [top]
      )

      return {
        tags: topEventTags.rows
      }
    }
  )
}
