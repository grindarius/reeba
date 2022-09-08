import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getUserRoute from './get-user.js'
import getUserFollowersRoute from './get-user-followers.js'
import getFollowingRoute from './get-user-following.js'
import getUserRelatedEventsRoute from './get-user-related-events.js'
import manipulateAdminRoute from './manipulate-admin.js'
import manipulateVerificationRoute from './manipulate-verification.js'
import patchUserProfileSettingsRoute from './patch-user-profile-settings.js'
import removeUserRoute from './remove-user.js'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  await instance.register(getUserRoute)
  await instance.register(getUserFollowersRoute)
  await instance.register(getFollowingRoute)
  await instance.register(getUserRelatedEventsRoute)
  await instance.register(manipulateAdminRoute)
  await instance.register(manipulateVerificationRoute)
  await instance.register(patchUserProfileSettingsRoute)
  await instance.register(removeUserRoute)
}
