import t from 'tap'

import { numberToLetters } from '../src/utils'

void t.test('number to letters', (t) => {
  t.plan(5)

  t.strictSame(numberToLetters(0), 'A')
  t.strictSame(numberToLetters(5), 'F')
  t.strictSame(numberToLetters(25), 'Z')
  t.strictSame(numberToLetters(26), 'AA')

  t.throws(() => {
    numberToLetters(-1)
  }, 'property \'position\' cannot be less than 0')
})
