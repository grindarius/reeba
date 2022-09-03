import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  AdminGetTransactionDataReply,
  AdminGetTransactionDataReplySchema,
  AdminGetTransactionDataRequestQuerystring,
  AdminGetTransactionDataRequestQuerystringSchema,
  t_user_role,
  transactions
} from '@reeba/common'

const PAGE_SIZE = 30

const schema: FastifySchema = {
  querystring: AdminGetTransactionDataRequestQuerystringSchema,
  response: {
    200: AdminGetTransactionDataReplySchema
  }
}

const sortByQueryBuilder = (query: AdminGetTransactionDataRequestQuerystring): string => {
  switch (query.sort) {
    case 'time-asc':
      return 'transactions.transaction_time asc'
    case 'time-desc':
      return 'transactions.transaction_time desc'
    case 'price-asc':
      return 'total_price asc'
    case 'price-desc':
      return 'total_price desc'
    case 'username-asc':
      return 'transactions.user_username asc'
    case 'username-desc':
      return 'transactions.user_username desc'
  }
}

const buildSearchQuery = (query: AdminGetTransactionDataRequestQuerystring): string => {
  if (query.q != null && query.q !== '') {
    return `where array[transactions.user_username] &@ '${query.q}'`
  }

  return ''
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Querystring: AdminGetTransactionDataRequestQuerystring, Reply: AdminGetTransactionDataReply }>(
    '/transactions',
    {
      schema,
      onRequest: [
        instance.authenticate,
        (request, reply) => {
          if (request.user.role !== t_user_role.admin) {
            void reply.code(403)
            throw new Error('forbidden')
          }
        }
      ],
      preValidation: (request) => {
        if (Number(request.query.page) <= 0) {
          request.query.page = 1
        }

        if (isNaN(Number(request.query.page))) {
          request.query.page = 1
        }

        // @ts-expect-error sort could be empty string
        if (request.query.sort == null || request.query.sort === '') {
          request.query.sort = 'time-asc'
        }
      },
      config: {
        name: 'AdminGetTransactionData'
      }
    },
    async (request) => {
      const { page } = request.query

      const transactions = await instance.pg.query<transactions & { seat_list: Array<string>, total_price: number, total_transactions: number }>(
        `select
          count(transactions.transaction_id) over() as total_transactions,
          transactions.*,
          array_agg(transaction_details.event_seat_id) as seat_list,
          sum(event_seats.event_seat_price)::int + ((count(event_seats.event_seat_id)::int * 40) + 5) as total_price
        from "transaction_details"
        inner join "transactions" on transaction_details.transaction_id = transactions.transaction_id
        inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id
        ${buildSearchQuery(request.query)}
        group by transactions.transaction_id
        order by ${sortByQueryBuilder(request.query)}
        limit $1 offset $2`,
        [PAGE_SIZE, (PAGE_SIZE * page) - PAGE_SIZE]
      )

      return {
        total: transactions.rows[0]?.total_transactions ?? 0,
        transactions: transactions.rows.map(t => {
          return {
            transactionId: t.transaction_id,
            username: t.user_username,
            time: dayjs(t.transaction_time).toISOString(),
            seats: t.seat_list,
            totalPriceWithVat: t.total_price
          }
        })
      }
    }
  )
}
