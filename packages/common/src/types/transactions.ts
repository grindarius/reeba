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
export type GetTransactionReply = Static<typeof GetTransactionReplySchema>

export const GetTransactionPDFRequestParamsSchema = Type.Object({
  transactionId: Type.String()
})
export type GetTransactionPDFRequestParams = Static<typeof GetTransactionPDFRequestParamsSchema>

export const PostTransferTransactionRequestParamsSchema = Type.Object({
  transactionId: Type.String()
})
export type PostTransferTransactionRequestParams = Static<typeof PostTransferTransactionRequestParamsSchema>

export const PostTransferTransactionRequestBodySchema = Type.Object({
  username: Type.String()
})
export type PostTransferTransactionRequestBody = Static<typeof PostTransferTransactionRequestBodySchema>

export const PostTransferTransactionReplySchema = Type.Object({
  message: Type.String()
})
export type PostTransferTransactionReply = Static<typeof PostTransactionReplySchema>

export const DeleteTransactionRequestParamsSchema = Type.Object({
  transactionId: Type.String()
})
export type DeleteTransactionRequestParams = Static<typeof DeleteTransactionRequestParamsSchema>

export const DeleteTransactionReplySchema = Type.Object({
  message: Type.String()
})
export type DeleteTransactionReply = Static<typeof DeleteTransactionReplySchema>
