
import { Static, Type } from '@sinclair/typebox'

export const AdminGetUserDataSortByOptionSchema = Type.Union([
  Type.Literal('name-asc'),
  Type.Literal('name-desc'),
  Type.Literal('regis-asc'),
  Type.Literal('regis-desc')
])
export type AdminGetUserDataOptions = Static<typeof AdminGetUserDataSortByOptionSchema>

export const AdminGetUserDataRequestQuerystringSchema = Type.Object({
  page: Type.Number({ default: 1 }),
  sort: AdminGetUserDataSortByOptionSchema
})
export type AdminGetUserDataRequestQuerystring = Static<typeof AdminGetUserDataRequestQuerystringSchema>

export const AdminGetUserDataReplySchema = Type.Object({
  total: Type.Number(),
  users: Type.Array(Type.Object({
    username: Type.String(),
    email: Type.String(),
    isAdmin: Type.Boolean(),
    isVerified: Type.Boolean(),
    registrationDatetime: Type.String()
  }))
})
export type AdminGetUserDataReply = Static<typeof AdminGetUserDataReplySchema>

export const AdminGrantAdminRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminGrantAdminRequestParams = Static<typeof AdminGrantAdminRequestParamsSchema>

export const AdminGrantAdminReplySchema = Type.Object({
  message: Type.String()
})
export type AdminGrantAdminReply = Static<typeof AdminGrantAdminReplySchema>

export const AdminRevokeAdminRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminRevokeAdminRequestParams = Static<typeof AdminRevokeAdminRequestParamsSchema>

export const AdminRevokeAdminReplySchema = Type.Object({
  message: Type.String()
})
export type AdminRevokeAdminReply = Static<typeof AdminRevokeAdminReplySchema>

export const AdminGrantVerificationRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminGrantVerificationRequestParams = Static<typeof AdminGrantVerificationRequestParamsSchema>

export const AdminGrantVerificationReplySchema = Type.Object({
  message: Type.String()
})
export type AdminGrantVerificationReply = Static<typeof AdminGrantVerificationReplySchema>

export const AdminRevokeVerificationRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminRevokeVerificationRequestParams = Static<typeof AdminRevokeVerificationRequestParamsSchema>

export const AdminRevokeVerificationReplySchema = Type.Object({
  message: Type.String()
})
export type AdminRevokeVerificationReply = Static<typeof AdminRevokeVerificationReplySchema>

export const AdminRemoveUserRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminRemoveUserRequestParams = Static<typeof AdminRemoveUserRequestParamsSchema>

export const AdminRemoveUserReplySchema = Type.Object({
  message: Type.String()
})
export type AdminRemoveUserReply = Static<typeof AdminRemoveUserReplySchema>

export const AdminGetTransactionDataSortByOptionSchema = Type.Union([
  Type.Literal('time-asc'),
  Type.Literal('time-desc'),
  Type.Literal('price-asc'),
  Type.Literal('price-desc'),
  Type.Literal('username-asc'),
  Type.Literal('username-desc')
])
export type AdminGetTransactionDataSortByOption = Static<typeof AdminGetTransactionDataSortByOptionSchema>

export const AdminGetTransactionDataRequestQuerystringSchema = Type.Object({
  page: Type.Number({ default: 1 }),
  sort: AdminGetTransactionDataSortByOptionSchema
})
export type AdminGetTransactionDataRequestQuerystring = Static<typeof AdminGetTransactionDataRequestQuerystringSchema>

export const AdminGetTransactionDataReplySchema = Type.Object({
  total: Type.Number(),
  transactions: Type.Array(Type.Object({
    transactionId: Type.String(),
    username: Type.String(),
    time: Type.String(),
    seats: Type.Array(Type.String()),
    totalPriceWithVat: Type.Number()
  }))
})
export type AdminGetTransactionDataReply = Static<typeof AdminGetTransactionDataReplySchema>
