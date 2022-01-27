import dotenv from 'dotenv-flow'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import t from 'tap'

import createServer from '../../src/app'

dotenv.config({
  path: resolve(__dirname, '..', '..')
})

void t.test('Get image', async t => {
  const app = createServer()

  t.teardown(async () => await app.close())

  void t.test('get default user image', async t => {
    try {
      const response = await app.inject({
        method: 'GET',
        path: '/avatars/'
      })

      const imageFromApi = response.rawPayload
      const defaultImage = await readFile(resolve(__dirname, '..', '..', 'uploads', 'default-user-profile.png'))

      t.strictSame(Buffer.compare(imageFromApi, defaultImage), 0)
    } catch (error) {
      t.error(error)
      t.fail('There should not be an error')
    }
  })
})
