import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  BadRequestReplySchema,
  PostEventsBody,
  PostEventsBodySchema
} from '@reeba/common'

const schema: FastifySchema = {
  body: PostEventsBodySchema,
  response: {
    400: BadRequestReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: PostEventsBody }>(
    'event',
    {
      schema,
      preValidation: async (request, reply) => {
        const { username, eventName, eventDescription, eventWebSite, eventVenueName, eventOpeningDate } = request.body

        if (username == null || username === '') {
          void reply.code(400)
          throw new Error('body should have required property \'username\'')
        }

        if (eventName == null || eventName === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventName\'')
        }

        if (eventDescription == null || eventDescription === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventDescription\'')
        }

        if (eventWebSite == null || eventWebSite === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventWebSite\'')
        }

        if (eventVenueName == null || eventVenueName === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventVenueName\'')
        }

        if (eventOpeningDate == null || eventOpeningDate === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventOpeningDate\'')
        }
      }
    }, async (request, reply) => {
      const { username, eventName, eventDescription, eventWebSite, eventVenueName, eventOpeningDate } = request.body
    }
  )
}
