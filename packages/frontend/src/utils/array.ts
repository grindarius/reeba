import { ReebAEventSeat, ReebAEventSection } from '@/types'

export const generateEventSections = (row: number, column: number, initialSeats: Array<Array<ReebAEventSeat>>): Array<Array<ReebAEventSection>> => {
  if (row <= 0) {
    throw new Error('property \'row\' cannot be less than or equal to 0')
  }

  if (column <= 0) {
    throw new Error('property \'column\' cannot be less than or equal to 0')
  }

  return Array.from<Array<ReebAEventSection>, Array<ReebAEventSection>>({ length: Math.floor(row) }, (_, u) => {
    return Array.from<ReebAEventSection, ReebAEventSection>({ length: Math.floor(column) }, (_, v) => {
      return {
        sectionRowPosition: u,
        sectionColumnPosition: v,
        seats: initialSeats
      }
    })
  })
}

export const generateEventSeats = (row: number, column: number, initialPrice: number): Array<Array<ReebAEventSeat>> => {
  if (row <= 0) {
    throw new Error('property \'row\' cannot be less than or equal to 0')
  }

  if (column <= 0) {
    throw new Error('property \'column\' cannot be less than or equal to 0')
  }

  return Array.from<Array<ReebAEventSeat>, Array<ReebAEventSeat>>({ length: Math.floor(row) }, (_, u) => {
    return Array.from<ReebAEventSeat, ReebAEventSeat>({ length: Math.floor(column) }, (_, v) => {
      return {
        seatRowPosition: u,
        seatColumnPosition: v,
        seatPrice: initialPrice
      }
    })
  })
}

export const increase2DArrayDimension = <T>(initialArray: Array<Array<T>>, direction: 'row' | 'column'): Array<Array<T>> => {
  if (direction === 'row') {
    const lastRowIndex = initialArray.length
    const lastRow = JSON.parse(JSON.stringify(initialArray[lastRowIndex - 1]))

    initialArray.push(lastRow)

    return initialArray
  }

  const lastColumnIndex = initialArray[0].length
  const lastColumn = JSON.parse(JSON.stringify(initialArray.map(item => item[lastColumnIndex - 1])))

  return initialArray.map((elem, index) => {
    elem.push(lastColumn[index])
    return elem
  })
}

export const decrease2DArrayDimension = <T>(initialArray: Array<Array<T>>, direction: 'row' | 'column'): Array<Array<T>> => {
  if (initialArray.length - 1 === 0) {
    throw new Error('index will run out of range')
  }

  if (initialArray[0].length - 1 === 0) {
    throw new Error('index will run out of range')
  }

  if (direction === 'row') {
    initialArray.pop()
    return initialArray
  }

  return initialArray.map((elem) => {
    elem.pop()
    return elem
  })
}
