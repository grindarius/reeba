import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getEventsRoute from './get-events'
import getIndividualEventRoute from './get-individual-event'
import postEventRoute from './post-event'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getEventsRoute)
  void instance.register(getIndividualEventRoute)
  void instance.register(postEventRoute)
}
