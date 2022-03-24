import dotenv from 'dotenv-flow'
import fastify, { FastifyInstance } from 'fastify'
import cors from 'fastify-cors'
import favicon from 'fastify-favicon'
import helmet from 'fastify-helmet'
import multipart from 'fastify-multipart'
import pg from 'fastify-postgres'
import printRoutes from 'fastify-routes'
import servestatic from 'fastify-static'
import { IncomingMessage, Server, ServerResponse } from 'node:http'
import { join, resolve } from 'node:path'
import { Logger } from 'pino'

import jwt from '@reeba/fastify-check-jwt'

import routes from './routes'

dotenv.config({
  path: resolve(__dirname, '..'),
  silent: true
})

const createServer = (): FastifyInstance<Server, IncomingMessage, ServerResponse, Logger> => {
  const server = fastify<Server, IncomingMessage, ServerResponse, Logger>({
  /* istanbul ignore if */
    logger: process.env.BACKEND_TEST_ENV === 'true'
      ? false
      : {
          prettyPrint: {
            colorize: true,
            translateTime: 'SYS:standard'
          }
        }
  })

  const pgUsername = process.env.POSTGRES_USERNAME
  const pgPassword = process.env.POSTGRES_PASSWORD
  const pgHostname = process.env.POSTGRES_HOSTNAME
  const pgPort = process.env.POSTGRES_PORT
  const pgDBName = process.env.POSTGRES_DBNAME
  const jwtSecret = process.env.JWT_SECRET

  /* istanbul ignore if */
  if (
    pgUsername == null || pgUsername === '' ||
    pgPassword == null || pgPassword === '' ||
    pgHostname == null || pgHostname === '' ||
    pgPort == null || pgPort === '' ||
    pgDBName == null || pgDBName === ''
  ) {
    throw new Error('missing one of postgres related credentials')
  }

  /* istanbul ignore if */
  if (jwtSecret == null || jwtSecret === '') {
    throw new Error('missing jwt secret')
  }

  void server.register(favicon, { path: join(__dirname, '..', 'assets'), name: 'favicon.ico' })
  void server.register(multipart)
  void server.register(servestatic, {
    root: join(__dirname, '..', 'uploads'),
    prefix: '/uploads/'
  })
  void server.register(cors)
  void server.register(helmet)
  void server.register(pg, {
    connectionString: `postgres://${pgUsername}:${encodeURIComponent(pgPassword)}@${pgHostname}:${pgPort}/${pgDBName}`
  })
  void server.register(jwt, {
    secret: jwtSecret
  })
  void server.register(printRoutes)

  void server.register(routes)

  return server
}

export default createServer
