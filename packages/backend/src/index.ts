import fastify, { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import { exit } from 'process'

import routes from './routes'

const PORT = 3000

const createServer = (): FastifyInstance => {
  const server = fastify({
    logger: true
  })

  void server.register(cors)
  void server.register(helmet, { enableCSPNonces: true })

  void server.register(routes)

  return server
}

createServer().listen(PORT).then((address) => {
  console.log(`Server is running at ${address}`)
}).catch((e) => {
  console.trace(e)
  exit(1)
})
