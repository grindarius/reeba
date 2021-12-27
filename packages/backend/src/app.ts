import dotenv from 'dotenv-flow'
import fastify, { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import jwt from 'fastify-jwt'
import pg from 'fastify-postgres'
import { resolve } from 'path'

import routes from './routes'

dotenv.config({
  path: resolve(__dirname, '..')
})

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
    pgUsername == null || pgUsername === '' ||
    pgPassword == null || pgPassword === '' ||
    pgHostname == null || pgHostname === '' ||
    pgPort == null || pgPort === '' ||
    pgDBName == null || pgDBName === ''
  ) {
    throw new Error('Missing one of postgres related credentials, or jwt secret')
  }

  if (jwtSecret == null || jwtSecret === '') {
    throw new Error('Missing jwt secret')
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

export default createServer
