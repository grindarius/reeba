import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  PostTransactionRequestBody,
  PostTransactionRequestBodySchema
} from '@reeba/common'

const schema: FastifySchema = {
  body: PostTransactionRequestBodySchema
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: PostTransactionRequestBody }>(
    '/',
    {
      schema,
      onRequest: instance.authenticate,
      preValidation: async (request, reply) => {
        const { eventId, datetimeId, sectionId, seatIds } = request.body

        if (eventId == null || eventId === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventId\'')
        }

        if (datetimeId == null || datetimeId === '') {
          void reply.code(400)
          throw new Error('body should have required property \'datetimeId\'')
        }

        if (sectionId == null || sectionId === '') {
          void reply.code(400)
          throw new Error('body should have required property \'sectionId\'')
        }

        if (seatIds == null) {
          void reply.code(400)
          throw new Error('body should have required property \'seatIds\'')
        }

        if (!Array.isArray(seatIds)) {
          void reply.code(400)
          throw new Error('wrong \'seatIds\' format')
        }

        if (seatIds.length === 0) {
          void reply.code(400)
          throw new Error('body should have required property \'seatIds\'')
        }
      }
    },
    async (request, reply) => {
      const { eventId, datetimeId, sectionId, seatIds } = request.body

      

      return {
        hello: 'world'
      }
    }
  )
}
