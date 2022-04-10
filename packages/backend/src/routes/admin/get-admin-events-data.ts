import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  AdminGetEventDataReply,
  AdminGetEventDataReplySchema,
  AdminGetEventDataRequestQuerystring,
  AdminGetEventDataRequestQuerystringSchema,
  events,
  t_user_role
} from '@reeba/common'

const PAGE_SIZE = 30

const schema: FastifySchema = {
  querystring: AdminGetEventDataRequestQuerystringSchema,
  response: {
    200: AdminGetEventDataReplySchema
  }
}

type EventsList = events & {
  total_events: number
  total_taken_seats: number
  total_seats: number
  seat_fullness_percentage: number
}

const buildOrderQuery = (query: AdminGetEventDataRequestQuerystring): string => {
  switch (query.sort) {
    case 'event-name-asc':
      return 'events.event_name asc'
    case 'event-name-desc':
      return 'events.event_name desc'
    case 'username-asc':
      return 'events.user_username asc'
    case 'username-desc':
      return 'events.user_username desc'
    case 'creation-date-asc':
      return 'events.event_creation_date asc'
    case 'creation-date-desc':
      return 'events.event_creation_date desc'
    case 'opening-date-asc':
      return 'events.event_opening_date asc'
    case 'opening-date-desc':
      return 'events.event_opening_date desc'
    case 'status-asc':
      return 'events.event_status asc'
    case 'status-desc':
      return 'events.event_status desc'
    case 'seat-fullness-percentage-asc':
      return 'seat_fullness_percentage asc'
    case 'seat-fullness-percentage-desc':
      return 'seat_fullness_percentage desc'
    case 'total-seats-asc':
      return 'total_seats asc'
    case 'total-seats-desc':
      return 'total_seats desc'
    case 'total-taken-seats-asc':
      return 'total_taken_seats asc'
    case 'total-taken-seats-desc':
      return 'total_taken_seats desc'
  }
}

const buildSearchQuery = (query: AdminGetEventDataRequestQuerystring): string => {
  if (query.q != null && query.q !== '') {
    return `where array[events.event_name, events.user_username, events.event_venue_name] &@ '${query.q}'`
  }

  return ''
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Querystring: AdminGetEventDataRequestQuerystring, Reply: AdminGetEventDataReply }>(
    '/events',
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
      ],
      preValidation: async (request) => {
        const { sort, page } = request.query

        if (Number(page) <= 0) {
          request.query.page = 1
        }

        if (isNaN(Number(page))) {
          request.query.page = 1
        }

        // @ts-expect-error sort could be empty string
        if (sort == null || sort === '') {
          request.query.sort = 'event-name-asc'
        }
      }
    },
    async (request) => {
      const { page } = request.query

      const eventsList = await instance.pg.query<EventsList, [number, number]>(
        `select
          count(events.event_id) over() as total_events,
          events.event_id,
          events.event_name,
          events.user_username,
          events.event_opening_date,
          events.event_creation_date,
          events.event_venue_name,
          events.event_venue_coordinates,
          events.event_venue_country_code_alpha_2,
          events.event_status,
          events.event_min_ticket_price,
          events.event_max_ticket_price,
          events.event_minimum_age,
          count(transaction_details.event_seat_id) as total_taken_seats,
          count(event_seats.event_seat_id) as total_seats,
          (count(transaction_details.event_seat_id)::float / count(event_seats.event_seat_id)::float) * 100::float as seat_fullness_percentage
        from "event_seats"
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        left join "transaction_details" on event_seats.event_seat_id = transaction_details.event_seat_id
        ${buildSearchQuery(request.query)}
        group by events.event_id
        order by ${buildOrderQuery(request.query)}
        limit $1 offset $2`,
        [PAGE_SIZE, (page * PAGE_SIZE) - PAGE_SIZE]
      )

      return {
        total: eventsList.rows[0]?.total_events ?? 0,
        events: eventsList.rows.map(e => {
          return {
            id: e.event_id,
            name: e.event_name,
            username: e.user_username,
            openingDate: dayjs(e.event_opening_date).toISOString(),
            creationDate: dayjs(e.event_creation_date).toISOString(),
            venueName: e.event_venue_name,
            venueCoordinates: {
              x: e.event_venue_coordinates.x.toString(),
              y: e.event_venue_coordinates.y.toString()
            },
            countryCode: e.event_venue_country_code_alpha_2,
            status: e.event_status,
            minTicketPrice: e.event_min_ticket_price,
            maxTicketPrice: e.event_max_ticket_price,
            minimumAge: e.event_minimum_age,
            totalTakenSeats: e.total_taken_seats,
            totalSeats: e.total_seats,
            seatFullnessPercentage: e.seat_fullness_percentage
          }
        })
      }
    }
  )
}
