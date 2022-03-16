import { Static, Type } from '@sinclair/typebox'

export const GetSearchResultRequestQuerystringSchema = Type.Object({
  q: Type.String(),
  // this should be enum of some type
  price: Type.String(),
  tags: Type.Array(Type.String()),
  // this should be enum of some type
  accountType: Type.Array(Type.String())
})
export type GetSearchResultRequestQuerystring = Static<typeof GetSearchResultRequestQuerystringSchema>
