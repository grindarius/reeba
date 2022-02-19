import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getEventImageRoute from './get-event-image'
import postEventImageRoute from './post-event-image'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getEventImageRoute)
  void instance.register(postEventImageRoute)
}
