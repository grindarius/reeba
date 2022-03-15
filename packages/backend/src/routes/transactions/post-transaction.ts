import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { nanoid } from 'nanoid'

import {
  BadRequestReplySchema,
  event_datetimes,
  event_seats,
  event_sections,
  events,
  PostTransactionReply,
  PostTransactionReplySchema,
  PostTransactionRequestBody,
  PostTransactionRequestBodySchema
} from '@reeba/common'

const schema: FastifySchema = {
  body: PostTransactionRequestBodySchema,
  response: {
    200: PostTransactionReplySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: PostTransactionRequestBody, Reply: PostTransactionReply }>(
    '/',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async (request, reply) => {
        const { eventId, datetimeId, sectionId, seatIds } = request.body

        if (eventId == null || eventId === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventId\'')
        }

        if (datetimeId == null || datetimeId === '') {
          void reply.code(400)
          throw new Error('body should have required property \'datetimeId\'')
        }

        if (sectionId == null || sectionId === '') {
          void reply.code(400)
          throw new Error('body should have required property \'sectionId\'')
        }

        if (seatIds == null) {
          void reply.code(400)
          throw new Error('body should have required property \'seatIds\'')
        }

        if (!Array.isArray(seatIds)) {
          void reply.code(400)
          throw new Error('wrong \'seatIds\' format')
        }

        if (seatIds.length === 0) {
          void reply.code(400)
          throw new Error('body should have required property \'seatIds\'')
        }

        const filteredSeats = seatIds.filter(id => id !== '')

        if (filteredSeats.length === 0) {
          void reply.code(400)
          throw new Error('no seatIds available after it\'s filtered for empty string')
        }

        request.body = { ...request.body, seatIds: filteredSeats }
      }
    },
    async (request, reply) => {
      const { eventId, datetimeId, sectionId, seatIds } = request.body
      console.log(request.body)

      type TakenSeatsReturn = Pick<events, 'event_id'> & Pick<event_datetimes, 'event_datetime_id'> & Pick<event_sections, 'event_section_id'> & Pick<event_seats, 'event_seat_id'>
      type TakenSeatsValues = [
        events['event_id'],
        event_datetimes['event_datetime_id'],
        event_sections['event_section_id'],
        ...Array<event_seats['event_seat_id']>
      ]

      // * check if all seats are taken or not
      // * taken seats will have seat id on both transaction_details and event_seats
      // * available seats will have seat id on event_seats table only
      // * this function will return an empty array if all seats are available,
      // * will return seat ids that are taken
      const takenSeats = await instance.pg.query<TakenSeatsReturn, TakenSeatsValues>(
        `select
          events.event_id,
          event_datetimes.event_datetime_id,
          event_sections.event_section_id,
          event_seats.event_seat_id
        from "event_seats"
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        left join "transaction_details" on event_seats.event_seat_id = transaction_details.event_seat_id
        where
          transaction_details.event_seat_id is null and
          events.event_id = $1 and
          event_datetimes.event_datetime_id = $2 and
          event_sections.event_section_id = $3 and
          event_seats.event_seat_id in (${seatIds.map((_, i) => `$${i + 4}`).join(',')})`,
        [eventId, datetimeId, sectionId, ...seatIds]
      )

      if (takenSeats.rowCount !== 0) {
        void reply.code(400)
        throw new Error('the following seatIds are taken: ' + takenSeats.rows.map(t => t.event_seat_id).join(', '))
      }

      // * if none is taken, register the transaction.
      return await instance.pg.transact<PostTransactionReply>(async client => {
        const transactionId = await client.query<{ transaction_id: string }, [string, string]>(
          'insert into "transactions" (transaction_id, user_username) values ($1, $2) returning transaction_id',
          [nanoid(), request.user.username]
        )

        for await (const seatId of seatIds) {
          await client.query(
            'insert into transaction_details (transaction_id, event_seat_id) values ($1, $2)',
            [transactionId.rows[0].transaction_id, seatId]
          )
        }

        return {
          message: 'complete'
        }
      })
    }
  )
}
