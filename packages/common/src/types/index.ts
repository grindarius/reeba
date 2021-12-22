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
