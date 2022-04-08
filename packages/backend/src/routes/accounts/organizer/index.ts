import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getOrganizerDataRoute from './get-organizer-data'
import getOrganizerOrdersRoute from './get-organizer-orders'
import getOrganizerUsersMapRoute from './get-organizer-users-map'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getOrganizerDataRoute)
  void instance.register(getOrganizerOrdersRoute)
  void instance.register(getOrganizerUsersMapRoute)
}
