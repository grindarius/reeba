import { Static, Type } from '@sinclair/typebox'

export const ForbiddenReplySchema = Type.Object({
  statusCode: Type.Number(),
  message: Type.String(),
  error: Type.String()
})
export type ForbiddenReply = Static<typeof ForbiddenReplySchema>
