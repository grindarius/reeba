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
export const RootPageEventSchema = Type.Object({
  coverImagePath: Type.String(),
  name: Type.String(),
  firstDatetime: Type.String(),
  venueName: Type.String()
})
export type RootPageEvent = Static<typeof RootPageEventSchema>

export const GetEventsReplySchema = Type.Object({
  official: Type.Array(RootPageEventSchema),
  local: Type.Array(RootPageEventSchema)
})
export type GetEventsReply = Static<typeof GetEventsReplySchema>

export const GetIndividualEventReplySchema = Type.Object({
  name: Type.String(),
  createdBy: Type.String(),
  description: Type.String(),
  website: Type.String(),
  venueName: Type.String(),
  venueCoordinates: Type.Object({
    x: Type.String(),
    y: Type.String()
  }),
  openingDate: Type.String(),
  prices: Type.Array(Type.Object({
    color: Type.String(),
    value: Type.Number()
  })),
  tags: Type.Array(Type.String()),
  datetimes: Type.Array(Type.Object({
    from: Type.String(),
    to: Type.String()
  }))
})
export type GetIndividualEventReply = Static<typeof GetIndividualEventReplySchema>
