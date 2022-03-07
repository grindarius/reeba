import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getSearchRoute from './get-search'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getSearchRoute)
}
