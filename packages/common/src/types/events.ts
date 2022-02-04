import { Static, Type } from '@sinclair/typebox'

export const PostEventsBodySchema = Type.Object({
  username: Type.String(),
  eventName: Type.String(),
  eventDescription: Type.String(),
  eventWebSite: Type.String(),
  eventVenueName: Type.String(),
  eventVenueCoordinates: Type.Object({
    x: Type.Number(),
    y: Type.Number()
  }),
  eventOpeningDate: Type.String(),
  event
})
