import { Static, Type } from '@sinclair/typebox'

import { t_user_roles } from '.'

export const SigninBodySchema = Type.Object({
  email: Type.String(),
  password: Type.String()
})
export type SigninBody = Static<typeof SigninBodySchema>

export const SigninReplyBodySchema = Type.Object({
  token: Type.String(),
  username: Type.String(),
  role: Type.Union([
    Type.Literal(t_user_roles.user),
    Type.Literal(t_user_roles.organizer),
    Type.Literal(t_user_roles.admin)
  ]),
  verificationStatus: Type.Boolean()
})
export type SigninReplyBody = Static<typeof SigninReplyBodySchema>

export const SignupBodySchema = Type.Object({
  username: Type.String(),
  email: Type.String(),
  password: Type.String()
})
export type SignupBody = Static<typeof SignupBodySchema>

export const SignupReplyBodySchema = Type.Object({
  message: Type.String()
})
export type SignupReplyBody = Static<typeof SignupReplyBodySchema>
