import { Static, Type } from '@sinclair/typebox'

export const GetSearchResultRequestQuerystringSchema = Type.Object({
  q: Type.String(),
  // this should be enum of some type
  priceRange: Type.Number(),
  tags: Type.Array(Type.String()),
  // this should be enum of some type
  accountType: Type.String()
})
export type GetSearchResultRequestQuerystring = Static<typeof GetSearchResultRequestQuerystringSchema>
