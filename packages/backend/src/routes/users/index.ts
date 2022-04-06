import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getUserRoute from './get-user'
import getUserFollowersRoute from './get-user-followers'
import getUserRelatedEventsRoute from './get-user-related-events'
import manipulateAdminRoute from './manipulate-admin'
import manipulateVerificationRoute from './manipulate-verification'
import removeUserRoute from './remove-user'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getUserRoute)
  void instance.register(getUserFollowersRoute)
  void instance.register(getUserRelatedEventsRoute)
  void instance.register(manipulateAdminRoute)
  void instance.register(manipulateVerificationRoute)
  void instance.register(removeUserRoute)
}
