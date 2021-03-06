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
  tags: Type.Array(Type.String()),
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

export const PostEventReplySchema = Type.Object({
  eventId: Type.String()
})
export type PostEventReply = Static<typeof PostEventReplySchema>

export const RootPageEventSchema = Type.Object({
  username: Type.String(),
  id: Type.String(),
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

export const GetIndividualEventRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type GetIndividualEventRequestParams = Static<typeof GetIndividualEventRequestParamsSchema>

export const GetIndividualEventRequestQuerystringSchema = Type.Object({
  u: Type.String()
})
export type GetIndividualEventRequestQuerystring = Static<typeof GetIndividualEventRequestQuerystringSchema>

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
  ageLimit: Type.Number(),
  isCurrentUserAttended: Type.Boolean(),
  datetimes: Type.Array(Type.Object({
    datetimeId: Type.String(),
    start: Type.String(),
    end: Type.String()
  }))
})
export type GetIndividualEventReply = Static<typeof GetIndividualEventReplySchema>

export const GetEventImageRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type GetEventImageRequestParams = Static<typeof GetEventImageRequestParamsSchema>

export const PostEventImageParamsSchema = Type.Object({
  eventId: Type.String()
})
export type PostEventImageParams = Static<typeof PostEventImageParamsSchema>

export const PostEventImageReplySchema = Type.Object({
  message: Type.String()
})
export type PostEventImageReply = Static<typeof PostEventImageReplySchema>

export const GetEventSeatsRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type GetEventSeatsRequestParams = Static<typeof GetEventSeatsRequestParamsSchema>

export const GetEventSeatsRequestQuerystringSchema = Type.Object({
  datetimeId: Type.String()
})
export type GetEventSeatsRequestQuerystring = Static<typeof GetEventSeatsRequestQuerystringSchema>

export const GetEventSeatsReplySchema = Type.Object({
  sections: Type.Array(Type.Object({
    sectionId: Type.String(),
    sectionRowPosition: Type.Number(),
    sectionColumnPosition: Type.Number(),
    seatId: Type.String(),
    seatRowPosition: Type.Number(),
    seatColumnPosition: Type.Number(),
    seatPrice: Type.Number(),
    isSeatTaken: Type.Boolean()
  })),
  ticketPrices: Type.Array(Type.Object({
    color: Type.String(),
    price: Type.Number()
  }))
})
export type GetEventSeatsReply = Static<typeof GetEventSeatsReplySchema>

export const GetAllEventsReplySchema = Type.Object({
  events: Type.Array(RootPageEventSchema)
})
export type GetAllEventsReply = Static<typeof GetAllEventsReplySchema>

export const GetEditableEventDataRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type GetEditableEventDataRequestParams = Static<typeof GetEditableEventDataRequestParamsSchema>

export const GetEditableEventDataReplySchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
  website: Type.String(),
  openingDate: Type.String(),
  creationDate: Type.String(),
  startTime: Type.Array(Type.Object({
    id: Type.String(),
    start: Type.String(),
    end: Type.String()
  })),
  venueName: Type.String(),
  venueCoordinates: Type.Object({
    x: Type.String(),
    y: Type.String()
  }),
  tags: Type.Array(Type.String()),
  priceRange: Type.Array(Type.Object({
    color: Type.String(),
    price: Type.Number()
  }))
})
export type GetEditableEventDataReply = Static<typeof GetEditableEventDataReplySchema>

export const PatchEditableEventDataRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type PatchEditableEventDataRequestParams = Static<typeof PatchEditableEventDataRequestParamsSchema>

export const PatchEditableEventDataRequestBodySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  website: Type.String(),
  openingDate: Type.String(),
  startTime: Type.Array(Type.Object({
    id: Type.String(),
    start: Type.String(),
    end: Type.String()
  })),
  venueName: Type.String(),
  venueCoordinates: Type.Object({
    x: Type.String(),
    y: Type.String()
  }),
  tags: Type.Array(Type.String()),
  priceRange: Type.Array(Type.Object({
    color: Type.String(),
    price: Type.Number()
  }))
})
export type PatchEditableEventDataRequestBody = Static<typeof PatchEditableEventDataRequestBodySchema>

export const PatchEditableEventDataReplySchema = Type.Object({
  message: Type.String()
})
export type PatchEditableEventDataReply = Static<typeof PatchEditableEventDataReplySchema>
