import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'

import jwt, { type FastifyJWTOptions } from '@fastify/jwt'

const plugin: FastifyPluginAsync<FastifyJWTOptions> = async (instance, opts) => {
  await instance.register(jwt, opts)

  instance.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (error) {
      await reply.send(error)
    }
  })
}

export default fp(plugin, {
  name: 'fastify-check-jwt',
  fastify: '5.x'
})
