import { Static, Type } from '@sinclair/typebox'

export const PostEventBodySchema = Type.Object({
  eventName: Type.String(),
  createdBy: Type.String(),
  description: Type.String(),
  website: Type.String(),
  venueName: Type.String(),
  venueCoordinates: Type.Object({
    x: Type.String(),
    y: Type.String()
  }),
  openingDate: Type.String(),
  ticketPrices: Type.Array(Type.Object({
    color: Type.String(),
    price: Type.Number()
  })),
  datetimes: Type.Array(Type.Object({
    start: Type.String(),
    end: Type.String()
  })),
  minimumAge: Type.Number(),
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
export type PostEventBody = Static<typeof PostEventBodySchema>

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
