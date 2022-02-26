import { Dayjs } from 'dayjs'

/**
 * Store event start and end time as a pair in create event page
 */
export interface ReebAEventDatetime {
  start: Dayjs
  end: Dayjs
}

export interface ReebAEventPrice {
  color: string
  price: number
}

export interface ReebAExtendedEventPrice extends ReebAEventPrice {
  currency: 'USD' | 'EUR' | 'CAD' | 'THB'
}

export interface ReebAEventSeat {
  seatRowPosition: number
  seatColumnPosition: number
  seatPrice: number
}

export interface ReebAEventSection {
  sectionRowPosition: number
  sectionColumnPosition: number
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
