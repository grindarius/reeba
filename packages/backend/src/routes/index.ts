import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import accountsRoute from './accounts'
import adminRoute from './admin'
import authRoute from './auth'
import avatarRoute from './avatars'
import eventImagesRoute from './event-images'
import eventsRoute from './events'
import followersRoute from './followers'
import followingsRoute from './followings'
import searchRoute from './search'
import transactionsRoute from './transactions'
import usersRoute from './users'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.all('/', async () => {
    return {
      author: 'Bhattarapong Somwong',
      description: 'Please contact bhattarapongs62@nu.ac.th for contrubition.'
    }
  })

  void instance.register(accountsRoute, { prefix: '/accounts' })
  void instance.register(adminRoute, { prefix: '/admin' })
  void instance.register(authRoute, { prefix: '/auth' })
  void instance.register(avatarRoute, { prefix: '/avatars' })
  void instance.register(eventImagesRoute, { prefix: '/event-images' })
  void instance.register(eventsRoute, { prefix: '/events' })
  void instance.register(followersRoute, { prefix: '/followers' })
  void instance.register(followingsRoute, { prefix: '/followings' })
  void instance.register(searchRoute, { prefix: '/search' })
  void instance.register(transactionsRoute, { prefix: '/transactions' })
  void instance.register(usersRoute, { prefix: '/users' })
}
