/**
 * Convert 0-based index into Excel column where it wraps back from 'Z' to 'AA' and so on.
 *
 * @param position position that you want to wrap back.
 * @returns a string of column name
 * @link https://stackoverflow.com/a/64456745/12386405
 */
export const numberToLetters = (position: number): string => {
  if (position < 0) {
    throw new Error('property \'position\' cannot be less than 0')
  }

  let letters = ''
  while (position >= 0) {
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[position % 26] + letters
    position = Math.floor(position / 26) - 1
  }
  return letters
}
