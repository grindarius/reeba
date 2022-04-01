import { Static, Type } from '@sinclair/typebox'

export const GetFollowRequestParamsSchema = Type.Object({
  anoterUsername: Type.String()
})
export type GetFollowRequestParams = Static<typeof GetFollowRequestParamsSchema>

export const GetFollowReplySchema = Type.Object({
  isFollowingCurrentUser: Type.Boolean()
})
export type GetFollowReply = Static<typeof GetFollowReplySchema>
