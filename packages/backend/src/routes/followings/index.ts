import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import postFollowRoute from './post-follow'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(postFollowRoute)
}
