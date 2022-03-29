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
