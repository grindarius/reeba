import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { nanoid } from 'nanoid'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { pipeline as pump } from 'node:stream/promises'

import {
  BadRequestReplySchema,
  getFileExtension,
  NotFoundReplySchema,
  PostAvatarsParams,
  PostAvatarsParamsSchema,
  PostAvatarsReplyBodySchema,
  users
} from '@reeba/common'

const schema: FastifySchema = {
  params: PostAvatarsParamsSchema,
  response: {
    200: PostAvatarsReplyBodySchema,
    400: BadRequestReplySchema,
    404: NotFoundReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Params: PostAvatarsParams }>(
    '/:username',
    { schema },
    async (request, reply) => {
      const { username } = request.params

      if (username == null || username === '') {
        void reply.code(400)
        throw new Error('params should have required property \'username\'')
      }

      const user = await instance.pg.query<Pick<users, 'user_username'>, [users['user_username']]>(
        'select user_username from users where user_username = $1',
        [username]
      )

      if (user.rowCount === 0) {
        void reply.code(404)
        throw new Error('user not found')
      }

      const data = await request.file()

      try {
        const fileExtension = getFileExtension(data.filename)
        const filename = `${nanoid()}.${fileExtension}`

        await pump(data.file, createWriteStream(resolve(__dirname, '..', '..', '..', 'uploads', filename)))

        await instance.pg.query(
          'update users set user_image_profile_path = $1 where user_username = $2',
          [filename, username]
        )

        return {
          message: 'complete'
        }
      } catch (error) {
        void reply.code(400)
        throw new Error('unmatched file extension')
      }
    }
  )
}
