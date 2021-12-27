import t from 'tap'

import createServer from '../src/app'

void t.test('Requesting / route', async t => {
  const app = createServer()

  t.teardown(async () => await app.close())

  try {
    const response = await app.inject({
      method: 'GET',
      url: '/'
    })

    t.equal(response.statusCode, 200, 'Return status code of 200')
    t.same(response.json(),
      {
        author: 'Bhattarapong Somwong',
        description: 'Please contact bhattarapongs62@nu.ac.th for contrubition.'
      },
      'Return object of email and author for contribution.'
    )
  } catch (error) {
    t.error(error)
    t.fail('Error while requesting the route')
  }
})
