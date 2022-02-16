import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getEventsRoute from './get-events'
import getIndividualEventRoute from './get-individual-event'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getEventsRoute)
  void instance.register(getIndividualEventRoute)
}
