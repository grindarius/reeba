import { type Static, Type } from '@sinclair/typebox'

export const postFollowRequestBodySchema = Type.Object({
  anotherUsername: Type.String()
})
export type PostFollowRequestBody = Static<typeof postFollowRequestBodySchema>

export const postFollowReplySchema = Type.Object({
  isFollowingCurrentUser: Type.Boolean()
})
export type PostFollowReply = Static<typeof postFollowReplySchema>
