import t from 'tap'

import { getFileExtension, validateEmail, validatePhoneNumber, validateUsername } from '../src/utils'

void t.test('validate email formats', async t => {
  t.strictSame(validateEmail('an_email@gmail.com'), true)
  t.strictSame(validateEmail('_another_email@gmail.com'), true)
  t.strictSame(validateEmail('this_is_hard@outlook.co.th'), true)
  t.strictSame(validateEmail('abc-@mail.com'), true)
  t.strictSame(validateEmail('abc..def@mail.com'), true)
  t.strictSame(validateEmail('abc-d@mail.com'), true)
  t.strictSame(validateEmail('abc.def@mail.com'), true)
  t.strictSame(validateEmail('abc-def@gmail.org'), true)
  t.strictSame(validateEmail('noreply@reeba.com'), true)

  t.strictSame(validateEmail('sdfdfgmail.com'), false)
  t.strictSame(validateEmail('this.is_hard @gmail.com'), false)
  t.strictSame(validateEmail('abc-def#gmail.com'), false)
  t.strictSame(validateEmail('abc-def@gmail#archive.com'), false)
})

void t.test('validate username formats', async t => {
  t.strictSame(validateUsername('a'), true)
  t.strictSame(validateUsername('abc'), true)
  t.strictSame(validateUsername('AbC'), true)
  t.strictSame(validateUsername('Chang'), true)
  t.strictSame(validateUsername('123sdfdf'), true)
  t.strictSame(validateUsername('Chang_international'), true)

  t.strictSame(validateUsername('Chang international'), false)
  t.strictSame(validateUsername(' sdfdf'), false)
  t.strictSame(validateUsername(''), false)
  t.strictSame(validateUsername('longgggggggggggggggggggggggggggggg'), false)
})

void t.test('validate file extensions', async t => {
  t.strictSame(getFileExtension('imgur_image.png'), 'png')
  t.strictSame(getFileExtension('imgur_image.PNG'), 'PNG')
  t.strictSame(getFileExtension('imgur_image.jpg'), 'jpg')
  t.strictSame(getFileExtension('imgur_image.JPG'), 'JPG')
  t.strictSame(getFileExtension('imgur_image.jpeg'), 'jpeg')
  t.strictSame(getFileExtension('imgur_image.JPEG'), 'JPEG')

  t.strictSame(getFileExtension('imgur image test.png'), 'png')
  t.strictSame(getFileExtension('imgur image test.PNG'), 'PNG')
  t.strictSame(getFileExtension('imgur image test.jpg'), 'jpg')
  t.strictSame(getFileExtension('imgur image test.JPG'), 'JPG')
  t.strictSame(getFileExtension('imgur image test.jpeg'), 'jpeg')
  t.strictSame(getFileExtension('imgur image test.JPEG'), 'JPEG')

  t.strictSame(getFileExtension('โลกทัศน์ใหม่แห่งการเรียนรู้.png'), 'png')
  t.strictSame(getFileExtension('โลกทัศน์ใหม่แห่งการเรียนรู้.PNG'), 'PNG')
  t.strictSame(getFileExtension('โลกทัศน์ใหม่แห่งการเรียนรู้.jpg'), 'jpg')
  t.strictSame(getFileExtension('โลกทัศน์ใหม่แห่งการเรียนรู้.JPG'), 'JPG')
  t.strictSame(getFileExtension('โลกทัศน์ใหม่แห่งการเรียนรู้.jpeg'), 'jpeg')
  t.strictSame(getFileExtension('โลกทัศน์ใหม่แห่งการเรียนรู้.JPEG'), 'JPEG')

  t.strictSame(getFileExtension('โลกทัศน์ ใหม่แห่งการเรียนรู้.png'), 'png')
  t.strictSame(getFileExtension('โลกทัศน์ ใหม่แห่งการเรียนรู้.PNG'), 'PNG')
  t.strictSame(getFileExtension('โลกทัศน์ ใหม่แห่งการเรียนรู้.jpg'), 'jpg')
  t.strictSame(getFileExtension('โลกทัศน์ ใหม่แห่งการเรียนรู้.JPG'), 'JPG')
  t.strictSame(getFileExtension('โลกทัศน์ ใหม่แห่งการเรียนรู้.jpeg'), 'jpeg')
  t.strictSame(getFileExtension('โลกทัศน์ ใหม่แห่งการเรียนรู้.JPEG'), 'JPEG')

  t.strictSame(getFileExtension('โลกทัศน์.ใหม่แห่งการเรียนรู้.png'), 'png')
  t.strictSame(getFileExtension('โลกทัศน์.ใหม่แห่งการเรียนรู้.PNG'), 'PNG')
  t.strictSame(getFileExtension('โลกทัศน์.ใหม่แห่งการเรียนรู้.jpg'), 'jpg')
  t.strictSame(getFileExtension('โลกทัศน์.ใหม่แห่งการเรียนรู้.JPG'), 'JPG')
  t.strictSame(getFileExtension('โลกทัศน์.ใหม่แห่งการเรียนรู้.jpeg'), 'jpeg')
  t.strictSame(getFileExtension('โลกทัศน์.ใหม่แห่งการเรียนรู้.JPEG'), 'JPEG')

  t.strictSame(getFileExtension('imgur.image.test.png'), 'png')
  t.strictSame(getFileExtension('imgur.image.test.PNG'), 'PNG')
  t.strictSame(getFileExtension('imgur.image.test.jpg'), 'jpg')
  t.strictSame(getFileExtension('imgur.image.test.JPG'), 'JPG')
  t.strictSame(getFileExtension('imgur.image.test.jpeg'), 'jpeg')
  t.strictSame(getFileExtension('imgur.image.test.JPEG'), 'JPEG')

  t.throws(() => {
    getFileExtension('render.md')
  }, 'unmatched file extension')
})

void t.test('validate phone numbers', async t => {
  t.strictSame(validatePhoneNumber('943452365'), true)
  t.strictSame(validatePhoneNumber('442352332444444444444423'), false)
  t.strictSame(validatePhoneNumber('3984873334534244'), false)
  t.strictSame(validatePhoneNumber('398487333453424'), true)
  t.strictSame(validatePhoneNumber(' 4454545423'), false)
  t.strictSame(validatePhoneNumber('445454 5423'), false)
  t.strictSame(validatePhoneNumber('445454\n5423'), false)
  t.strictSame(validatePhoneNumber('445454\t5423'), false)
  t.strictSame(validatePhoneNumber('445454ก5423'), false)
  t.strictSame(validatePhoneNumber('445454ndd5423'), false)
})
