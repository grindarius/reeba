import { Static, Type } from '@sinclair/typebox'

export const PostFollowRequestBodySchema = Type.Object({
  anotherUsername: Type.String()
})
export type PostFollowRequestBody = Static<typeof PostFollowRequestBodySchema>

export const PostFollowReplySchema = Type.Object({
  isFollowingCurrentUser: Type.Boolean()
})
export type PostFollowReply = Static<typeof PostFollowReplySchema>
