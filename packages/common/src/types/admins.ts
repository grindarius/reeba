import { Static, Type } from '@sinclair/typebox'

export const AdminGetUserDataOptionsSchema = Type.Union([
  Type.Literal('name-asc'),
  Type.Literal('name-desc'),
  Type.Literal('regis-asc'),
  Type.Literal('regis-desc')
])
export type AdminGetUserDataOptions = Static<typeof AdminGetUserDataOptionsSchema>

export const AdminGetUserDataRequestQuerystringSchema = Type.Object({
  page: Type.Number({ default: 1 }),
  sort: AdminGetUserDataOptionsSchema
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
