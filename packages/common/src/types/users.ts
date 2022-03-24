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

export const PostFollowRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type PostFollowRequestParams = Static<typeof PostFollowRequestParamsSchema>

export const PostFollowRequestBodySchema = Type.Object({
  usernameToFollow: Type.String()
})
export type PostFollowRequestBody = Static<typeof PostFollowRequestBodySchema>

export const PostFollowReplySchema = Type.Object({
  message: Type.String()
})
export type PostFollowReply = Static<typeof PostFollowReplySchema>

export const PostUnfollowRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type PostUnfollowRequestParams = Static<typeof PostUnfollowRequestParamsSchema>

export const PostUnfollowRequestBodySchema = Type.Object({
  usernameToUnfollow: Type.String()
})
export type PostUnfollowRequestBody = Static<typeof PostUnfollowRequestBodySchema>

export const PostUnfollowReplySchema = Type.Object({
  message: Type.String()
})
export type PostUnfollowReply = Static<typeof PostUnfollowReplySchema>
