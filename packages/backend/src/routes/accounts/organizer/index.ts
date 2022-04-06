import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getOrganizerDataRoute from './get-organizer-data'
import getOrganizerUsersMapRoute from './get-organizer-users-map'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getOrganizerDataRoute)
  void instance.register(getOrganizerUsersMapRoute)
}
