import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getSearchResultRoute from './get-search-result'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getSearchResultRoute)
}
