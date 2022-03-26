import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import postFollowRoute from './post-follow'
import postUnfollowRoute from './post-unfollow'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(postFollowRoute)
  void instance.register(postUnfollowRoute)
}
