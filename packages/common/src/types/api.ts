import { Static, Type } from '@sinclair/typebox'

export const LoginParamsSchema = Type.Object({
  email: Type.String(),
  password: Type.String()
})
export type LoginParams = Static<typeof LoginParamsSchema>

export const RegisterParamsSchema = Type.Object({
  username: Type.String(),
  email: Type.String(),
  password: Type.String()
})
export type RegisterParams = Static<typeof RegisterParamsSchema>

export const LoginReplySchema = Type.Object({
  token: Type.String()
})
export type LoginReply = Static<typeof LoginReplySchema>

export const RegisterReplySchema = Type.Object({
  token: Type.String()
})
export type RegisterReply = Static<typeof RegisterReplySchema>
