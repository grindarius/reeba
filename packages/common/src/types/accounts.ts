import { Static, Type } from '@sinclair/typebox'

import { t_event_status } from './database'

export const getProfileDataRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetProfileDataRequestParams = Static<typeof getProfileDataRequestParamsSchema>

export const getProfileDataReplySchema = Type.Object({
  email: Type.String(),
  phoneCountryCode: Type.String(),
  phoneNumber: Type.String(),
  iso31662: Type.String(),
  birthdate: Type.String()
})
export type GetProfileDataReply = Static<typeof getProfileDataReplySchema>

export const patchProfileDataRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type PatchProfileDataRequestParams = Static<typeof patchProfileDataRequestParamsSchema>

export const patchProfileDataRequestBodySchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
  phoneCountryCode: Type.String(),
  phoneNumber: Type.String(),
  birthdate: Type.String()
})
export type PatchProfileDataRequestBody = Static<typeof patchProfileDataRequestBodySchema>

export const patchProfileDataReplySchema = Type.Object({
  message: Type.String()
})
export type PatchProfileDataReply = Static<typeof patchProfileDataReplySchema>

export const getMyTicketsRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetMyTicketsRequestParams = Static<typeof getMyTicketsRequestParamsSchema>

export const getMyTicketsReplySchema = Type.Object({
  events: Type.Array(Type.Object({
    id: Type.String(),
    username: Type.String(),
    transactionId: Type.String(),
    name: Type.String(),
    status: Type.Union([
      Type.Literal(t_event_status.open),
      Type.Literal(t_event_status.closed)
    ]),
    venueName: Type.String(),
    time: Type.Object({
      id: Type.String(),
      start: Type.String(),
      end: Type.String()
    }),
    seats: Type.Array(Type.Object({
      id: Type.String(),
      name: Type.String(),
      rowPosition: Type.Number(),
      columnPosition: Type.Number()
    })),
    section: Type.Object({
      id: Type.String(),
      name: Type.String(),
      rowPosition: Type.Number(),
      columnPosition: Type.Number()
    }),
    totalPrice: Type.Number()
  }))
})
export type GetMyTicketsReply = Static<typeof getMyTicketsReplySchema>

export const getOrganizerDataRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetOrganizerDataRequestParams = Static<typeof getOrganizerDataRequestParamsSchema>

export const getOrganizerDataRequestQuerystringSchema = Type.Object({
  page: Type.Number()
})
export type GetOrganizerDataRequestQuerystring = Static<typeof getOrganizerDataRequestQuerystringSchema>

export const getOrganizerDataReplySchema = Type.Object({
  total: Type.Number(),
  events: Type.Array(Type.Object({
    id: Type.String(),
    name: Type.String(),
    venueName: Type.String(),
    venueCoordinates: Type.Object({
      x: Type.String(),
      y: Type.String()
    }),
    status: Type.Union([
      Type.Literal(t_event_status.open),
      Type.Literal(t_event_status.closed)
    ]),
    openingDate: Type.String(),
    creationDate: Type.String(),
    totalDatetimes: Type.Number(),
    totalSections: Type.Number(),
    totalSeats: Type.Number(),
    totalTakenSeats: Type.Number(),
    seatFullnessPercentage: Type.Number()
  }))
})
export type GetOrganizerDataReply = Static<typeof getOrganizerDataReplySchema>

export const getOrganizerEventStatisticsRequestParamsSchema = Type.Object({
  username: Type.String(),
  eventId: Type.String()
})
export type GetOrganizerEventStatisticsRequestParams = Static<typeof getOrganizerEventStatisticsRequestParamsSchema>

export const getOrganizerEventStatisticsReplySchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  status: Type.String(),
  totalSeats: Type.Number(),
  totalTakenSeats: Type.Number(),
  seatFullnessPercentage: Type.Number(),
  grossTicketSales: Type.Number(),
  reebaTicketFees: Type.Number(),
  netPayout: Type.Number()
})
export type GetOrganizerEventStatisticsReply = Static<typeof getOrganizerEventStatisticsReplySchema>

export const getOrganizerEventUsersMapRequestParamsSchema = Type.Object({
  username: Type.String(),
  eventId: Type.String()
})
export type GetOrganizerEventUsersMapRequestParams = Static<typeof getOrganizerEventUsersMapRequestParamsSchema>

export const getOrganizerEventUsersMapReplySchema = Type.Object({
  users: Type.Array(Type.Object({
    country: Type.String(),
    amount: Type.Number()
  }))
})
export type GetOrganizerEventUsersMapReply = Static<typeof getOrganizerEventUsersMapReplySchema>

export const getOrganizerEventOrdersRequestParamsSchema = Type.Object({
  username: Type.String(),
  eventId: Type.String()
})
export type GetOrganizerEventOrdersRequestParams = Static<typeof getOrganizerEventOrdersRequestParamsSchema>

export const getOrganizerEventOrdersReplySchema = Type.Object({
  transactions: Type.Array(Type.Object({
    transactionId: Type.String(),
    username: Type.String(),
    email: Type.String(),
    phoneNumber: Type.String(),
    phoneCountryCode: Type.String(),
    transactionTime: Type.String(),
    datetimeId: Type.String(),
    startDatetime: Type.String(),
    sectionId: Type.String(),
    sectionName: Type.String(),
    sectionRowPosition: Type.Number(),
    sectionColumnPosition: Type.Number(),
    seats: Type.Array(Type.Object({
      seatId: Type.String(),
      seatName: Type.String()
    })),
    totalPrice: Type.Number()
  }))
})
export type GetOrganizerEventOrdersReply = Static<typeof GetOrganizerEventOrdersReplySchema>
