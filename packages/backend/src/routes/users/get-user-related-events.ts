import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  events,
  GetUserRelatedEventsParamsSchema,
  GetUserRelatedEventsReply,
  GetUserRelatedEventsReplySchema,
  GetUserRelatedEventsRequest,
  NotFoundReplySchema,
  RelatedEventToUser,
  users
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetUserRelatedEventsParamsSchema,
  response: {
    200: GetUserRelatedEventsReplySchema,
    400: BadRequestReplySchema,
    404: NotFoundReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetUserRelatedEventsRequest, Reply: GetUserRelatedEventsReply }>(
    '/:username/events',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async (request, reply) => {
        const { username } = request.params

        if (username == null || username === '') {
          void reply.code(400)
          throw new Error('params should have required property \'username\'')
        }
      }
    },
    async (request, reply) => {
      const existingUser = await instance.pg.query<users, [users['user_username']]>(
        'select * from "users" where user_username = $1',
        [request.params.username]
      )

      if (existingUser.rowCount === 0) {
        void reply.code(404)
        throw new Error('User not found')
      }

      type EventsThatUserAttended = Pick<events, 'event_id' | 'event_name' | 'user_username' | 'event_venue_name'>

      const eventsThatUserAttended = await instance.pg.query<EventsThatUserAttended, [users['user_username']]>(
        `select
          distinct events.event_id,
          events.event_name,
          events.user_username,
          events.event_venue_name
        from "transactions"
        inner join "transaction_details" on transactions.transaction_id = transaction_details.transaction_id
        inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        where transactions.user_username = $1`,
        [request.params.username]
      )

      const eventsThatUserCreated = await instance.pg.query<events, [users['user_username']]>(
        'select * from "events" where user_username = $1',
        [request.params.username]
      )

      const attended = eventsThatUserAttended.rows.map(attendedEvent => {
        const ret: RelatedEventToUser = {
          id: attendedEvent.event_id,
          name: attendedEvent.event_name,
          username: attendedEvent.user_username,
          venueName: attendedEvent.event_venue_name
        }

        return ret
      })

      const created = eventsThatUserCreated.rows.map(createdEvent => {
        const ret: RelatedEventToUser = {
          id: createdEvent.event_id,
          name: createdEvent.event_name,
          username: createdEvent.user_username,
          venueName: createdEvent.event_venue_name
        }

        return ret
      })

      return {
        attended,
        created
      }
    }
  )
}
