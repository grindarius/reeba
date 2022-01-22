import dotenv from 'dotenv-flow'
import { resolve } from 'node:path'
import t from 'tap'

import createServer from '../../src/app'

dotenv.config({
  path: resolve(__dirname, '..', '..')
})

void t.todo('Get image', async t => {
  const app = createServer()

  t.teardown(async () => await app.close())

  void t.todo('get default user image', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        path: '/avatars'
      })

      console.log(response.json())
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error')
    }
  })
})
