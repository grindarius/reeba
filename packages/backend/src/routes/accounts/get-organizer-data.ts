import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  events,
  GetOrganizerDataReply,
  GetOrganizerDataReplySchema,
  GetOrganizerDataRequestParams,
  GetOrganizerDataRequestParamsSchema,
  GetOrganizerDataRequestQuerystring,
  GetOrganizerDataRequestQuerystringSchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetOrganizerDataRequestParamsSchema,
  querystring: GetOrganizerDataRequestQuerystringSchema,
  response: {
    200: GetOrganizerDataReplySchema
  }
}

const PAGE_SIZE = 30

type EventData = Pick<events, 'event_id' | 'event_name' | 'event_venue_name' | 'event_status'> & {
  total_datetimes: number
  total_sections: number
  total_taken_seats: number
  total_seats: number
  seat_fullness_percentage: number
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetOrganizerDataRequestParams, Querystring: GetOrganizerDataRequestQuerystring, Reply: GetOrganizerDataReply }>(
    '/:username/organizer',
    {
      schema
    },
    async (request, reply) => {
      const { username } = request.params
      const { page } = request.query

      const user = await instance.pg.query(
        'select * from "users" where user_username = $1',
        [username]
      )

      if (user.rowCount === 0) {
        void reply.code(404)
        throw new Error('user not found')
      }

      const eventData = await instance.pg.query<EventData>(
        `select
          events.event_id,
          events.event_name,
          events.event_venue_name,
          events.event_status,
          count(distinct event_datetimes.event_datetime_id)::int as total_datetimes,
          count(distinct event_sections.event_section_id)::int as total_sections,
          count(transaction_details.event_seat_id)::int as total_taken_seats,
          count(event_seats.event_seat_id)::int as total_seats,
          (count(transaction_details.event_seat_id)::float / count(event_seats.event_seat_id)::float) * 100::float as seat_fullness_percentage
        from "event_seats"
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        left join "transaction_details" on event_seats.event_seat_id = transaction_details.event_seat_id
        where events.user_username = $1
        group by events.event_id
        order by events.event_id asc
        limit $2 offset $3`,
        [username, PAGE_SIZE, (page * PAGE_SIZE) - PAGE_SIZE]
      )

      return {
        events: eventData.rows.map(e => {
          return {
            id: e.event_id,
            name: e.event_name,
            venueName: e.event_venue_name,
            status: e.event_status,
            totalDatetimes: e.total_datetimes,
            totalSections: e.total_sections,
            totalSeats: e.total_seats,
            totalTakenSeats: e.total_taken_seats,
            seatFullnessPercentage: e.seat_fullness_percentage
          }
        })
      }
    }
  )
}
