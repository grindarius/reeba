import { type Static, Type } from '@sinclair/typebox'

import { userSocialMediaSchema } from './users.js'

export const creatorType = [
  'Official',
  'Local'
] as const

export const creatorTypeSchema = Type.Union(creatorType.map(c => Type.Literal(c)))
export type CreatorType = Static<typeof creatorTypeSchema>

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

export const eventTagsSchema = Type.Union(eventTags.map(e => Type.Literal(e)))
export type EventTags = Static<typeof eventTagsSchema>

export const priceRangeSchema = Type.Union(priceRange.map(p => Type.Literal(p)))
export type PriceRange = Static<typeof priceRangeSchema>

export const dateRange = [
  'All dates',
  'Today',
  'This week',
  'Next week',
  'This month',
  'Next month'
] as const

export const dateRangeSchema = Type.Union(dateRange.map(d => Type.Literal(d)))
export type DateRange = Static<typeof dateRangeSchema>

export const searchType = [
  'Events',
  'Users'
] as const

export const searchTypeSchema = Type.Union(searchType.map(s => Type.Literal(s)))
export type SearchType = Static<typeof searchTypeSchema>

export const getSearchResultRequestQuerystringSchema = Type.Object({
  q: Type.String(),
  creatorType: Type.Optional(Type.Array(creatorTypeSchema)),
  priceRange: priceRangeSchema,
  tags: Type.Optional(Type.Array(eventTagsSchema)),
  dateRange: dateRangeSchema,
  type: searchTypeSchema,
  page: Type.Number()
})
export type GetSearchResultRequestQuerystring = Static<typeof getSearchResultRequestQuerystringSchema>

export const getSearchResultReplySchema = Type.Object({
  events: Type.Array(Type.Object({
    id: Type.String(),
    name: Type.String(),
    createdBy: Type.String(),
    type: creatorTypeSchema,
    firstStartDatetime: Type.String(),
    lastStartDatetime: Type.String(),
    openingDate: Type.String(),
    venueName: Type.String(),
    venueCoordinates: Type.Object({
      x: Type.String(),
      y: Type.String()
    })
  })),
  users: Type.Array(Type.Object({
    username: Type.String(),
    description: Type.String(),
    socialMedias: userSocialMediaSchema,
    isVerified: Type.Boolean(),
    isAdmin: Type.Boolean()
  }))
})
export type GetSearchResultReply = Static<typeof getSearchResultReplySchema>
