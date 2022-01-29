import { Static, Type } from '@sinclair/typebox'

export const NotFoundReplySchema = Type.Object({
  statusCode: Type.Number(),
  message: Type.String(),
  error: Type.String()
})
export type NotFoundReply = Static<typeof NotFoundReplySchema>
