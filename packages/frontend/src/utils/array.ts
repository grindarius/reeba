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
