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

export const GetTransactionRequestParamsSchema = Type.Object({
  transactionId: Type.String()
})
export type GetTransactionRequestParams = Static<typeof GetTransactionRequestParamsSchema>

export const GetTransactionReplySchema = Type.Object({
  transactionId: Type.String(),
  time: Type.String(),
  venueName: Type.String(),
  firstStartDatetime: Type.String(),
  sectionRowPosition: Type.Number(),
  sectionColumnPosition: Type.Number(),
  seatDetail: Type.Array(Type.Object({
    seatPrice: Type.Number(),
    seatRowPosition: Type.Number(),
    seatColumnPosition: Type.Number()
  }))
})
