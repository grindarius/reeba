import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import authRoute from './auth'
import avatarRoute from './avatars'
import eventImagesRoute from './event-images'
import eventsRoute from './events'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.all('/', async () => {
    return {
      author: 'Bhattarapong Somwong',
      description: 'Please contact bhattarapongs62@nu.ac.th for contrubition.'
    }
  })

  void instance.register(authRoute, { prefix: '/auth' })
  void instance.register(avatarRoute, { prefix: '/avatars' })
  void instance.register(eventsRoute, { prefix: '/events' })
  void instance.register(eventImagesRoute, { prefix: '/event-images' })
}
