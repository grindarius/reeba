import { Static, Type } from '@sinclair/typebox'

import { RootPageEventSchema } from './events'

export const RelatedEventToUserSchema = Type.Omit(
  RootPageEventSchema,
  ['firstDatetime']
)
export type RelatedEventToUser = Static<typeof RelatedEventToUserSchema>

export const GetUserParamsSchema = Type.Object({
  username: Type.String()
})
export type GetUserParams = Static<typeof GetUserParamsSchema>

export const GetUserReplySchema = Type.Object({
  username: Type.String(),
  socialMedias: Type.Object({
    facebook: Type.String(),
    instagram: Type.String(),
    twitter: Type.String(),
    tiktok: Type.String(),
    email: Type.String(),
    website: Type.String()
  }),
  verificationStatus: Type.Boolean(),
  profileDescription: Type.String(),
  followersAmount: Type.Number()
})
export type GetUserReply = Static<typeof GetUserReplySchema>

export const GetUserRelatedEventsParamsSchema = Type.Object({
  username: Type.String()
})
export type GetUserRelatedEventsRequest = Static<typeof GetUserRelatedEventsParamsSchema>

export const GetUserRelatedEventsReplySchema = Type.Object({
  created: Type.Array(RelatedEventToUserSchema),
  attended: Type.Array(RelatedEventToUserSchema)
})
export type GetUserRelatedEventsReply = Static<typeof GetUserRelatedEventsReplySchema>
