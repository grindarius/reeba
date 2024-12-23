import dayjs from "dayjs"
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from "fastify"

import {
  event_datetimes,
  event_seats,
  event_sections,
  events,
  GetMyTicketsReply,
  GetMyTicketsReplySchema,
  GetMyTicketsRequestParams,
  GetMyTicketsRequestParamsSchema,
  groupBy,
  numberToLetters,
  transaction_details,
  transactions
} from "@reeba/common"

const schema: FastifySchema = {
  params: GetMyTicketsRequestParamsSchema,
  response: {
    200: GetMyTicketsReplySchema
  }
}

export default async (
  instance: FastifyInstance,
  _: FastifyPluginOptions
): Promise<void> => {
  instance.get<{ Params: GetMyTicketsRequestParams; Reply: GetMyTicketsReply }>(
    "/:username/tickets",
    {
      schema,
      onRequest: [instance.authenticate],
      preValidation: (request, reply) => {
        const { username } = request.params

        if (username == null || username === "") {
          void reply.code(400)
          throw new Error("params should have required property 'username'")
        }
      },
      config: {
        name: "GetMyTickets"
      }
    },
    async request => {
      const { username } = request.params

      type EventIdsThatUsersWentTo = Pick<
        events,
        | "event_id"
        | "event_name"
        | "event_venue_name"
        | "user_username"
        | "event_status"
      > &
        Omit<event_datetimes, "event_id"> &
        Pick<transactions, "transaction_id"> &
        Pick<transaction_details, "event_seat_id"> &
        Omit<event_seats, "event_seat_id" | "event_section_id"> &
        Pick<
          event_sections,
          | "event_section_id"
          | "event_section_row_position"
          | "event_section_column_position"
        >

      const eventIdsThatUsersWentTo = await instance.pg.query<
        EventIdsThatUsersWentTo,
        [events["user_username"]]
      >(
        `select
          events.event_id,
          events.event_name,
          events.event_venue_name,
          events.event_status,
          events.user_username,
          event_datetimes.event_datetime_id,
          event_datetimes.event_start_datetime,
          event_datetimes.event_end_datetime,
          transactions.transaction_id,
          transaction_details.event_seat_id,
          event_seats.event_seat_price,
          event_seats.event_seat_row_position,
          event_seats.event_seat_column_position,
          event_sections.event_section_id,
          event_sections.event_section_row_position,
          event_sections.event_section_column_position
        from "transaction_details"
        inner join "transactions" on transaction_details.transaction_id = transactions.transaction_id
        inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        where transactions.user_username = $1`,
        [username]
      )

      const groupedByEventId = Object.values(
        groupBy(eventIdsThatUsersWentTo.rows, e => e.event_id)
      ).map(eventGroup => {
        return {
          id: eventGroup[0].event_id,
          username: eventGroup[0].user_username,
          transactionId: eventGroup[0].transaction_id,
          name: eventGroup[0].event_name,
          status: eventGroup[0].event_status,
          venueName: eventGroup[0].event_venue_name,
          time: {
            id: eventGroup[0].event_datetime_id,
            start: dayjs(eventGroup[0].event_start_datetime).toISOString(),
            end: dayjs(eventGroup[0].event_end_datetime).toISOString()
          },
          seats: eventGroup.map(eg => {
            return {
              id: eg.event_seat_id,
              name: `${numberToLetters(eg.event_seat_row_position)}${eg.event_seat_column_position + 1}`,
              rowPosition: eg.event_seat_row_position,
              columnPosition: eg.event_seat_column_position
            }
          }),
          section: {
            id: eventGroup[0].event_section_id,
            name: `${numberToLetters(eventGroup[0].event_section_row_position)}${eventGroup[0].event_section_column_position + 1}`,
            rowPosition: eventGroup[0].event_section_row_position,
            columnPosition: eventGroup[0].event_section_column_position
          },
          totalPrice: eventGroup.reduce(
            (total, current) => current.event_seat_price + total,
            0
          )
        }
      })

      return {
        events: groupedByEventId
      }
    }
  )
}
