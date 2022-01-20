import { Static, Type } from '@sinclair/typebox'

import { t_user_roles } from '.'

export const SigninParamsSchema = Type.Object({
  email: Type.String(),
  password: Type.String()
})
export type SigninParams = Static<typeof SigninParamsSchema>

export const SigninReplySchema = Type.Object({
  token: Type.String(),
  username: Type.String(),
  role: Type.Union([
    Type.Literal(t_user_roles.user),
    Type.Literal(t_user_roles.organizer),
    Type.Literal(t_user_roles.admin)
  ])
})
export type SigninReply = Static<typeof SigninReplySchema>

export const SignupParamsSchema = Type.Object({
  username: Type.String(),
  email: Type.String(),
  password: Type.String()
})
export type SignupParams = Static<typeof SignupParamsSchema>

export const SignupReplySchema = Type.Object({
  token: Type.String()
})
export type SignupReply = Static<typeof SignupReplySchema>
