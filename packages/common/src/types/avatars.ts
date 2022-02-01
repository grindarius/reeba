import { Static, Type } from '@sinclair/typebox'

export const GetAvatarsParamsSchema = Type.Object({
  username: Type.String()
})
export type GetAvatarsParams = Static<typeof GetAvatarsParamsSchema>

export const PostAvatarsParamsSchema = Type.Object({
  username: Type.String()
})
export type PostAvatarsParams = Static<typeof PostAvatarsParamsSchema>

export const PostAvatarsReplyBodySchema = Type.Object({
  message: Type.String()
})
export type PostAvatarsReply = Static<typeof PostAvatarsReplyBodySchema>
