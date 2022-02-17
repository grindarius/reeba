import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getIndividualEventRoute from './get-individual-event'
import postEventRoute from './post-event'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(postEventRoute)
  void instance.register(getIndividualEventRoute)
}
