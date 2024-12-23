import { Static, Type } from "@sinclair/typebox"

export const postEventBodySchema = Type.Object({
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
  ticketPrices: Type.Array(
    Type.Object({
      color: Type.String(),
      price: Type.Number()
    })
  ),
  datetimes: Type.Array(
    Type.Object({
      start: Type.String(),
      end: Type.String()
    })
  ),
  minimumAge: Type.Number(),
  sections: Type.Array(
    Type.Array(
      Type.Object({
        sectionRowPosition: Type.Number(),
        sectionColumnPosition: Type.Number(),
        seats: Type.Array(
          Type.Array(
            Type.Object({
              seatRowPosition: Type.Number(),
              seatColumnPosition: Type.Number(),
              seatPrice: Type.Number()
            })
          )
        )
      })
    )
  )
})
export type PostEventBody = Static<typeof postEventBodySchema>

export const postEventReplySchema = Type.Object({
  eventId: Type.String()
})
export type PostEventReply = Static<typeof postEventReplySchema>

export const rootPageEventSchema = Type.Object({
  username: Type.String(),
  id: Type.String(),
  name: Type.String(),
  firstDatetime: Type.String(),
  venueName: Type.String()
})
export type RootPageEvent = Static<typeof rootPageEventSchema>

export const getEventsReplySchema = Type.Object({
  official: Type.Array(rootPageEventSchema),
  local: Type.Array(rootPageEventSchema)
})
export type GetEventsReply = Static<typeof getEventsReplySchema>

export const getIndividualEventRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type GetIndividualEventRequestParams = Static<
  typeof getIndividualEventRequestParamsSchema
>

export const getIndividualEventRequestQuerystringSchema = Type.Object({
  u: Type.String()
})
export type GetIndividualEventRequestQuerystring = Static<
  typeof getIndividualEventRequestQuerystringSchema
>

export const getIndividualEventReplySchema = Type.Object({
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
  prices: Type.Array(
    Type.Object({
      color: Type.String(),
      value: Type.Number()
    })
  ),
  tags: Type.Array(Type.String()),
  ageLimit: Type.Number(),
  isCurrentUserAttended: Type.Boolean(),
  datetimes: Type.Array(
    Type.Object({
      datetimeId: Type.String(),
      start: Type.String(),
      end: Type.String()
    })
  )
})
export type GetIndividualEventReply = Static<
  typeof getIndividualEventReplySchema
>

export const getEventImageRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type GetEventImageRequestParams = Static<
  typeof getEventImageRequestParamsSchema
>

export const postEventImageParamsSchema = Type.Object({
  eventId: Type.String()
})
export type PostEventImageParams = Static<typeof postEventImageParamsSchema>

export const postEventImageReplySchema = Type.Object({
  message: Type.String()
})
export type PostEventImageReply = Static<typeof postEventImageReplySchema>

export const getEventSeatsRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type GetEventSeatsRequestParams = Static<
  typeof getEventSeatsRequestParamsSchema
>

export const getEventSeatsRequestQuerystringSchema = Type.Object({
  datetimeId: Type.String()
})
export type GetEventSeatsRequestQuerystring = Static<
  typeof getEventSeatsRequestQuerystringSchema
>

export const getEventSeatsReplySchema = Type.Object({
  sections: Type.Array(
    Type.Object({
      sectionId: Type.String(),
      sectionRowPosition: Type.Number(),
      sectionColumnPosition: Type.Number(),
      seatId: Type.String(),
      seatRowPosition: Type.Number(),
      seatColumnPosition: Type.Number(),
      seatPrice: Type.Number(),
      isSeatTaken: Type.Boolean()
    })
  ),
  ticketPrices: Type.Array(
    Type.Object({
      color: Type.String(),
      price: Type.Number()
    })
  )
})
export type GetEventSeatsReply = Static<typeof getEventSeatsReplySchema>

export const getAllEventsReplySchema = Type.Object({
  events: Type.Array(rootPageEventSchema)
})
export type GetAllEventsReply = Static<typeof getAllEventsReplySchema>

export const getEditableEventDataRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type GetEditableEventDataRequestParams = Static<
  typeof getEditableEventDataRequestParamsSchema
>

export const getEditableEventDataReplySchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
  website: Type.String(),
  openingDate: Type.String(),
  creationDate: Type.String(),
  startTime: Type.Array(
    Type.Object({
      id: Type.String(),
      start: Type.String(),
      end: Type.String()
    })
  ),
  venueName: Type.String(),
  venueCoordinates: Type.Object({
    x: Type.String(),
    y: Type.String()
  }),
  tags: Type.Array(Type.String()),
  priceRange: Type.Array(
    Type.Object({
      color: Type.String(),
      price: Type.Number()
    })
  )
})
export type GetEditableEventDataReply = Static<
  typeof getEditableEventDataReplySchema
>

export const patchEditableEventDataRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type PatchEditableEventDataRequestParams = Static<
  typeof patchEditableEventDataRequestParamsSchema
>

export const patchEditableEventDataRequestBodySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  description: Type.String(),
  website: Type.String(),
  openingDate: Type.String(),
  startTime: Type.Array(
    Type.Object({
      id: Type.String(),
      start: Type.String(),
      end: Type.String()
    })
  ),
  venueName: Type.String(),
  venueCoordinates: Type.Object({
    x: Type.String(),
    y: Type.String()
  }),
  tags: Type.Array(Type.String()),
  priceRange: Type.Array(
    Type.Object({
      color: Type.String(),
      price: Type.Number()
    })
  )
})
export type PatchEditableEventDataRequestBody = Static<
  typeof patchEditableEventDataRequestBodySchema
>

export const patchEditableEventDataReplySchema = Type.Object({
  message: Type.String()
})
export type PatchEditableEventDataReply = Static<
  typeof patchEditableEventDataReplySchema
>
