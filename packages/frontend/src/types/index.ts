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

export interface TransactionStoreSection {
  id: string
  rowPosition: number
  columnPosition: number
  seats: Map<string, TransactionStoreSeat>
}

export type TransactionStoreSeat = Omit<TransactionStoreSection, 'id' | 'seats'> & {
  price: number
}

export interface TransactionStore {
  eventId: string
  datetimeId: string
  section: TransactionStoreSection
}

export enum EVENT_PRICE {
  ANY = 'ANY',
  // <300
  PRICE_LEVEL_1 = '<300',
  // <600
  PRICE_LEVEL_2 = '<600',
  // <1,200
  PRICE_LEVEL_3 = '<1200',
  // <2,400
  PRICE_LEVEL_4 = '<2400',
  // <4,800
  PRICE_LEVEL_5 = '<4800',
  // <7,200
  PRICE_LEVEL_6 = '<7200',
  // <10,000
  PRICE_LEVEL_7 = '<10000'
}
