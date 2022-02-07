import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getIndividualEventRoute from './get-individual-event'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getIndividualEventRoute)
}
