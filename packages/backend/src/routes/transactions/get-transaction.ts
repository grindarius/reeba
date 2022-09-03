import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'
import puppeteer from 'puppeteer'
import qrcode from 'qrcode'

import {
  event_datetimes,
  event_sections,
  events,
  GetTransactionPDFRequestParamsSchema,
  GetTransactionReply,
  GetTransactionReplySchema,
  GetTransactionRequestParams,
  GetTransactionRequestParamsSchema,
  numberToLetters,
  transactions
} from '@reeba/common'

type GetTransaction = transactions &
Pick<events, 'event_venue_name' | 'event_venue_country_code_alpha_2' | 'event_name'> &
Pick<event_datetimes, 'event_start_datetime'> &
Pick<event_sections, 'event_section_row_position' | 'event_section_column_position'> &
{
  seat_detail: Array<{ f1: number, f2: number, f3: number }>
}

/**
 * Reads a file path, gets the file, then return as base64 string
 *
 * @see https://stackoverflow.com/a/68562031/12386405
 * @param path image path from `path.join` or `path.resolve`
 */
const base64Encode = async (path: string): Promise<string> => {
  const chunks: Array<string> = []

  const file = createReadStream(path, { encoding: 'base64' })

  for await (const chunk of file) {
    chunks.push(chunk)
  }

  const base64 = chunks.join('')
  return base64
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetTransactionRequestParams, Reply: GetTransactionReply }>(
    '/:transactionId',
    {
      schema: {
        params: GetTransactionRequestParamsSchema,
        response: {
          200: GetTransactionReplySchema
        }
      },
      onRequest: [instance.authenticate],
      preValidation: (request, reply) => {
        if (request.params.transactionId == null || request.params.transactionId === '') {
          void reply.code(400)
          throw new Error('params should have required property \'transactionId\'')
        }
      },
      config: {
        name: 'GetTransaction'
      }
    },
    async (request, reply) => {
      const transaction = await instance.pg.query<GetTransaction, [string]>(
        `select
          transactions.*,
          events.event_name,
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
          transactions.user_username,
          events.event_name,
          events.event_venue_name,
          events.event_venue_country_code_alpha_2,
          event_datetimes.event_start_datetime,
          event_sections.event_section_row_position,
          event_sections.event_section_column_position`,
        [request.params.transactionId]
      )

      if (transaction.rowCount === 0) {
        void reply.code(404)
        throw new Error('transaction not found')
      }

      return {
        transactionId: transaction.rows[0].transaction_id,
        time: dayjs(transaction.rows[0].transaction_time).toISOString(),
        username: transaction.rows[0].user_username,
        eventName: transaction.rows[0].event_name,
        venueName: transaction.rows[0].event_venue_name,
        firstStartDatetime: dayjs(transaction.rows[0].event_start_datetime).toISOString(),
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

  instance.get<{ Params: GetTransactionRequestParams }>(
    '/:transactionId/pdf',
    {
      schema: {
        params: GetTransactionPDFRequestParamsSchema
      },
      config: {
        name: 'GetTransactionPDF'
      }
    },
    async (request, reply) => {
      const transaction = await instance.pg.query<GetTransaction, [string]>(
        `select
          transactions.*,
          events.event_name,
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
          transactions.user_username,
          events.event_name,
          events.event_venue_name,
          events.event_venue_country_code_alpha_2,
          event_datetimes.event_start_datetime,
          event_sections.event_section_row_position,
          event_sections.event_section_column_position`,
        [request.params.transactionId]
      )

      if (transaction.rowCount === 0) {
        void reply.code(404)
        throw new Error('transaction not found')
      }

      const browser = await puppeteer.launch()
      const page = await browser.newPage()

      const chunks: Array<string> = []

      const file = createReadStream(resolve(__dirname, '..', '..', '..', 'assets', 'invoice.html'), { encoding: 'utf-8' })

      for await (const chunk of file) {
        chunks.push(chunk)
      }

      let htmlString = chunks.join('')

      const numberFormat = Intl.NumberFormat('en')

      const qrcodeString = await qrcode.toString('http://localhost:3000/transactions/' + request.params.transactionId + '/pdf', {
        type: 'svg',
        width: 200
      })

      const logoImage = await base64Encode(resolve(__dirname, '..', '..', '..', 'assets', 'reeba-logo.png'))

      htmlString = htmlString.replace('$0', logoImage)
      htmlString = htmlString.replace('$1', qrcodeString)
      htmlString = htmlString.replace('$2', transaction.rows[0].user_username)
      htmlString = htmlString.replace('$3', dayjs().format('dddd D MMMM YYYY H:mm:ss'))
      htmlString = htmlString.replace('$4', transaction.rows[0].transaction_id)
      htmlString = htmlString.replace('$5', transaction.rows[0].seat_detail.map(s => {
        return `${numberToLetters(s.f2)}${s.f3 + 1}`
      }).join(', '))
      htmlString = htmlString.replace('$6', numberFormat.format(transaction.rows[0].seat_detail.reduce((t, c) => c.f1 + t, 0)))
      htmlString = htmlString.replace('$7', numberFormat.format(transaction.rows[0].seat_detail.reduce((t, c) => c.f1 + t, 0) + 45))

      await page.setContent(htmlString)

      const pdfBuffer = await page.pdf()

      await page.close()
      await browser.close()

      return await reply
        .header('Content-Disposition', `attachment; filename="invoice_${request.params.transactionId}.pdf"`)
        .type('application/pdf')
        .send(pdfBuffer)
    }
  )
}
