import { FastifyInstance, FastifyPluginOptions } from "fastify"

import {
  GetOrganizerEventUsersMapReply,
  GetOrganizerEventUsersMapReplySchema,
  GetOrganizerEventUsersMapRequestParams,
  GetOrganizerEventUsersMapRequestParamsSchema,
  users
} from "@reeba/common"

export default async (
  instance: FastifyInstance,
  _: FastifyPluginOptions
): Promise<void> => {
  instance.get<{
    Params: GetOrganizerEventUsersMapRequestParams
    Reply: GetOrganizerEventUsersMapReply
  }>(
    "/:username/organizer/:eventId/maps",
    {
      schema: {
        params: GetOrganizerEventUsersMapRequestParamsSchema,
        response: {
          200: GetOrganizerEventUsersMapReplySchema
        }
      },
      onRequest: [instance.authenticate],
      config: {
        name: "GetOrganizerEventUsersMap"
      }
    },
    async request => {
      const { eventId } = request.params

      const usersAndCountries = await instance.pg.query<
        Pick<users, "user_iso_31662_code"> & { user_count: number },
        [string]
      >(
        `select
          users.user_iso_31662_code,
          count(transactions.user_username)::int as user_count
        from "transactions"
        inner join "transaction_details" on transactions.transaction_id = transaction_details.transaction_id
        inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        inner join "users" on transactions.user_username = users.user_username
        where events.event_id = $1
        group by user_iso_31662_code`,
        [eventId]
      )

      return {
        users: usersAndCountries.rows.map(u => {
          return {
            country: u.user_iso_31662_code,
            amount: u.user_count
          }
        })
      }
    }
  )
}
