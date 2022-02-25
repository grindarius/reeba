import { Dayjs } from 'dayjs'

/**
 * Store event start and end time as a pair in create event page
 */
export interface ReebAEventDatetime {
  from: Dayjs
  to: Dayjs
}

export interface ReebAEventPrice {
  color: string
  price: number
}

export interface ReebAExtendedEventPrice extends ReebAEventPrice {
  currency: 'USD' | 'EUR' | 'CAD' | 'THB'
}

export interface ReebAEventSeat {
  rowPosition: number
  columnPosition: number
  price: number
}

export interface ReebAEventSection {
  rowPosition: number
  columnPosition: number
  seats: Array<Array<ReebAEventSeat>>
}

export interface ReebAEvent {
  name: string
  description: string
  website: string
  venueName: string
  venueCoordinates: {
    x: string
    y: string
  }
  openingDate: string
  ticketPrices: Array<ReebAEventPrice>
  tags: Array<string>
  datetimes: Array<ReebAEventDatetime>
  sections: Array<Array<ReebAEventSection>>
}
