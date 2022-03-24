import { Static, Type } from '@sinclair/typebox'

import { UserSocialMediaSchema } from './users'

export const creatorType = [
  'Official',
  'Local'
] as const

export const CreatorTypeSchema = Type.Union(creatorType.map(c => Type.Literal(c)))
export type CreatorType = Static<typeof CreatorTypeSchema>

export const priceRange = [
  'Any',
  '< 300',
  '< 600',
  '< 1,200',
  '< 2,400',
  '< 4,800',
  '< 7,200',
  '< 10,000',
  '10,000 and above'
] as const

export const eventTags = [
  'Amphitheater',
  'Business',
  'Concert',
  'Entertainment',
  'Fan meet',
  'Gameshow',
  'Lifestyle',
  'Live',
  'Musical',
  'Online',
  'Opera',
  'Seminar',
  'Stand up comedy',
  'Technology',
  'Variety'
] as const

export const EventTagsSchema = Type.Union(eventTags.map(e => Type.Literal(e)))
export type EventTags = Static<typeof EventTagsSchema>

export const PriceRangeSchema = Type.Union(priceRange.map(p => Type.Literal(p)))
export type PriceRange = Static<typeof PriceRangeSchema>

export const dateRange = [
  'All dates',
  'Today',
  'This week',
  'Next week',
  'This month',
  'Next month'
] as const

export const DateRangeSchema = Type.Union(dateRange.map(d => Type.Literal(d)))
export type DateRange = Static<typeof DateRangeSchema>

export const searchType = [
  'Events',
  'Users'
] as const

export const SearchTypeSchema = Type.Union(searchType.map(s => Type.Literal(s)))
export type SearchType = Static<typeof SearchTypeSchema>

export const GetSearchResultRequestQuerystringSchema = Type.Object({
  q: Type.String(),
  creatorType: Type.Optional(Type.Array(CreatorTypeSchema)),
  priceRange: PriceRangeSchema,
  tags: Type.Optional(Type.Array(EventTagsSchema)),
  dateRange: DateRangeSchema,
  type: SearchTypeSchema
})
export type GetSearchResultRequestQuerystring = Static<typeof GetSearchResultRequestQuerystringSchema>

export const GetSearchResultReplySchema = Type.Object({
  events: Type.Array(Type.Object({
    id: Type.String(),
    name: Type.String(),
    type: CreatorTypeSchema,
    firstDatetime: Type.String(),
    lastDatetime: Type.String(),
    openingDate: Type.String(),
    venueName: Type.String(),
    venueCoordinates: Type.String()
  })),
  users: Type.Array(Type.Object({
    username: Type.String(),
    description: Type.String(),
    socialMedias: UserSocialMediaSchema,
    accountType: Type.String()
  }))
})
export type GetSearchResultReply = Static<typeof GetSearchResultReplySchema>
