import dotenv from 'dotenv-flow'
import { dirname, resolve } from 'node:path'
import { exit } from 'node:process'
import { fileURLToPath } from 'node:url'

import createServer from './app.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({
  path: resolve(__dirname, '..'),
  silent: true
})

const port = process.env['PORT'] ?? '3000'

const server = await createServer()

server.listen({ port: Number(port) }, (error, _) => {
  if (error != null) {
    server.log.error(error)
    exit()
  }
})
