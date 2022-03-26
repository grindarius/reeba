import { Static, Type } from '@sinclair/typebox'

export const PostFollowRequestBodySchema = Type.Object({
  usernameToFollow: Type.String()
})
export type PostFollowRequestBody = Static<typeof PostFollowRequestBodySchema>

export const PostFollowReplySchema = Type.Object({
  message: Type.String()
})
export type PostFollowReply = Static<typeof PostFollowReplySchema>

export const PostUnfollowRequestBodySchema = Type.Object({
  usernameToUnfollow: Type.String()
})
export type PostUnfollowRequestBody = Static<typeof PostUnfollowRequestBodySchema>

export const PostUnfollowReplySchema = Type.Object({
  message: Type.String()
})
export type PostUnfollowReply = Static<typeof PostUnfollowReplySchema>
