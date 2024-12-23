import dayjs from "dayjs"
import { FastifyInstance, FastifyPluginOptions } from "fastify"

import {
  event_datetimes,
  event_sections,
  GetOrganizerEventOrdersReply,
  GetOrganizerEventOrdersReplySchema,
  GetOrganizerEventOrdersRequestParams,
  GetOrganizerEventOrdersRequestParamsSchema,
  numberToLetters,
  transactions,
  users
} from "@reeba/common"

type Transactions = transactions &
  Pick<users, "user_phone_number" | "user_phone_country_code" | "user_email"> &
  Omit<event_sections, "event_datetime_id"> &
  Pick<event_datetimes, "event_datetime_id" | "event_start_datetime"> & {
    seat_detail: Array<{
      f1: string
      f2: number
      f3: number
      f4: number
    }>
  }

export default async (
  instance: FastifyInstance,
  _: FastifyPluginOptions
): Promise<void> => {
  instance.get<{
    Params: GetOrganizerEventOrdersRequestParams
    Reply: GetOrganizerEventOrdersReply
  }>(
    "/:username/organizer/:eventId/orders",
    {
      schema: {
        params: GetOrganizerEventOrdersRequestParamsSchema,
        response: {
          200: GetOrganizerEventOrdersReplySchema
        }
      },
      onRequest: [instance.authenticate],
      config: {
        name: "GetOrganizerEventOrders"
      }
    },
    async request => {
      const { eventId } = request.params

      const transactions = await instance.pg.query<Transactions, [string]>(
        `select
          transactions.*,
          users.user_email,
          users.user_phone_number,
          users.user_phone_country_code,
          event_sections.event_section_row_position,
          event_sections.event_section_column_position,
          event_sections.event_section_id,
          event_datetimes.event_datetime_id,
          event_datetimes.event_start_datetime,
          array_agg(
            row_to_json(
              row(
                event_seats.event_seat_id,
                event_seats.event_seat_price::int,
                event_seats.event_seat_row_position::int,
                event_seats.event_seat_column_position::int
              )
            )
          ) as seat_detail
        from "transactions"
        inner join "users" on transactions.user_username = users.user_username
        inner join "transaction_details" on transactions.transaction_id = transaction_details.transaction_id
        inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        where events.event_id = $1
        group by
          transactions.transaction_id,
          users.user_email,
          users.user_phone_number,
          users.user_phone_country_code,
          event_sections.event_section_row_position,
          event_sections.event_section_column_position,
          event_sections.event_section_id,
          event_datetimes.event_datetime_id,
          event_datetimes.event_start_datetime`,
        [eventId]
      )

      return {
        transactions: transactions.rows.map(t => {
          return {
            transactionId: t.transaction_id,
            username: t.user_username,
            email: t.user_email,
            phoneNumber: t.user_phone_number,
            phoneCountryCode: t.user_phone_country_code,
            transactionTime: dayjs(t.transaction_time).toISOString(),
            datetimeId: t.event_datetime_id,
            startDatetime: dayjs(t.event_start_datetime).toISOString(),
            sectionId: t.event_section_id,
            sectionName: `${numberToLetters(t.event_section_row_position)}${t.event_section_column_position + 1}`,
            sectionRowPosition: t.event_section_row_position,
            sectionColumnPosition: t.event_section_column_position,
            seats: t.seat_detail.map(s => {
              return {
                seatId: s.f1,
                seatName: `${numberToLetters(s.f3)}${s.f4 + 1}`
              }
            }),
            totalPrice: t.seat_detail.reduce(
              (total, current) => current.f2 + total,
              0
            )
          }
        })
      }
    }
  )
}
