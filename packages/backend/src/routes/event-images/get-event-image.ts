import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  events,
  GetEventImageRequestParams,
  GetEventImageRequestParamsSchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: GetEventImageRequestParamsSchema
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.setNotFoundHandler(async (_, reply) => {
    await reply.sendFile('default-event-image.png')
  })

  instance.get<{ Params: GetEventImageRequestParams }>(
    '/:eventId',
    {
      schema,
      config: {
        name: 'GetEventImage'
      }
    },
    async (request, reply) => {
      const { eventId } = request.params

      void reply.header('Cross-Origin-Resource-Policy', 'cross-origin')

      if (eventId == null || eventId === '') {
        return await reply.sendFile('default-event-image.png')
      }

      const eventImagePath = await instance.pg.query<Pick<events, 'event_cover_image_path'>, [events['event_id']]>(
        'select event_cover_image_path from events where event_id = $1',
        [eventId]
      )

      if (eventImagePath.rowCount === 0) {
        return await reply.sendFile('default-event-image.png')
      }

      if (eventImagePath.rows[0].event_cover_image_path === '') {
        return await reply.sendFile('default-event-image.png')
      }

      return await reply.sendFile(eventImagePath.rows[0].event_cover_image_path)
    }
  )
}
