import { Static, Type } from '@sinclair/typebox'

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
  creatorType: Type.Optional(CreatorTypeSchema),
  priceRange: PriceRangeSchema,
  tags: Type.Optional(EventTagsSchema),
  dateRange: DateRangeSchema,
  type: Type.Optional(SearchTypeSchema)
})
export type GetSearchResultRequestQuerystring = Static<typeof GetSearchResultRequestQuerystringSchema>
