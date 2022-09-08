import dotenv from 'dotenv-flow'
import fastify, { FastifyInstance } from 'fastify'
import favicon from 'fastify-favicon'
import { join, resolve } from 'node:path'

import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import multipart from '@fastify/multipart'
import pg from '@fastify/postgres'
import printRoutes from '@fastify/routes'
import servestatic from '@fastify/static'
import jwt from '@reeba/fastify-check-jwt'
import endpoints from '@reeba/fastify-frontend-endpoints-generator'
import geocoder from '@reeba/fastify-local-reverse-geocoder'

import routes from './routes/index.js'

dotenv.config({
  path: resolve(__dirname, '..'),
  silent: true
})

const createServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
  /* istanbul ignore if */
    logger: process.env['BACKEND_TEST_ENV'] === 'true'
      ? false
      : {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard'
            }
          }
        }
  })

  const pgUsername = process.env['POSTGRES_USERNAME']
  const pgPassword = process.env['POSTGRES_PASSWORD'] ?? ''
  const pgHostname = process.env['POSTGRES_HOSTNAME']
  const pgPort = process.env['POSTGRES_PORT']
  const pgDBName = process.env['POSTGRES_DBNAME']
  const jwtSecret = process.env['JWT_SECRET']
  const argon2Pepper = process.env['ARGON2_PEPPER']

  /* istanbul ignore if */
  if (
    pgUsername == null || pgUsername === '' ||
    // * password check can be ignored because some db clients does not need password access
    // pgPassword == null || pgPassword === '' ||
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

  /* istanbul ignore if */
  if (argon2Pepper == null || argon2Pepper === '') {
    throw new Error('missing argon2 pepper')
  }

  await server.register(favicon, { path: join(__dirname, '..', 'assets'), name: 'favicon.ico' })
  await server.register(multipart)
  await server.register(servestatic, {
    root: join(__dirname, '..', 'uploads'),
    prefix: '/uploads/'
  })
  await server.register(cors)
  await server.register(helmet)
  await server.register(pg, {
    connectionString: `postgres://${pgUsername}:${encodeURIComponent(pgPassword)}@${pgHostname}:${pgPort}/${pgDBName}`
  })
  await server.register(jwt, {
    secret: jwtSecret
  })
  await server.register(printRoutes)
  await server.register(geocoder)

  await server.register(routes)
  await server.register(endpoints, {
    destinationFilePath: resolve(__dirname, '..', '..', 'frontend', 'src', 'api', 'endpoints.ts'),
    blacklistRoutes: ['GetContactInfo', 'VerifyAuthentication']
  })

  return await server
}

export default createServer
