import { Static, Type } from '@sinclair/typebox'

export const GetAvatarsParamsSchema = Type.Object({
  username: Type.String()
})
export type GetAvatarsParams = Static<typeof GetAvatarsParamsSchema>
