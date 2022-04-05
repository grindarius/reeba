
import { Static, Type } from '@sinclair/typebox'

import { t_event_status } from './database'

export const AdminGetUserDataSortByOptionSchema = Type.Union([
  Type.Literal('name-asc'),
  Type.Literal('name-desc'),
  Type.Literal('regis-asc'),
  Type.Literal('regis-desc')
])
export type AdminGetUserDataOptions = Static<typeof AdminGetUserDataSortByOptionSchema>

export const AdminGetUserDataRequestQuerystringSchema = Type.Object({
  page: Type.Number({ default: 1 }),
  sort: AdminGetUserDataSortByOptionSchema
})
export type AdminGetUserDataRequestQuerystring = Static<typeof AdminGetUserDataRequestQuerystringSchema>

export const AdminGetUserDataReplySchema = Type.Object({
  total: Type.Number(),
  users: Type.Array(Type.Object({
    username: Type.String(),
    email: Type.String(),
    isAdmin: Type.Boolean(),
    isVerified: Type.Boolean(),
    registrationDatetime: Type.String()
  }))
})
export type AdminGetUserDataReply = Static<typeof AdminGetUserDataReplySchema>

export const AdminGrantAdminRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminGrantAdminRequestParams = Static<typeof AdminGrantAdminRequestParamsSchema>

export const AdminGrantAdminReplySchema = Type.Object({
  message: Type.String()
})
export type AdminGrantAdminReply = Static<typeof AdminGrantAdminReplySchema>

export const AdminRevokeAdminRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminRevokeAdminRequestParams = Static<typeof AdminRevokeAdminRequestParamsSchema>

export const AdminRevokeAdminReplySchema = Type.Object({
  message: Type.String()
})
export type AdminRevokeAdminReply = Static<typeof AdminRevokeAdminReplySchema>

export const AdminGrantVerificationRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminGrantVerificationRequestParams = Static<typeof AdminGrantVerificationRequestParamsSchema>

export const AdminGrantVerificationReplySchema = Type.Object({
  message: Type.String()
})
export type AdminGrantVerificationReply = Static<typeof AdminGrantVerificationReplySchema>

export const AdminRevokeVerificationRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminRevokeVerificationRequestParams = Static<typeof AdminRevokeVerificationRequestParamsSchema>

export const AdminRevokeVerificationReplySchema = Type.Object({
  message: Type.String()
})
export type AdminRevokeVerificationReply = Static<typeof AdminRevokeVerificationReplySchema>

export const AdminRemoveUserRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type AdminRemoveUserRequestParams = Static<typeof AdminRemoveUserRequestParamsSchema>

export const AdminRemoveUserReplySchema = Type.Object({
  message: Type.String()
})
export type AdminRemoveUserReply = Static<typeof AdminRemoveUserReplySchema>

export const AdminGetTransactionDataSortByOptionSchema = Type.Union([
  Type.Literal('time-asc'),
  Type.Literal('time-desc'),
  Type.Literal('price-asc'),
  Type.Literal('price-desc'),
  Type.Literal('username-asc'),
  Type.Literal('username-desc')
])
export type AdminGetTransactionDataSortByOption = Static<typeof AdminGetTransactionDataSortByOptionSchema>

export const AdminGetTransactionDataRequestQuerystringSchema = Type.Object({
  page: Type.Number({ default: 1 }),
  sort: AdminGetTransactionDataSortByOptionSchema
})
export type AdminGetTransactionDataRequestQuerystring = Static<typeof AdminGetTransactionDataRequestQuerystringSchema>

export const AdminGetTransactionDataReplySchema = Type.Object({
  total: Type.Number(),
  transactions: Type.Array(Type.Object({
    transactionId: Type.String(),
    username: Type.String(),
    time: Type.String(),
    seats: Type.Array(Type.String()),
    totalPriceWithVat: Type.Number()
  }))
})
export type AdminGetTransactionDataReply = Static<typeof AdminGetTransactionDataReplySchema>

export const AdminGetEventDataSortByOptionSchema = Type.Union([
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
export type AdminGetEventDataSortByOption = Static<typeof AdminGetEventDataSortByOptionSchema>

export const EventStatusSchema = Type.Union([
  Type.Literal(t_event_status.open),
  Type.Literal(t_event_status.closed)
])
export type EventStatus = Static<typeof EventStatusSchema>

export const AdminGetEventDataRequestQuerystringSchema = Type.Object({
  page: Type.Number({ default: 1 }),
  sort: AdminGetEventDataSortByOptionSchema
})
export type AdminGetEventDataRequestQuerystring = Static<typeof AdminGetEventDataRequestQuerystringSchema>

export const AdminGetEventDataReplySchema = Type.Object({
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
    status: EventStatusSchema,
    minTicketPrice: Type.Number(),
    maxTicketPrice: Type.Number(),
    minimumAge: Type.Number(),
    totalTakenSeats: Type.Number(),
    totalSeats: Type.Number(),
    seatFullnessPercentage: Type.Number()
  }))
})
export type AdminGetEventDataReply = Static<typeof AdminGetEventDataReplySchema>

export const PostManipulateEventRequestParamsSchema = Type.Object({
  eventId: Type.String()
})
export type PostManipulateEventRequestParams = Static<typeof PostManipulateEventRequestParamsSchema>

export const PostManipulateEventRequestBodySchema = Type.Object({
  targetStatus: Type.Union([
    Type.Literal(t_event_status.closed),
    Type.Literal(t_event_status.open)
  ])
})
export type PostManipulateEventRequestBody = Static<typeof PostManipulateEventRequestBodySchema>

export const PostManipulateEventReplySchema = Type.Object({
  message: Type.String()
})
export type PostManipulateEventReply = Static<typeof PostManipulateEventReplySchema>

export const AdminGetStatisticsSummaryRequestQuerystringSchema = Type.Object({
  start: Type.String(),
  end: Type.String()
})
export type AdminGetStatisticsSummaryRequestQuerystring = Static<typeof AdminGetStatisticsSummaryRequestQuerystringSchema>

export const AdminGetStatisticsSummaryReplySchema = Type.Object({
  totalUsers: Type.Number(),
  newUsersThisMonth: Type.Number(),
  newUsersPastMonth: Type.Number(),
  newUsersPercentageDifferenceToLastMonth: Type.Number(),
  totalEvents: Type.Number(),
  newEventsThisMonth: Type.Number(),
  newEventsPastMonth: Type.Number(),
  newEventsPercentageDifferenceToLastMonth: Type.Number()
})
export type AdminGetStatisticsSummaryReply = Static<typeof AdminGetStatisticsSummaryReplySchema>

export const AdminGetMapsDataRequestQuerystringSchema = Type.Object({
  start: Type.String(),
  end: Type.String()
})
export type AdminGetMapsDataRequestQuerystring = Static<typeof AdminGetMapsDataRequestQuerystringSchema>

export const MapsDataSchema = Type.Array(
  Type.Object({
    country: Type.String(),
    amount: Type.Number()
  })
)
export type MapsData = Static<typeof MapsDataSchema>

export const AdminGetMapsDataReplySchema = Type.Object({
  users: MapsDataSchema,
  events: MapsDataSchema
})
export type AdminGetMapsDataReply = Static<typeof AdminGetMapsDataReplySchema>
