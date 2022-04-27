import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  events,
  PostTransferTransactionReply,
  PostTransferTransactionReplySchema,
  PostTransferTransactionRequestBody,
  PostTransferTransactionRequestBodySchema,
  PostTransferTransactionRequestParams,
  PostTransferTransactionRequestParamsSchema,
  transactions
} from '@reeba/common'

const schema: FastifySchema = {
  params: PostTransferTransactionRequestParamsSchema,
  body: PostTransferTransactionRequestBodySchema,
  response: {
    200: PostTransferTransactionReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Params: PostTransferTransactionRequestParams, Body: PostTransferTransactionRequestBody, Reply: PostTransferTransactionReply }>(
    '/:transactionId/transfer',
    {
      schema,
      onRequest: instance.authenticate,
      config: {
        name: 'PostTransferTransaction'
      }
    },
    async (request, reply) => {
      const { username } = request.body
      const { transactionId } = request.params

      // * check if destination username exists
      const usernameToTransferTicketTo = await instance.pg.query(
        'select * from "users" where user_username = $1',
        [username]
      )

      if (usernameToTransferTicketTo.rowCount === 0) {
        void reply.code(404)
        throw new Error('username to transfer to not found')
      }

      // * get event id of an event from transaction ids
      const eventIdOfTransaction = await instance.pg.query<Pick<events, 'event_id'>, [transactions['transaction_id']]>(
        `select
          distinct events.event_id
        from "transactions"
        inner join "transaction_details" on transactions.transaction_id = transaction_details.transaction_id
        inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        where transactions.transaction_id = $1`,
        [transactionId]
      )

      if (eventIdOfTransaction.rows.length === 0) {
        void reply.code(404)
        throw new Error('event related to transactionId not found')
      }

      // * check if there is any transaction by destination user that contains the given event id, this should return empty array
      // * if a user got a transaction tied to an event id, that means the user already have an event tied to the given transaction id
      const allTransactionsOfDestinationUsername = await instance.pg.query<
      Pick<events, 'event_id'> & Pick<transactions, 'user_username'>,
      [transactions['user_username'], ...Array<events['event_id']>]>(
        `select
          events.event_id,
          transactions.user_username
        from "transactions"
        inner join "transaction_details" on transactions.transaction_id = transaction_details.transaction_id
        inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        where transactions.user_username = $1 and events.event_id in (${Array.from({ length: eventIdOfTransaction.rowCount }, (_, i) => `$${i + 2}`).join(', ')})`,
        [username, ...eventIdOfTransaction.rows.map(e => e.event_id)]
      )

      if (allTransactionsOfDestinationUsername.rowCount > 0) {
        void reply.code(400)
        throw new Error('this user already had a ticket for this event')
      }

      await instance.pg.query(
        'update "transactions" set user_username = $1, transaction_time = $2 where transaction_id = $3',
        [username, dayjs().toDate(), transactionId]
      )

      return {
        message: 'complete'
      }
    }
  )
}
