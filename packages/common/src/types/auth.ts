import { type Static, Type } from '@sinclair/typebox'

import { t_user_role } from './database.js'

export const signinBodySchema = Type.Object({
  email: Type.String(),
  password: Type.String()
})
export type SigninBody = Static<typeof signinBodySchema>

export const signinReplySchema = Type.Object({
  token: Type.String(),
  username: Type.String(),
  email: Type.String(),
  role: Type.Union([
    Type.Literal(t_user_role.user),
    Type.Literal(t_user_role.admin)
  ]),
  verificationStatus: Type.Boolean()
})
export type SigninReply = Static<typeof signinReplySchema>

export const signupBodySchema = Type.Object({
  username: Type.String(),
  email: Type.String(),
  password: Type.String(),
  phoneCountryCode: Type.String(),
  iso31662: Type.String({ default: '' }),
  phoneNumber: Type.String()
})
export type SignupBody = Static<typeof signupBodySchema>

export const signupReplySchema = Type.Object({
  message: Type.String()
})
export type SignupReply = Static<typeof signupReplySchema>
