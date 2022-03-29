import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getAdminTransactionsDataRoute from './get-admin-transaction-data'
import getAdminUsersDataRoute from './get-admin-user-data'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getAdminTransactionsDataRoute)
  void instance.register(getAdminUsersDataRoute)
}
