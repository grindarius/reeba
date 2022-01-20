import t from 'tap'

import { validateEmail, validateUsername } from '../src/utils'

void t.test('Validate email formats', async t => {
  t.strictSame(validateEmail('an_email@gmail.com'), true)
  t.strictSame(validateEmail('_another_email@gmail.com'), true)
  t.strictSame(validateEmail('this_is_hard@outlook.co.th'), true)
  t.strictSame(validateEmail('this.is_hard @gmail.com'), false)
  t.strictSame(validateEmail('sdfdfgmail.com'), false)

  t.strictSame(validateEmail('abc-@mail.com'), true)
  t.strictSame(validateEmail('abc..def@mail.com'), true)
  t.strictSame(validateEmail('abc-d@mail.com'), true)
  t.strictSame(validateEmail('abc.def@mail.com'), true)
  t.strictSame(validateEmail('abc-def#gmail.com'), false)
  t.strictSame(validateEmail('abc-def@gmail#archive.com'), false)
  t.strictSame(validateEmail('abc-def@gmail.org'), true)
  t.strictSame(validateEmail('noreply@reeba.com'), true)
})

void t.test('Validate username formats', async t => {
  t.strictSame(validateUsername('a'), true)
  t.strictSame(validateUsername('abc'), true)
  t.strictSame(validateUsername('AbC'), true)
  t.strictSame(validateUsername('Chang'), true)
  t.strictSame(validateUsername('Chang international'), false)
  t.strictSame(validateUsername('Chang_international'), true)
  t.strictSame(validateUsername(' sdfdf'), false)
  t.strictSame(validateUsername('123sdfdf'), false)
})
