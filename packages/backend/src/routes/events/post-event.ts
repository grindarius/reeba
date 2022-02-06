import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  PostEventBody,
  PostEventBodySchema
} from '@reeba/common'

const schema: FastifySchema = {
  body: PostEventBodySchema,
  response: {
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: PostEventBody }>(
    '/',
    {
      schema,
      preValidation: async (request, reply) => {
        const { username, eventName, eventDescription, eventWebsite, eventVenueName, eventVenueCoordinates, eventOpeningDate, eventTicketPrices, eventMinimumAge } = request.body

        if (username == null || username === '') {
          void reply.code(400)
          throw new Error('body should have required property \'username\'')
        }

        if (eventName == null || eventName === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventName\'')
        }

        if (eventDescription == null) {
          void reply.code(400)
          throw new Error('body should have required property \'eventDescription\'')
        }

        if (eventWebsite == null) {
          void reply.code(400)
          throw new Error('body should have required property \'eventWebSite\'')
        }

        if (eventVenueName == null || eventVenueName === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventVenueName\'')
        }

        if (eventVenueCoordinates == null) {
          void reply.code(400)
          throw new Error('body should have required property \'eventVenuCoordinates\'')
        }

        if (eventOpeningDate == null || eventOpeningDate === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventOpeningDate\'')
        }

        if (eventTicketPrices == null) {
          void reply.code(400)
          throw new Error('body should have required property \'eventTicketPrices\'')
        }

        if (eventMinimumAge == null || eventMinimumAge < 0) {
          void reply.code(400)
          throw new Error('body should have required property \'eventMinimumAge\'')
        }
      }
    }, async (request, reply) => {
      const { username, eventName, eventDescription, eventWebsite, eventVenueName, eventVenueCoordinates, eventOpeningDate, eventTicketPrices, eventMinimumAge } = request.body
    }
  )
}
