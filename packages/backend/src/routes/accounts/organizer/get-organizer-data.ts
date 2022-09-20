import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import {
  type GetOrganizerDataReply,
  type GetOrganizerDataRequestParams,
  type GetOrganizerDataRequestQuerystring,
  type GetOrganizerEventStatisticsReply,
  type GetOrganizerEventStatisticsRequestParams,
  type t_event_status,
  events,
  getOrganizerDataReplySchema,
  getOrganizerDataRequestParamsSchema,
  getOrganizerDataRequestQuerystringSchema,
  getOrganizerEventStatisticsReplySchema,
  getOrganizerEventStatisticsRequestParamsSchema
} from '@reeba/common'

const PAGE_SIZE = 30

type EventData = Pick<events, 'event_id' | 'event_name' | 'event_venue_name' | 'event_status' | 'event_venue_coordinates' | 'event_opening_date' | 'event_creation_date'> & {
  total_datetimes: number
  total_events: number
  total_sections: number
  total_taken_seats: number
  total_seats: number
  seat_fullness_percentage: number
}

interface IndividualEventData {
  total_seats?: number
  total_taken_seats?: number
  seat_fullness_percentage?: number
  gross_ticket_sales?: number
  reeba_ticket_fees?: number
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetOrganizerDataRequestParams, Querystring: GetOrganizerDataRequestQuerystring, Reply: GetOrganizerDataReply }>(
    '/:username/organizer',
    {
      schema: {
        params: getOrganizerDataRequestParamsSchema,
        querystring: getOrganizerDataRequestQuerystringSchema,
        response: {
          200: getOrganizerDataReplySchema
        }
      },
      onRequest: [instance.authenticate],
      config: {
        name: 'GetOrganizerData'
      }
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

      const eventData = await instance.pg.query<EventData, [string, number, number]>(
        `select
          count(events.event_id) over() as total_events,
          events.event_id,
          events.event_name,
          events.event_venue_name,
          events.event_venue_coordinates,
          events.event_status,
          events.event_creation_date,
          events.event_opening_date,
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
        total: eventData.rows[0]?.total_events ?? 0,
        events: eventData.rows.map(e => {
          return {
            id: e.event_id,
            name: e.event_name,
            venueName: e.event_venue_name,
            venueCoordinates: {
              x: e.event_venue_coordinates.x.toString(),
              y: e.event_venue_coordinates.y.toString()
            },
            openingDate: dayjs(e.event_opening_date).toISOString(),
            creationDate: dayjs(e.event_creation_date).toISOString(),
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

  instance.get<{ Params: GetOrganizerEventStatisticsRequestParams, Reply: GetOrganizerEventStatisticsReply }>(
    '/:username/organizer/:eventId',
    {
      schema: {
        params: getOrganizerEventStatisticsRequestParamsSchema,
        response: {
          200: getOrganizerEventStatisticsReplySchema
        }
      },
      onRequest: [instance.authenticate],
      config: {
        name: 'GetOrganizerEventStatistics'
      }
    },
    async (request, reply) => {
      const { eventId } = request.params

      const eventStuffs = await instance.pg.query<{ event_id: string, event_name: string, event_status: t_event_status }, [string]>(
        `select
          events.event_id,
          events.event_name,
          events.event_status
        from "events"
        where event_id = $1`,
        [eventId]
      )

      if (eventStuffs.rowCount === 0) {
        void reply.code(404)
        throw new Error('event not found')
      }

      const eventData = await instance.pg.query<IndividualEventData, [string]>(
        `select
          count(event_seats.event_seat_id)::int as total_seats,
          count(transaction_details.event_seat_id)::int as total_taken_seats,
          (count(transaction_details.event_seat_id)::float / count(event_seats.event_seat_id)::float) * 100::float as seat_fullness_percentage,
          coalesce(sum(event_seats.event_seat_price), 0::int)::float as gross_ticket_sales,
          coalesce(sum(event_seats.event_seat_price), 0::int)::float * 0.1::float as reeba_ticket_fees
        from "event_seats"
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        left join "transaction_details" on event_seats.event_seat_id = transaction_details.event_seat_id
        where events.event_id = $1 and transaction_details.event_seat_id is not null
        group by events.event_id`,
        [eventId]
      )

      const seatings = await instance.pg.query(
        `select
          events.event_id,
          count(event_seats.event_seat_id)::int as total_seats,
          count(transaction_details.event_seat_id)::int as total_taken_seats,
          (count(transaction_details.event_seat_id)::float / count(event_seats.event_seat_id)::float) * 100::float as seat_fullness_percentage
        from "event_seats"
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        left join "transaction_details" on event_seats.event_seat_id = transaction_details.event_seat_id
        where events.event_id = $1
        group by events.event_id`,
        [eventId]
      )

      return {
        id: eventStuffs.rows[0]?.event_id ?? '',
        name: eventStuffs.rows[0]?.event_name ?? '',
        status: eventStuffs.rows[0]?.event_status ?? '',
        totalSeats: seatings.rows[0]?.total_seats ?? 0,
        totalTakenSeats: seatings.rows[0]?.total_taken_seats ?? 0,
        seatFullnessPercentage: seatings.rows[0]?.seat_fullness_percentage ?? 0,
        grossTicketSales: eventData.rows[0]?.gross_ticket_sales ?? 0,
        reebaTicketFees: eventData.rows[0]?.reeba_ticket_fees ?? 0,
        netPayout: (eventData.rows[0]?.gross_ticket_sales ?? 0) - (eventData.rows[0]?.reeba_ticket_fees ?? 0)
      }
    }
  )
}
