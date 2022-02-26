import { ReebAEventSeat, ReebAEventSection } from '@/types'
import { numberToLetters } from './string'

/**
 * A function to generate basic seating sections for previews.
 *
 * @param row Amount of rows, accept only values more than 0.
 * @param column Amount of columns, accept only values more than 0.
 * @returns 2d array of string representing seat sections.
 */
export const generateEventSections = (row: number, column: number): Array<Array<string>> => {
  if (row <= 0) {
    throw new Error('property \'row\' cannot be less than or equal to 0')
  }

  if (column <= 0) {
    throw new Error('property \'column\' cannot be less than or equal to 0')
  }

  return Array.from<Array<string>, Array<string>>({ length: Math.floor(row) }, (_, u) => {
    return Array.from<string, string>({ length: Math.floor(column) }, (_, v) => `${numberToLetters(u)}${v + 1}`)
  })
}

export const actualEventSectionsGenerator = (row: number, column: number, initialSeats: Array<Array<ReebAEventSeat>>): Array<Array<ReebAEventSection>> => {
  if (row <= 0) {
    throw new Error('property \'row\' cannot be less than or equal to 0')
  }

  if (column <= 0) {
    throw new Error('property \'column\' cannot be less than or equal to 0')
  }

  return Array.from<Array<ReebAEventSection>, Array<ReebAEventSection>>({ length: Math.floor(row) }, (_, u) => {
    return Array.from<ReebAEventSection, ReebAEventSection>({ length: Math.floor(column) }, (_, v) => {
      return {
        rowPosition: u,
        columnPosition: v,
        seats: initialSeats
      }
    })
  })
}
