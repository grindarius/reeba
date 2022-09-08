import { Static, Type } from '@sinclair/typebox'

export const getAvatarsParamsSchema = Type.Object({
  username: Type.String()
})
export type GetAvatarsParams = Static<typeof getAvatarsParamsSchema>

export const postAvatarsParamsSchema = Type.Object({
  username: Type.String()
})
export type PostAvatarsParams = Static<typeof postAvatarsParamsSchema>

export const postAvatarsReplyBodySchema = Type.Object({
  message: Type.String()
})
export type PostAvatarsReply = Static<typeof postAvatarsReplyBodySchema>
