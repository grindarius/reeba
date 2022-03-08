import { Static, Type } from '@sinclair/typebox'

export const GetSearchRequestParamsSchema = Type.Object({
  eventName: Type.String()
})
export type GetSearchRequestParams = Static<typeof GetSearchRequestParamsSchema>
