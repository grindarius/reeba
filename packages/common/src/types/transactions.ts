import { Static, Type } from '@sinclair/typebox'

export const postTransactionRequestBodySchema = Type.Object({
  eventId: Type.String(),
  datetimeId: Type.String(),
  sectionId: Type.String(),
  seatIds: Type.Array(Type.String())
})
export type PostTransactionRequestBody = Static<typeof postTransactionRequestBodySchema>

export const postTransactionReplySchema = Type.Object({
  message: Type.String()
})
export type PostTransactionReply = Static<typeof postTransactionReplySchema>

export const getTransactionRequestParamsSchema = Type.Object({
  transactionId: Type.String()
})
export type GetTransactionRequestParams = Static<typeof getTransactionRequestParamsSchema>

export const getTransactionReplySchema = Type.Object({
  transactionId: Type.String(),
  time: Type.String(),
  username: Type.String(),
  eventName: Type.String(),
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
export type GetTransactionReply = Static<typeof getTransactionReplySchema>

export const getTransactionPDFRequestParamsSchema = Type.Object({
  transactionId: Type.String()
})
export type GetTransactionPDFRequestParams = Static<typeof getTransactionPDFRequestParamsSchema>

export const postTransferTransactionRequestParamsSchema = Type.Object({
  transactionId: Type.String()
})
export type PostTransferTransactionRequestParams = Static<typeof postTransferTransactionRequestParamsSchema>

export const postTransferTransactionRequestBodySchema = Type.Object({
  username: Type.String()
})
export type PostTransferTransactionRequestBody = Static<typeof postTransferTransactionRequestBodySchema>

export const postTransferTransactionReplySchema = Type.Object({
  message: Type.String()
})
export type PostTransferTransactionReply = Static<typeof postTransactionReplySchema>

export const deleteTransactionRequestParamsSchema = Type.Object({
  transactionId: Type.String()
})
export type DeleteTransactionRequestParams = Static<typeof deleteTransactionRequestParamsSchema>

export const deleteTransactionReplySchema = Type.Object({
  message: Type.String()
})
export type DeleteTransactionReply = Static<typeof deleteTransactionReplySchema>
