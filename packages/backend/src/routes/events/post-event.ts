import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { nanoid } from 'nanoid'

import {
  BadRequestReplySchema,
  event_datetimes,
  event_seats,
  event_sections,
  event_tags,
  event_tags_bridge,
  events,
  PostEventBody,
  PostEventBodySchema,
  PostEventReply,
  PostEventReplySchema,
  t_event_status
} from '@reeba/common'

dayjs.extend(customParseFormat)

const schema: FastifySchema = {
  body: PostEventBodySchema,
  response: {
    200: PostEventReplySchema,
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: PostEventBody, Response: PostEventReply }>(
    '/',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async (request, reply) => {
        const {
          eventName,
          createdBy,
          description,
          website,
          venueName,
          venueCoordinates,
          openingDate,
          tags,
          ticketPrices,
          datetimes,
          minimumAge,
          sections
        } = request.body

        if (eventName == null || eventName === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventName\'')
        }

        if (createdBy == null || createdBy === '') {
          void reply.code(400)
          throw new Error('body should have required property \'createdBy\'')
        }

        if (description == null) {
          void reply.code(400)
          throw new Error('body should have required property \'description\'')
        }

        if (website == null) {
          void reply.code(400)
          throw new Error('body should have required property \'website\'')
        }

        if (venueName == null || venueName === '') {
          void reply.code(400)
          throw new Error('body should have required property \'venueName\'')
        }

        if (venueCoordinates == null) {
          void reply.code(400)
          throw new Error('body should have required property \'eventVenuCoordinates\'')
        }

        if (typeof venueCoordinates.x !== 'string') {
          void reply.code(400)
          throw new Error('venueCoordinates.x should be type of \'string\'')
        }

        if (typeof venueCoordinates.y !== 'string') {
          void reply.code(400)
          throw new Error('venueCoordinates.y should be type of \'string\'')
        }

        if (openingDate == null || openingDate === '') {
          void reply.code(400)
          throw new Error('body should have required property \'openingDate\'')
        }

        if (tags == null || !Array.isArray(tags)) {
          void reply.code(400)
          throw new Error('body should have required property \'tags\'')
        }

        if (ticketPrices == null || !Array.isArray(ticketPrices) || ticketPrices.length === 0) {
          void reply.code(400)
          throw new Error('body should have required property \'ticketPrices\'')
        }

        if (datetimes == null || !Array.isArray(datetimes) || datetimes.length === 0) {
          void reply.code(400)
          throw new Error('body should have required property \'datetimes\'')
        }

        if (datetimes.some(dt => dt.start === '' || dt.end === '')) {
          void reply.code(400)
          throw new Error('body should have required property \'datetimes\'')
        }

        if (minimumAge == null || minimumAge < 0) {
          void reply.code(400)
          throw new Error('body should have required property \'minimumAge\'')
        }

        if (sections == null || !Array.isArray(sections) || sections.length === 0 || sections[0].length === 0) {
          void reply.code(400)
          throw new Error('body should have required property \'sections\'')
        }
      }
    }, async (request) => {
      const {
        createdBy,
        eventName,
        description,
        website,
        venueName,
        venueCoordinates,
        openingDate,
        ticketPrices,
        minimumAge,
        sections,
        datetimes,
        tags
      } = request.body

      type InsertEvent = [
        events['event_id'],
        events['user_username'],
        events['event_name'],
        events['event_description'],
        events['event_website'],
        events['event_venue_name'],
        string,
        events['event_creation_date'],
        events['event_opening_date'],
        events['event_status'],
        events['event_ticket_prices'],
        events['event_minimum_age']
      ]

      const eventId = await instance.pg.query<Pick<events, 'event_id'>, InsertEvent>(
        `insert into events (
          event_id,
          user_username,
          event_name,
          event_description,
          event_website,
          event_venue_name,
          event_venue_coordinates,
          event_creation_date,
          event_opening_date,
          event_status,
          event_ticket_prices,
          event_minimum_age
        ) values ($1, $2, $3, $4, $5, $6, $7::point, $8, $9, $10, $11::jsonb, $12) returning event_id`,
        [
          nanoid(),
          createdBy,
          eventName,
          description,
          website,
          venueName,
          `${venueCoordinates.x}, ${venueCoordinates.y}`,
          dayjs().format('YYYY-MM-DD HH:mm:ss.SSS Z'),
          openingDate,
          t_event_status.open,
          ticketPrices.reduce<Record<string, number>>((obj, item) => {
            obj[item.color] = item.price
            return obj
          }, {}),
          minimumAge
        ]
      )

      // * insert newly created tags from user
      // TODO @grindarius: may need string normalization before this could be executed.
      for await (const tag of tags) {
        await instance.pg.query<event_tags, [event_tags['event_tag_label']]>(
          'insert into event_tags (event_tag_label) values ($1) on conflict (event_tag_label) do nothing',
          [tag]
        )
      }

      // * insert the actual tag from the event
      for await (const tag of tags) {
        await instance.pg.query<event_tags_bridge, [event_tags_bridge['event_tag_label'], event_tags_bridge['event_id']]>(
          'insert into event_tags_bridge (event_tag_label, event_id) values ($1, $2)',
          [tag, eventId.rows[0].event_id]
        )
      }

      type InsertDatetimes = [
        event_datetimes['event_datetime_id'],
        event_datetimes['event_id'],
        event_datetimes['event_start_datetime'],
        event_datetimes['event_end_datetime']
      ]

      type InsertSection = [
        event_sections['event_section_id'],
        event_sections['event_datetime_id'],
        event_sections['event_section_row_position'],
        event_sections['event_section_column_position']
      ]

      type InsertSeat = [
        event_seats['event_seat_id'],
        event_seats['event_section_id'],
        event_seats['event_seat_price'],
        event_seats['event_seat_row_position'],
        event_seats['event_seat_column_position']
      ]

      // * insert each datetime of an event.
      for await (const datetime of datetimes) {
        const datetimeId = await instance.pg.query<Pick<event_datetimes, 'event_datetime_id'>, InsertDatetimes>(
          'insert into event_datetimes (event_datetime_id, event_id, event_start_datetime, event_end_datetime) values ($1, $2, $3, $4) returning event_datetime_id',
          [nanoid(), eventId.rows[0].event_id, datetime.start, datetime.end]
        )

        // * insert each section of each datetime
        for await (const sectionRow of sections) {
          for await (const section of sectionRow) {
            const sectionId = await instance.pg.query<Pick<event_sections, 'event_section_id'>, InsertSection>(
              'insert into event_sections (event_section_id, event_datetime_id, event_section_row_position, event_section_column_position) values ($1, $2, $3, $4) returning event_section_id',
              [nanoid(), datetimeId.rows[0].event_datetime_id, section.sectionRowPosition, section.sectionColumnPosition]
            )

            // * insert each chair of each section of each datetime
            for await (const seatRow of section.seats) {
              for await (const seat of seatRow) {
                await instance.pg.query<event_seats, InsertSeat>(
                  'insert into event_seats (event_seat_id, event_section_id, event_seat_price, event_seat_row_position, event_seat_column_position) values ($1, $2, $3, $4, $5)',
                  [nanoid(), sectionId.rows[0].event_section_id, seat.seatPrice, seat.seatRowPosition, seat.seatColumnPosition]
                )
              }
            }
          }
        }
      }

      return {
        eventId: eventId.rows[0].event_id
      }
    }
  )
}
