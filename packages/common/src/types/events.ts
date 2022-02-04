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
  eventTicketPrices: Type.Array(Type.Object({
    color: Type.String(),
    price: Type.Number()
  })),
  eventMinimumAge: Type.Number(),
  sections: Type.Array(Type.Array(Type.Object({
    sectionRowPosition: Type.Number(),
    sectionColumnPosition: Type.Number(),
    seats: Type.Array(Type.Array(Type.Object({
      seatRowPosition: Type.Number(),
      seatColumnPosition: Type.Number(),
      seatPrice: Type.Number()
    })))
  })))
})
export type PostEventsBody = Static<typeof PostEventsBodySchema>
