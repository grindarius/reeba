import { FastifyInstance, FastifyPluginOptions, FastifySchema } from "fastify"

import {
  event_datetimes,
  event_seats,
  event_sections,
  events,
  GetEventSeatsReply,
  GetEventSeatsReplySchema,
  GetEventSeatsRequestParams,
  GetEventSeatsRequestParamsSchema,
  GetEventSeatsRequestQuerystring,
  GetEventSeatsRequestQuerystringSchema
} from "@reeba/common"

const schema: FastifySchema = {
  params: GetEventSeatsRequestParamsSchema,
  querystring: GetEventSeatsRequestQuerystringSchema,
  response: {
    200: GetEventSeatsReplySchema
  }
}

export default async (
  instance: FastifyInstance,
  _: FastifyPluginOptions
): Promise<void> => {
  instance.get<{
    Params: GetEventSeatsRequestParams
    Querystring: GetEventSeatsRequestQuerystring
    Reply: GetEventSeatsReply
  }>(
    "/:eventId/seats",
    {
      schema,
      onRequest: [instance.authenticate],
      preValidation: (request, reply) => {
        const { eventId } = request.params
        const { datetimeId } = request.query

        if (eventId == null || eventId === "") {
          void reply.code(400)
          throw new Error("params should have required property 'eventId'")
        }

        if (datetimeId == null || datetimeId === "") {
          void reply.code(400)
          throw new Error(
            "querystring should have required property 'datetimeId'"
          )
        }
      },
      config: {
        name: "GetEventSeats"
      }
    },
    async (request, reply) => {
      const theEvent = await instance.pg.query<events, [events["event_id"]]>(
        'select * from "events" where event_id = $1',
        [request.params.eventId]
      )

      if (theEvent.rows.length === 0) {
        void reply.code(404)
        throw new Error("Event not found")
      }

      const datetimes = await instance.pg.query<
        event_datetimes,
        [events["event_id"], event_datetimes["event_datetime_id"]]
      >(
        'select * from "event_datetimes" where event_id = $1 and event_datetime_id = $2',
        [request.params.eventId, request.query.datetimeId]
      )

      if (datetimes.rows.length === 0) {
        void reply.code(404)
        throw new Error("Event datetime not found")
      }

      type EventSeats = Omit<event_sections, "event_datetime_id"> &
        event_seats & { is_seat_taken: boolean }

      const sectionsAndSeats = await instance.pg.query<
        EventSeats,
        [events["event_id"], event_datetimes["event_datetime_id"]]
      >(
        `select
          event_sections.event_section_id,
          event_sections.event_section_row_position,
          event_sections.event_section_column_position,
          event_seats.event_seat_id,
          event_seats.event_seat_row_position,
          event_seats.event_seat_column_position,
          event_seats.event_seat_price,
          case when transaction_details.event_seat_id is null then 'false'::boolean else 'true'::boolean end as is_seat_taken
        from "event_seats"
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        left join "transaction_details" on event_seats.event_seat_id = transaction_details.event_seat_id
        where events.event_id = $1 and event_datetimes.event_datetime_id = $2`,
        [request.params.eventId, request.query.datetimeId]
      )

      const ticketPrices = await instance.pg.query<
        Pick<events, "event_ticket_prices">,
        [events["event_id"]]
      >('select event_ticket_prices from "events" where event_id = $1', [
        request.params.eventId
      ])

      return {
        sections: sectionsAndSeats.rows.map(s => {
          return {
            sectionId: s.event_section_id,
            sectionRowPosition: s.event_section_row_position,
            sectionColumnPosition: s.event_section_column_position,
            seatId: s.event_seat_id,
            seatRowPosition: s.event_seat_row_position,
            seatColumnPosition: s.event_seat_column_position,
            seatPrice: s.event_seat_price,
            isSeatTaken: s.is_seat_taken
          }
        }),
        ticketPrices: Object.entries(
          ticketPrices.rows[0].event_ticket_prices
        ).map(p => {
          return {
            color: p[0],
            price: p[1]
          }
        })
      }
    }
  )
}
