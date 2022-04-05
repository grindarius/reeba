import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getFollowRoute from './get-follow'
import postFollowRoute from './post-follow'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(postFollowRoute)
  void instance.register(getFollowRoute)
}
