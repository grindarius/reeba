import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import authRoute from './auth'
import avatarRoute from './avatars'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.all('/', async () => {
    return {
      author: 'Bhattarapong Somwong',
      description: 'Please contact bhattarapongs62@nu.ac.th for contrubition.'
    }
  })

  void instance.register(authRoute, { prefix: '/auth' })
  void instance.register(avatarRoute, { prefix: '/avatars' })
}
