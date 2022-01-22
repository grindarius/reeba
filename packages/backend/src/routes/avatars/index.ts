import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'

import { GetAvatarsParams, GetAvatarsParamsSchema, users } from '@reeba/common'

const pump = promisify(pipeline)

const schema: FastifySchema = {
  params: GetAvatarsParamsSchema
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetAvatarsParams }>(
    '/:username',
    { schema },
    async (request, reply) => {
      const { username } = request.params

      if (username == null || username === '') {
        return await reply.sendFile('/uploads/default-user-profile.png')
      }

      const imagePath = await instance.pg.query<Pick<users, 'user_image_profile_path'>, [users['user_username']]>(
        'select user_image_profile_path from users where user_username = $1',
        [username]
      )

      if (imagePath.rows.length === 0) {
        return await reply.sendFile('/uploads/default-user-profile.png')
      }

      return await reply.sendFile('/uploads/' + imagePath.rows[0].user_image_profile_path)
    }
  )

  instance.post('/', async (request, _) => {
    const data = await request.file()

    await pump(data.file, createWriteStream(`./uploads/${data.filename}`))

    return {
      message: 'post avatar'
    }
  })
}
