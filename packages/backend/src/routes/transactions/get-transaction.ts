import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import { event_datetimes, event_sections, events, transactions } from '@reeba/common'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: { transactionId: string } }>(
    '/:transactionId',
    async (request) => {
      type GetTransaction = transactions &
      Pick<events, 'event_venue_name' | 'event_venue_country_code_alpha_2'> &
      Pick<event_datetimes, 'event_start_datetime'> &
      Pick<event_sections, 'event_section_row_position' | 'event_section_column_position'> &
      {
        seat_detail: Array<{ f1: number, f2: number, f3: number }>
      }

      const transaction = await instance.pg.query<GetTransaction, [string]>(
        `select
          transactions.*,
          events.event_venue_name,
          events.event_venue_country_code_alpha_2,
          event_datetimes.event_start_datetime,
          event_sections.event_section_row_position,
          event_sections.event_section_column_position,
          array_agg(
            row_to_json(
              row(
                event_seats.event_seat_price,
                event_seats.event_seat_row_position,
                event_seats.event_seat_column_position
              )
            )
          ) as seat_detail
        from "transactions"
        inner join "transaction_details" on transactions.transaction_id = transaction_details.transaction_id
        inner join "event_seats" on transaction_details.event_seat_id = event_seats.event_seat_id
        inner join "event_sections" on event_seats.event_section_id = event_sections.event_section_id
        inner join "event_datetimes" on event_sections.event_datetime_id = event_datetimes.event_datetime_id
        inner join "events" on event_datetimes.event_id = events.event_id
        where transactions.transaction_id = $1
        group by
          transactions.transaction_id,
          transactions.transaction_time,
          events.event_venue_name,
          events.event_venue_country_code_alpha_2,
          event_datetimes.event_start_datetime,
          event_sections.event_section_row_position,
          event_sections.event_section_column_position`,
        [request.params.transactionId]
      )

      if (transaction.rowCount > 1) {
        throw new Error('what?')
      }

      return {
        transactionId: transaction.rows[0].transaction_id,
        time: dayjs(transaction.rows[0].transaction_time).toISOString(),
        venueName: transaction.rows[0].event_venue_name,
        firstStartDatetime: dayjs(transaction.rows[0].event_start_datetime),
        sectionRowPosition: transaction.rows[0].event_section_row_position,
        sectionColumnPosition: transaction.rows[0].event_section_column_position,
        seatDetail: transaction.rows[0].seat_detail.map(s => {
          return {
            seatPrice: s.f1,
            seatRowPosition: s.f2,
            seatColumnPosition: s.f3
          }
        })
      }
    }
  )
}