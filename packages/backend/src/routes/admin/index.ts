import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getAdminUsersRoute from './get-admin-data-users'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getAdminUsersRoute)
}
