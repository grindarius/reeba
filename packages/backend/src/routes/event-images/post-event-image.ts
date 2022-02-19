import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { nanoid } from 'nanoid'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { pipeline as pump } from 'node:stream/promises'

import {
  BadRequestReplySchema,
  events,
  getFileExtension,
  NotFoundReplySchema,
  PostEventImageParams,
  PostEventImageParamsSchema,
  PostEventImageReplyBodySchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: PostEventImageParamsSchema,
  response: {
    200: PostEventImageReplyBodySchema,
    400: BadRequestReplySchema,
    404: NotFoundReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Params: PostEventImageParams }>(
    '/:eventId',
    { schema },
    async (request, reply) => {
      const { eventId } = request.params

      if (eventId == null || eventId === '') {
        void reply.code(400)
        throw new Error('params should have required property \'eventId\'')
      }

      const eventImagePath = await instance.pg.query<Pick<events, 'event_cover_image_path'>, [events['event_id']]>(
        'select event_cover_image_path from events where event_id = $1',
        [eventId]
      )

      if (eventImagePath.rowCount === 0) {
        void reply.code(404)
        throw new Error('eventImagePath not found')
      }

      const data = await request.file()

      try {
        const fileExtension = getFileExtension(data.filename)
        const filename = `${nanoid()}.${fileExtension}`

        await pump(data.file, createWriteStream(resolve(__dirname, '..', '..', '..', 'uploads', filename)))

        await instance.pg.query(
          'update events set event_cover_image_path = $1 where user_username = $2',
          [filename, eventId]
        )
        return {
          message: 'complete'
        }
      } catch (error) {
        void reply.code(400)
        throw new Error((error as Error).message)
      }
    }
  )
}
