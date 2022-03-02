import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getUserRoute from './get-user'
import getUserRelatedEventsRoute from './get-user-related-events'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getUserRoute)
  void instance.register(getUserRelatedEventsRoute)
}
