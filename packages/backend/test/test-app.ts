import { fastify, type FastifyInstance } from "fastify"

export const makeTestApp = (): FastifyInstance => {
  const server = fastify({
    logger: false
  })

  return server
}
