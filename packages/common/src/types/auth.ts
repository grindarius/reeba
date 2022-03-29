import { Static, Type } from '@sinclair/typebox'

import { t_user_role } from './database'

export const SigninBodySchema = Type.Object({
  email: Type.String(),
  password: Type.String()
})
export type SigninBody = Static<typeof SigninBodySchema>

export const SigninReplySchema = Type.Object({
  token: Type.String(),
  username: Type.String(),
  email: Type.String(),
  role: Type.Union([
    Type.Literal(t_user_role.user),
    Type.Literal(t_user_role.admin)
  ]),
  verificationStatus: Type.Boolean()
})
export type SigninReply = Static<typeof SigninReplySchema>

export const SignupBodySchema = Type.Object({
  username: Type.String(),
  email: Type.String(),
  password: Type.String(),
  phoneCountryCode: Type.String(),
  iso31662: Type.String({ default: '' }),
  phoneNumber: Type.String()
})
export type SignupBody = Static<typeof SignupBodySchema>

export const SignupReplySchema = Type.Object({
  message: Type.String()
})
export type SignupReply = Static<typeof SignupReplySchema>
