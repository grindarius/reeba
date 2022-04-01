import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getFollowersRoute from './get-followers'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getFollowersRoute)
}
