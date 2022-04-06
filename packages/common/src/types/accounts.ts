import { Static, Type } from '@sinclair/typebox'

import { t_event_status } from './database'

export const GetProfileDataRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetProfileDataRequestParams = Static<typeof GetProfileDataRequestParamsSchema>

export const GetProfileDataReplySchema = Type.Object({
  email: Type.String(),
  phoneCountryCode: Type.String(),
  phoneNumber: Type.String(),
  iso31662: Type.String(),
  birthdate: Type.String()
})
export type GetProfileDataReply = Static<typeof GetProfileDataReplySchema>

export const PatchProfileDataRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type PatchProfileDataRequestParams = Static<typeof PatchProfileDataRequestParamsSchema>

export const PatchProfileDataRequestBodySchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
  phoneCountryCode: Type.String(),
  phoneNumber: Type.String(),
  birthdate: Type.String()
})
export type PatchProfileDataRequestBody = Static<typeof PatchProfileDataRequestBodySchema>

export const PatchProfileDataReplySchema = Type.Object({
  message: Type.String()
})
export type PatchProfileDataReply = Static<typeof PatchProfileDataReplySchema>

export const GetMyTicketsRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetMyTicketsRequestParams = Static<typeof GetMyTicketsRequestParamsSchema>

export const GetMyTicketsReplySchema = Type.Object({
  events: Type.Array(Type.Object({
    id: Type.String(),
    username: Type.String(),
    transactionId: Type.String(),
    name: Type.String(),
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
export type GetMyTicketsReply = Static<typeof GetMyTicketsReplySchema>

export const GetOrganizerDataRequestParamsSchema = Type.Object({
  username: Type.String()
})
export type GetOrganizerDataRequestParams = Static<typeof GetOrganizerDataRequestParamsSchema>

export const GetOrganizerDataRequestQuerystringSchema = Type.Object({
  page: Type.Number()
})
export type GetOrganizerDataRequestQuerystring = Static<typeof GetOrganizerDataRequestQuerystringSchema>

export const GetOrganizerDataReplySchema = Type.Object({
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
export type GetOrganizerDataReply = Static<typeof GetOrganizerDataReplySchema>

export const GetOrganizerEventStatisticsRequestParamsSchema = Type.Object({
  username: Type.String(),
  eventId: Type.String()
})
export type GetOrganizerEventStatisticsRequestParams = Static<typeof GetOrganizerEventStatisticsRequestParamsSchema>

export const GetOrganizerEventStatisticsReplySchema = Type.Object({
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
export type GetOrganizerEventStatisticsReply = Static<typeof GetOrganizerEventStatisticsReplySchema>

export const GetOrganizerEventUsersMapRequestParamsSchema = Type.Object({
  username: Type.String(),
  eventId: Type.String()
})
export type GetOrganizerEventUsersMapRequestParams = Static<typeof GetOrganizerEventUsersMapRequestParamsSchema>

export const GetOrganizerEventUsersMapReplySchema = Type.Object({
  users: Type.Array(Type.Object({
    country: Type.String(),
    amount: Type.Number()
  }))
})
export type GetOrganizerEventUsersMapReply = Static<typeof GetOrganizerEventUsersMapReplySchema>
