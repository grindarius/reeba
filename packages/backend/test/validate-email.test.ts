import t from 'tap'

import { validateEmail } from '../src/utils'

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
