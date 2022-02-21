import { FastifyPluginAsync } from 'fastify'
import { FastifyJWTOptions } from 'fastify-jwt'

export interface CheckJWTPluginOptions extends FastifyJWTOptions {}

export const plugin: FastifyPluginAsync<CheckJWTPluginOptions>

export default plugin

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}
