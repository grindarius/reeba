import dotenv from 'dotenv-flow'
import { resolve } from 'path'
import { exit } from 'process'

import createServer from './app'

dotenv.config({
  path: resolve(__dirname, '..')
})

const PORT = process.env.PORT ?? 3000

const server = createServer()

server.listen(Number(PORT), (error, address) => {
  if (error != null) {
    server.log.error(error)
    exit(1)
  }

  console.log(`Server is running at ${address}`)
})
