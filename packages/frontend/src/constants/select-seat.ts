type zoneAlphabets = 'A' | 'B' | 'C' | 'D' | 'E'
type zoneNumbers = '1' | '2' | '3' | '4' | '5'

type ZoneSection = `${zoneAlphabets}${zoneNumbers}`

interface Zone {
  id: number
  zone: ZoneSection
  ticketPrices: Array<number>
  ticketPriceColors: Array<string>
  seatRows: number
  seatColumns: number
}

export const zoneData: Array<Zone> = [
  {
    id: 1,
    zone: 'A1',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 2,
    zone: 'A2',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 3,
    zone: 'A3',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 4,
    zone: 'A4',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 5,
    zone: 'A5',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 6,
    zone: 'B1',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 7,
    zone: 'B2',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 8,
    zone: 'B3',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 9,
    zone: 'B4',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 10,
    zone: 'B5',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 11,
    zone: 'C1',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 12,
    zone: 'C2',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 13,
    zone: 'C3',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 14,
    zone: 'C4',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  },
  {
    id: 15,
    zone: 'C5',
    ticketPrices: [2000, 3000, 4000, 5000, 6000],
    ticketPriceColors: ['#FFCC69', '#B1CE81', '#FFB178', '#CE5BA0', '#AE8EF3'],
    seatRows: 5,
    seatColumns: 10
  }
]

export const zoneRows: number = 3
export const zoneColumns: number = 5
export const alphabet: Array<string> = ['A', 'B', 'C', 'D', 'F']
