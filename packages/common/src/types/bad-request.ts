import { Static, Type } from '@sinclair/typebox'

export const BadRequestReplySchema = Type.Object({
  statusCode: Type.Number(),
  message: Type.String(),
  error: Type.String()
})
export type BadRequestReply = Static<typeof BadRequestReplySchema>
