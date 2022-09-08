import type { FastifyPluginCallback } from 'fastify'
import type { FastifyFrontendEndpointsGeneratorOptions } from './index.js'

export const plugin: FastifyPluginCallback<FastifyFrontendEndpointsGeneratorOptions>
export default plugin

declare module 'fastify' {
  interface FastifyContextConfig {
    /**
     * Used to name a route to generate endpoints file
     */
    name: string
  }
}
