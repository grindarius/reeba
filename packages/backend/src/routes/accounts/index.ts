import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getProfileDataRoute from './get-profile-data'
import patchProfileDataRoute from './patch-profile-data'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getProfileDataRoute)
  void instance.register(patchProfileDataRoute)
}
