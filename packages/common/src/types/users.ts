import { Static, Type } from '@sinclair/typebox'

import { rootPageEventSchema } from './events.js'

export const relatedEventToUserSchema = Type.Omit(
  rootPageEventSchema,
  ['firstDatetime']
)
export type RelatedEventToUser = Static<typeof relatedEventToUserSchema>

export const getUserParamsSchema = Type.Object({
  username: Type.String()
})
export type GetUserParams = Static<typeof getUserParamsSchema>

export const getUserQuerystringSchema = Type.Object({
  u: Type.String({ default: '' })
})
export type GetUserQuerystring = Static<typeof getUserQuerystringSchema>

export const userSocialMediaSchema = Type.Object({
  facebook: Type.String(),
  instagram: Type.String(),
  twitter: Type.String(),
  tiktok: Type.String(),
  email: Type.String(),
  website: Type.String()
})
export type UserSocialMedia = Static<typeof userSocialMediaSchema>

export const getUserReplySchema = Type.Object({
  username: Type.String(),
  socialMedias: userSocialMediaSchema,
  verificationStatus: Type.Boolean(),
  isAdmin: Type.Boolean(),
  profileDescription: Type.String(),
  followersAmount: Type.Number(),
  followingsAmount: Type.Number(),
  isCurrentUserFollowing: Type.Boolean()
})
export type GetUserReply = Static<typeof getUserReplySchema>

export const getUserRelatedEventsParamsSchema = Type.Object({
  username: Type.String()
})
export type GetUserRelatedEventsRequest = Static<typeof getUserRelatedEventsParamsSchema>

export const getUserRelatedEventsReplySchema = Type.Object({
  created: Type.Array(relatedEventToUserSchema),
  attended: Type.Array(relatedEventToUserSchema)
})
export type GetUserRelatedEventsReply = Static<typeof getUserRelatedEventsReplySchema>

export const getUserFollowersListRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetUserFollowersListRequestParams = Static<typeof getUserFollowersListRequestParamsSchema>

export const getUserFollowersListRequestQuerystringSchema = Type.Object({
  u: Type.String({ default: '' })
})
export type GetUserFollowersListRequestQuerystring = Static<typeof getUserFollowersListRequestQuerystringSchema>

export const getUserFollowersListReplySchema = Type.Object({
  followers: Type.Array(Type.Object({
    username: Type.String(),
    isAdmin: Type.Boolean(),
    isVerified: Type.Boolean()
  }))
})
export type GetUserFollowersListReply = Static<typeof getUserFollowersListReplySchema>

export const patchUserDescriptionRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type PatchUserDescriptionRequestParams = Static<typeof patchUserDescriptionRequestParamsSchema>

export const patchUserDescriptionRequestBodySchema = Type.Object({
  description: Type.String(),
  facebook: Type.String(),
  instagram: Type.String(),
  twitter: Type.String(),
  tiktok: Type.String(),
  website: Type.String(),
  email: Type.String()
})
export type PatchUserDescriptionRequestBody = Static<typeof patchUserDescriptionRequestBodySchema>

export const patchUserDescriptionReplySchema = Type.Object({
  message: Type.String()
})
export type PatchUserDescriptionReply = Static<typeof patchUserDescriptionReplySchema>

export const getUserFollowingsListRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetUserFollowingsListRequestParams = Static<typeof getUserFollowingsListRequestParamsSchema>

export const getUserFollowingsListRequestQuertstringSchema = Type.Object({
  u: Type.String({ default: '' })
})
export type GetUserFollowingsListRequestQuertsring = Static<typeof getUserFollowingsListRequestQuertstringSchema>

export const getUserFollowingsListReplySchema = Type.Object({
  followings: Type.Array(Type.Object({
    username: Type.String(),
    isAdmin: Type.Boolean(),
    isVerified: Type.Boolean()
  }))
})
export type GetUserFollowingsListReply = Static<typeof getUserFollowingsListReplySchema>
