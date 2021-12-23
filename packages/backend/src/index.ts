import dotenv from 'dotenv'
import fastify, { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import jwt from 'fastify-jwt'
import pg from 'fastify-postgres'
import { exit } from 'process'

import routes from './routes'

dotenv.config()

const PORT = process.env.FASTIFY_PORT ?? 3000

const createServer = (): FastifyInstance => {
  const server = fastify({
    logger: true
  })

  const pgUsername = process.env.POSTGRES_USERNAME
  const pgPassword = process.env.POSTGRES_PASSWORD
  const pgHostname = process.env.POSTGRES_HOSTNAME
  const pgPort = process.env.POSTGRES_PORT
  const pgDBName = process.env.POSTGRES_DBNAME
  const jwtSecret = process.env.JWT_SECRET

  if (
    pgUsername == null ||
    pgPassword == null ||
    pgHostname == null ||
    pgPort == null ||
    pgDBName == null ||
    jwtSecret == null
  ) {
    throw new Error('Missing one of postgres related credentials, or jwt secret')
  }

  void server.register(cors)
  void server.register(helmet, { enableCSPNonces: true })
  void server.register(routes)
  void server.register(pg, {
    connectionString: `postgres://${pgUsername}:${encodeURIComponent(pgPassword)}@${pgHostname}:${pgPort}/${pgDBName}`
  })
  void server.register(jwt, {
    secret: jwtSecret
  })

  return server
}

createServer().listen(Number(PORT)).then((address) => {
  console.log(`Server is running at ${address}`)
}).catch((e) => {
  console.trace(e)
  exit(1)
})
