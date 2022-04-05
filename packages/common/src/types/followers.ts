import { Static, Type } from '@sinclair/typebox'

export const GetFollowersRequestParamsSchema = Type.Object({
  anotherUsername: Type.String()
})
export type GetFollowersRequestParams = Static<typeof GetFollowersRequestParamsSchema>

export const GetFollowersReplySchema = Type.Object({
  isFollowersCurrentUser: Type.Boolean()
})
export type GetFollowersReply = Static<typeof GetFollowersReplySchema>
