import t from 'tap'

import { EventTags, normalizeTag } from '../src'

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
  tags.forEach(tag => {
    t.strictSame(normalizeTag(tag[0]), tag[1])
  })
})
