import { FastifyInstance, FastifyPluginOptions } from "fastify"

import getEventSeatsRoute from "./get-event-seats"
import getEventsRoute from "./get-events"
import getIndividualEventRoute from "./get-individual-event"
import manipulateEventRoute from "./manipulate-event"
import manipulateEventDataRoute from "./manipulate-event-data"
import postEventRoute from "./post-event"

export default async (
  instance: FastifyInstance,
  _: FastifyPluginOptions
): Promise<void> => {
  void instance.register(getEventSeatsRoute)
  void instance.register(getEventsRoute)
  void instance.register(getIndividualEventRoute)
  void instance.register(manipulateEventRoute)
  void instance.register(manipulateEventDataRoute)
  void instance.register(postEventRoute)
}
