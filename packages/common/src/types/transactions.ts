import { Static, Type } from '@sinclair/typebox'

export const PostTransactionRequestBodySchema = Type.Object({
  eventId: Type.String(),
  datetimeId: Type.String(),
  sectionId: Type.String(),
  seatIds: Type.Array(Type.String())
})
export type PostTransactionRequestBody = Static<typeof PostTransactionRequestBodySchema>

export const PostTransactionReplySchema = Type.Object({
  message: Type.String()
})
export type PostTransactionReply = Static<typeof PostTransactionReplySchema>
