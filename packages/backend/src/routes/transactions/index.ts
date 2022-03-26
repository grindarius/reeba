import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import postTransactionRoute from './post-transaction'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(postTransactionRoute)
}
