import dotenv from 'dotenv-flow'
import { resolve } from 'node:path'
import { exit } from 'node:process'

import createServer from './app'

dotenv.config({
  path: resolve(__dirname, '..'),
  silent: true
})

const PORT = process.env.PORT ?? '3000'

const server = createServer()

server.listen(PORT, (error, _) => {
  if (error != null) {
    server.log.error(error)
    exit()
  }
})
