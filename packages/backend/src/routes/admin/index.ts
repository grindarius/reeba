import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getAdminEventsDataRoute from './get-admin-events-data'
import getAdminTransactionsDataRoute from './get-admin-transaction-data'
import getAdminUsersDataRoute from './get-admin-user-data'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getAdminEventsDataRoute)
  void instance.register(getAdminTransactionsDataRoute)
  void instance.register(getAdminUsersDataRoute)
}
