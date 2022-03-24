import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getUserRoute from './get-user'
import getUserRelatedEventsRoute from './get-user-related-events'
import postFollowRoute from './post-follow'
import postUnfollowRoute from './post-unfollow'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getUserRoute)
  void instance.register(getUserRelatedEventsRoute)
  void instance.register(postFollowRoute)
  void instance.register(postUnfollowRoute)
}
