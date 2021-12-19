import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import authRoute from './login'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get('/', async () => {
    return {
      author: 'Bhattarapong Somwong',
      description: 'Please contact bhattarapongs62@nu.ac.th for contrubition.'
    }
  })

  void instance.register(authRoute, { prefix: '/auth' })
}
