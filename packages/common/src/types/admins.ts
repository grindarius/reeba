import { Static, Type } from '@sinclair/typebox'

import { t_event_status } from './database.js'

export const adminGetUserDataSortByOptionSchema = Type.Union([
  Type.Literal('name-asc'),
  Type.Literal('name-desc'),
  Type.Literal('regis-asc'),
  Type.Literal('regis-desc')
])
export type AdminGetUserDataOptions = Static<typeof adminGetUserDataSortByOptionSchema>

export const adminGetUserDataRequestQuerystringSchema = Type.Object({
  page: Type.Number({ default: 1 }),
  sort: adminGetUserDataSortByOptionSchema,
  q: Type.Optional(Type.String({ default: '' }))
})
export type AdminGetUserDataRequestQuerystring = Static<typeof adminGetUserDataRequestQuerystringSchema>

export const adminGetUserDataReplySchema = Type.Object({
  total: Type.Number(),
  users: Type.Array(Type.Object({
    username: Type.String(),
    email: Type.String(),
    socialMedias: Type.Object({
      facebook: Type.String(),
      instagram: Type.String(),
      twitter: Type.String(),
      tiktok: Type.String(),
      email: Type.String(),
      website: Type.String()
    }),
    phoneNumber: Type.String(),
    phoneCountryCode: Type.String(),
    birthdate: Type.Union([Type.String(), Type.Null()]),
    iso31662: Type.String(),
    isAdmin: Type.Boolean(),
    isVerified: Type.Boolean(),
    registrationDatetime: Type.String()
  }))
})
export type AdminGetUserDataReply = Static<typeof adminGetUserDataReplySchema>

export const adminGrantAdminRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminGrantAdminRequestParams = Static<typeof adminGrantAdminRequestParamsSchema>

export const adminGrantAdminReplySchema = Type.Object({
  message: Type.String()
})
export type AdminGrantAdminReply = Static<typeof adminGrantAdminReplySchema>

export const adminRevokeAdminRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminRevokeAdminRequestParams = Static<typeof adminRevokeAdminRequestParamsSchema>

export const adminRevokeAdminReplySchema = Type.Object({
  message: Type.String()
})
export type AdminRevokeAdminReply = Static<typeof adminRevokeAdminReplySchema>

export const adminGrantVerificationRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminGrantVerificationRequestParams = Static<typeof adminGrantVerificationRequestParamsSchema>

export const adminGrantVerificationReplySchema = Type.Object({
  message: Type.String()
})
export type AdminGrantVerificationReply = Static<typeof adminGrantVerificationReplySchema>

export const adminRevokeVerificationRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminRevokeVerificationRequestParams = Static<typeof adminRevokeVerificationRequestParamsSchema>

export const adminRevokeVerificationReplySchema = Type.Object({
  message: Type.String()
})
export type AdminRevokeVerificationReply = Static<typeof adminRevokeVerificationReplySchema>

export const adminRemoveUserRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminRemoveUserRequestParams = Static<typeof adminRemoveUserRequestParamsSchema>

export const adminRemoveUserReplySchema = Type.Object({
  message: Type.String()
})
export type AdminRemoveUserReply = Static<typeof adminRemoveUserReplySchema>

export const adminGetTransactionDataSortByOptionSchema = Type.Union([
  Type.Literal('time-asc'),
  Type.Literal('time-desc'),
  Type.Literal('price-asc'),
  Type.Literal('price-desc'),
  Type.Literal('username-asc'),
  Type.Literal('username-desc')
])
export type AdminGetTransactionDataSortByOption = Static<typeof adminGetTransactionDataSortByOptionSchema>

export const adminGetTransactionDataRequestQuerystringSchema = Type.Object({
  page: Type.Number({ default: 1 }),
  sort: adminGetTransactionDataSortByOptionSchema,
  q: Type.Optional(Type.String({ default: '' }))
})
export type AdminGetTransactionDataRequestQuerystring = Static<typeof adminGetTransactionDataRequestQuerystringSchema>

export const adminGetTransactionDataReplySchema = Type.Object({
  total: Type.Number(),
  transactions: Type.Array(Type.Object({
    transactionId: Type.String(),
    username: Type.String(),
    time: Type.String(),
    seats: Type.Array(Type.String()),
    totalPriceWithVat: Type.Number()
  }))
})
export type AdminGetTransactionDataReply = Static<typeof adminGetTransactionDataReplySchema>

export const adminGetEventDataSortByOptionSchema = Type.Union([
  Type.Literal('event-name-asc'),
  Type.Literal('event-name-desc'),
  Type.Literal('username-asc'),
  Type.Literal('username-desc'),
  Type.Literal('creation-date-asc'),
  Type.Literal('creation-date-desc'),
  Type.Literal('opening-date-asc'),
  Type.Literal('opening-date-desc'),
  Type.Literal('status-asc'),
  Type.Literal('status-desc'),
  Type.Literal('seat-fullness-percentage-asc'),
  Type.Literal('seat-fullness-percentage-desc'),
  Type.Literal('total-seats-asc'),
  Type.Literal('total-seats-desc'),
  Type.Literal('total-taken-seats-asc'),
  Type.Literal('total-taken-seats-desc')
])
export type AdminGetEventDataSortByOption = Static<typeof adminGetEventDataSortByOptionSchema>

export const aventStatusSchema = Type.Union([
  Type.Literal(t_event_status.open),
  Type.Literal(t_event_status.closed)
])
export type EventStatus = Static<typeof aventStatusSchema>

export const adminGetEventDataRequestQuerystringSchema = Type.Object({
  page: Type.Number({ default: 1 }),
  sort: adminGetEventDataSortByOptionSchema,
  q: Type.Optional(Type.String({ default: '' }))
})
export type AdminGetEventDataRequestQuerystring = Static<typeof adminGetEventDataRequestQuerystringSchema>

export const adminGetEventDataReplySchema = Type.Object({
  total: Type.Number(),
  events: Type.Array(Type.Object({
    id: Type.String(),
    name: Type.String(),
    username: Type.String(),
    openingDate: Type.String(),
    creationDate: Type.String(),
    venueName: Type.String(),
    venueCoordinates: Type.Object({
      x: Type.String(),
      y: Type.String()
    }),
    countryCode: Type.String(),
    status: aventStatusSchema,
    minTicketPrice: Type.Number(),
    maxTicketPrice: Type.Number(),
    minimumAge: Type.Number(),
    totalTakenSeats: Type.Number(),
    totalSeats: Type.Number(),
    seatFullnessPercentage: Type.Number()
  }))
})
export type AdminGetEventDataReply = Static<typeof adminGetEventDataReplySchema>

export const postManipulateEventRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type PostManipulateEventRequestParams = Static<typeof postManipulateEventRequestParamsSchema>

export const postManipulateEventRequestBodySchema = Type.Object({
  targetStatus: Type.Union([
    Type.Literal(t_event_status.closed),
    Type.Literal(t_event_status.open)
  ])
})
export type PostManipulateEventRequestBody = Static<typeof postManipulateEventRequestBodySchema>

export const postManipulateEventReplySchema = Type.Object({
  message: Type.String()
})
export type PostManipulateEventReply = Static<typeof postManipulateEventReplySchema>

export const adminGetStatisticsSummaryRequestQuerystringSchema = Type.Object({
  start: Type.String(),
  end: Type.String()
})
export type AdminGetStatisticsSummaryRequestQuerystring = Static<typeof adminGetStatisticsSummaryRequestQuerystringSchema>

export const adminGetStatisticsSummaryReplySchema = Type.Object({
  totalUsers: Type.Number(),
  newUsersThisMonth: Type.Number(),
  newUsersPastMonth: Type.Number(),
  newUsersPercentageDifferenceToLastMonth: Type.Number(),
  totalEvents: Type.Number(),
  newEventsThisMonth: Type.Number(),
  newEventsPastMonth: Type.Number(),
  newEventsPercentageDifferenceToLastMonth: Type.Number(),
  totalGrossIncome: Type.Number(),
  totalPureIncome: Type.Number()
})
export type AdminGetStatisticsSummaryReply = Static<typeof adminGetStatisticsSummaryReplySchema>

export const adminGetMapsDataRequestQuerystringSchema = Type.Object({
  start: Type.String(),
  end: Type.String()
})
export type AdminGetMapsDataRequestQuerystring = Static<typeof adminGetMapsDataRequestQuerystringSchema>

export const mapsDataSchema = Type.Array(
  Type.Object({
    country: Type.String(),
    amount: Type.Number()
  })
)
export type MapsData = Static<typeof mapsDataSchema>

export const adminGetMapsDataReplySchema = Type.Object({
  users: mapsDataSchema,
  events: mapsDataSchema
})
export type AdminGetMapsDataReply = Static<typeof adminGetMapsDataReplySchema>

export const adminGetSummaryDataGroupByOptionSchema = Type.Union([
  Type.Literal('day'),
  Type.Literal('month'),
  Type.Literal('year')
])
export type AdminGetSummaryDataGroupByOption = Static<typeof adminGetSummaryDataGroupByOptionSchema>

export const adminGetTransactionSummaryRequestQuerystringSchema = Type.Object({
  start: Type.String(),
  end: Type.String(),
  group: adminGetSummaryDataGroupByOptionSchema
})
export type AdminGetTransactionSummaryRequestQuerystring = Static<typeof adminGetTransactionSummaryRequestQuerystringSchema>

export const adminGetTransactionSummaryReplySchema = Type.Object({
  transactions: Type.Array(Type.Object({
    date: Type.String(),
    amount: Type.Number()
  }))
})
export type AdminGetTransactionSummaryReply = Static<typeof adminGetTransactionSummaryReplySchema>

export const adminGetRegistrationSummaryRequestQuerystringSchema = Type.Object({
  start: Type.String(),
  end: Type.String(),
  group: adminGetSummaryDataGroupByOptionSchema
})
export type AdminGetRegistrationSummaryRequestQuerystring = Static<typeof adminGetRegistrationSummaryRequestQuerystringSchema>

export const adminGetRegistrationSummaryReplySchema = Type.Object({
  registrations: Type.Array(Type.Object({
    date: Type.String(),
    amount: Type.Number()
  }))
})
export type AdminGetRegistrationSummaryReply = Static<typeof adminGetRegistrationSummaryReplySchema>

export const adminGetTopEventTagsOfAllTimeRequestQuerystringSchema = Type.Object({
  top: Type.Number({ default: 10, minimum: 1, maximum: 15 })
})
export type AdminGetTopEventTagsOfAllTimeRequestQuerystring = Static<typeof adminGetTopEventTagsOfAllTimeRequestQuerystringSchema>

export const adminGetTopEventTagsOfAllTimeReplySchema = Type.Object({
  tags: Type.Array(Type.Object({
    tag: Type.String(),
    amount: Type.Number()
  }))
})
export type AdminGetTopEventTagsOfAllTimeReply = Static<typeof adminGetTopEventTagsOfAllTimeReplySchema>
