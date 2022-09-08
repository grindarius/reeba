import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

import accountsRoute from './accounts/index.js'
import adminRoute from './admin/index.js'
import authRoute from './auth/index.js'
import avatarRoute from './avatars/index.js'
import eventImagesRoute from './event-images/index.js'
import eventsRoute from './events/index.js'
import followingsRoute from './followings/index.js'
import searchRoute from './search/index.js'
import transactionsRoute from './transactions/index.js'
import usersRoute from './users/index.js'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.all(
    '/',
    {
      config: {
        name: 'GetContactInfo'
      }
    },
    async () => {
      return {
        author: 'Bhattarapong Somwong',
        description: 'Please contact bhattarapongs62@nu.ac.th for contrubition.'
      }
    }
  )

  await instance.register(accountsRoute, { prefix: '/accounts' })
  await instance.register(adminRoute, { prefix: '/admin' })
  await instance.register(authRoute, { prefix: '/auth' })
  await instance.register(avatarRoute, { prefix: '/avatars' })
  await instance.register(eventImagesRoute, { prefix: '/event-images' })
  await instance.register(eventsRoute, { prefix: '/events' })
  await instance.register(followingsRoute, { prefix: '/followings' })
  await instance.register(searchRoute, { prefix: '/search' })
  await instance.register(transactionsRoute, { prefix: '/transactions' })
  await instance.register(usersRoute, { prefix: '/users' })
}
