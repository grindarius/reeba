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

export const GetUserQuerystringSchema = Type.Object({
  u: Type.String({ default: '' })
})
export type GetUserQuerystring = Static<typeof GetUserQuerystringSchema>

export const UserSocialMediaSchema = Type.Object({
  facebook: Type.String(),
  instagram: Type.String(),
  twitter: Type.String(),
  tiktok: Type.String(),
  email: Type.String(),
  website: Type.String()
})
export type UserSocialMedia = Static<typeof UserSocialMediaSchema>

export const GetUserReplySchema = Type.Object({
  username: Type.String(),
  socialMedias: UserSocialMediaSchema,
  verificationStatus: Type.Boolean(),
  isAdmin: Type.Boolean(),
  profileDescription: Type.String(),
  followersAmount: Type.Number(),
  isCurrentUserFollowing: Type.Boolean()
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

export const GetUserFollowersListRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetUserFollowersListRequestParams = Static<typeof GetUserFollowersListRequestParamsSchema>

export const GetUserFollowersListRequestQuerystringSchema = Type.Object({
  u: Type.String({ default: '' })
})
export type GetUserFollowersListRequestQuerystring = Static<typeof GetUserFollowersListRequestQuerystringSchema>

export const GetUserFollowersListReplySchema = Type.Object({
  followers: Type.Array(Type.Object({
    username: Type.String(),
    isAdmin: Type.Boolean(),
    isVerified: Type.Boolean()
  }))
})
export type GetUserFollowersListReply = Static<typeof GetUserFollowersListReplySchema>

export const PatchUserDescriptionRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type PatchUserDescriptionRequestParams = Static<typeof PatchUserDescriptionRequestParamsSchema>

export const PatchUserDescriptionRequestBodySchema = Type.Object({
  description: Type.String(),
  facebook: Type.String(),
  instagram: Type.String(),
  twitter: Type.String(),
  tiktok: Type.String(),
  website: Type.String(),
  email: Type.String()
})
export type PatchUserDescriptionRequestBody = Static<typeof PatchUserDescriptionRequestBodySchema>

export const PatchUserDescriptionReplySchema = Type.Object({
  message: Type.String()
})
export type PatchUserDescriptionReply = Static<typeof PatchUserDescriptionReplySchema>

export const GetUserFollowingsListRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetUserFollowingsListRequestParams = Static<typeof GetUserFollowingsListRequestParamsSchema>

export const GetUserFollowingsListRequestQuertstringSchema = Type.Object({
  u: Type.String({ default: '' })
})
export type GetUserFollowingsListRequestQuertsring = Static<typeof GetUserFollowingsListRequestQuertstringSchema>

export const GetUserFollowingsListReplySchema = Type.Object({
  followings: Type.Array(Type.Object({
    username: Type.String(),
    isAdmin: Type.Boolean(),
    isVerified: Type.Boolean()
  }))
})
export type GetUserFollowingsListReply = Static<typeof GetUserFollowingsListReplySchema>
