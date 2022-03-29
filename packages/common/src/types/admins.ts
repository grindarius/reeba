import { Static, Type } from '@sinclair/typebox'

export const AdminGetUserDataRequestQuerystringSchema = Type.Object({
  page: Type.Number({ default: 1 })
})
export type AdminGetUserDataRequestQuerystring = Static<typeof AdminGetUserDataRequestQuerystringSchema>

export const AdminGetUserDataReplySchema = Type.Object({
  users: Type.Array(Type.Object({
    username: Type.String(),
    email: Type.String(),
    isAdmin: Type.Boolean(),
    isVerified: Type.Boolean(),
    registrationDatetime: Type.String()
  }))
})
export type AdminGetUserDataReply = Static<typeof AdminGetUserDataReplySchema>
