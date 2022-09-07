import t from 'tap'

import { EventTags, normalizeTag, numberToLetters } from '../src/index.js'

const tags: Array<[EventTags, string]> = [
  ['Amphitheater', 'amphitheater'],
  ['Business', 'business'],
  ['Concert', 'concert'],
  ['Entertainment', 'entertainment'],
  ['Fan meet', 'fan-meet'],
  ['Gameshow', 'gameshow'],
  ['Lifestyle', 'lifestyle'],
  ['Live', 'live'],
  ['Musical', 'musical'],
  ['Online', 'online'],
  ['Opera', 'opera'],
  ['Seminar', 'seminar'],
  ['Stand up comedy', 'stand-up-comedy'],
  ['Technology', 'technology'],
  ['Variety', 'variety']
]

void t.test('string normalizer', t => {
  t.plan(1)
  t.strictSame(tags.map(x => normalizeTag(x[0])), tags.map(x => x[1]))
})

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
