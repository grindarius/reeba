import { Static, Type } from '@sinclair/typebox'

export const GetUserParamsSchema = Type.Object({
  username: Type.String()
})
export type GetUserParams = Static<typeof GetUserParamsSchema>

export const GetUserReplySchema = Type.Object({
  username: Type.String(),
  socialMedias: Type.Object({
    facebook: Type.String(),
    instagram: Type.String(),
    twitter: Type.String(),
    tiktok: Type.String(),
    email: Type.String(),
    website: Type.String()
  }),
  verificationStatus: Type.Boolean(),
  profileDescription: Type.String(),
  eventsCreatedAmount: Type.Number(),
  eventsAttendedAmount: Type.Number(),
  followersAmount: Type.Number()
})
export type GetUserReply = Static<typeof GetUserReplySchema>
