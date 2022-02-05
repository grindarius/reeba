import { Static, Type } from '@sinclair/typebox'

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
