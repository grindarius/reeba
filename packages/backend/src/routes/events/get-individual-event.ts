import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  GetIndividualEventRequestParams,
  GetIndividualEventRequestParamsSchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetIndividualEventRequestParamsSchema
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetIndividualEventRequestParams }>(
    '/:eventId',
    {
      schema,
      preValidation: async (request, reply) => {
        const { eventId } = request.params

        if (eventId == null || eventId === '') {
          void reply.code(400)
          throw new Error('body should have required property \'eventId\'')
        }
      }
    },
    async (request) => {
      return {
        message: 'eventId is' + request.params.eventId
      }
    }
  )
}
