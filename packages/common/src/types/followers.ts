import { Static, Type } from '@sinclair/typebox'

export const GetFollowersRequestParamsSchema = Type.Object({
  anoterUsername: Type.String()
})
export type GetFollowersRequestParams = Static<typeof GetFollowersRequestParamsSchema>

export const GetFollowersReplySchema = Type.Object({
  isFollowingCurrentUser: Type.Boolean()
})
export type GetFollowersReply = Static<typeof GetFollowersReplySchema>
