import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import postEventRoute from './post-event'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(postEventRoute)
}
