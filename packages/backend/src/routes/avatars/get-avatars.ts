import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { GetAvatarsParams, GetAvatarsParamsSchema, users } from '@reeba/common'

const schema: FastifySchema = {
  params: GetAvatarsParamsSchema
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Params: GetAvatarsParams }>(
    '/:username',
    { schema },
    async (request, reply) => {
      const { username } = request.params

      void reply.header('Cross-Origin-Resource-Policy', 'cross-origin')

      if (username == null || username === '') {
        return await reply.sendFile('default-user-profile.png')
      }

      const imagePath = await instance.pg.query<Pick<users, 'user_image_profile_path'>, [users['user_username']]>(
        'select user_image_profile_path from users where user_username = $1',
        [username]
      )

      if (imagePath.rowCount === 0) {
        return await reply.sendFile('default-user-profile.png')
      }

      if (imagePath.rows[0].user_image_profile_path === '') {
        return await reply.sendFile('default-user-profile.png')
      }

      return await reply.sendFile(imagePath.rows[0].user_image_profile_path)
    }
  )
}
