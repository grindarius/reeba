import { Static, Type } from '@sinclair/typebox'

export const GetProfileDataRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetProfileDataRequestParams = Static<typeof GetProfileDataRequestParamsSchema>

export const GetProfileDataReplySchema = Type.Object({
  email: Type.String(),
  phoneCountryCode: Type.String(),
  phoneNumber: Type.String(),
  iso31662: Type.String(),
  birthdate: Type.String()
})
export type GetProfileDataReply = Static<typeof GetProfileDataReplySchema>

export const PatchProfileDataRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type PatchProfileDataRequestParams = Static<typeof PatchProfileDataRequestParamsSchema>

export const PatchProfileDataRequestBodySchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
  phoneCountryCode: Type.String(),
  phoneNumber: Type.String(),
  birthdate: Type.String()
})
export type PatchProfileDataRequestBody = Static<typeof PatchProfileDataRequestBodySchema>

export const PatchProfileDataReplySchema = Type.Object({
  message: Type.String()
})
export type PatchProfileDataReply = Static<typeof PatchProfileDataReplySchema>

export const GetMyTicketsRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetMyTicketsRequestParams = Static<typeof GetMyTicketsRequestParamsSchema>

export const GetMyTicketsReplySchema = Type.Object({
  events: Type.Array(Type.Object({
    id: Type.String(),
    name: Type.String(),
    venueName: Type.String(),
    time: Type.Object({
      id: Type.String(),
      start: Type.String(),
      end: Type.String()
    }),
    seats: Type.Array(Type.Object({
      id: Type.String(),
      name: Type.String(),
      rowPosition: Type.Number(),
      columnPosition: Type.Number()
    })),
    section: Type.Object({
      id: Type.String(),
      name: Type.String(),
      rowPosition: Type.Number(),
      columnPosition: Type.Number()
    }),
    totalPrice: Type.Number()
  }))
})
export type GetMyTicketsReply = Static<typeof GetMyTicketsReplySchema>
