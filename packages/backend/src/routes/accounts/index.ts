import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getMyTicketsRoute from './get-my-tickets'
import getOrganizerDataRoute from './get-organizer-data'
import getProfileDataRoute from './get-profile-data'
import patchProfileDataRoute from './patch-profile-data'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getMyTicketsRoute)
  void instance.register(getOrganizerDataRoute)
  void instance.register(getProfileDataRoute)
  void instance.register(patchProfileDataRoute)
}
