import { FastifyPluginCallback } from "fastify-plugin"

interface FastifyFrontendEndpointsGeneratorOptions {
  /**
   * Where to put the generated files
   */
  path: string
  /**
   * Which endpoint names to exclude from the generation process
   */
  blacklist?: Array<string>
}

export const plugin: FastifyPluginCallback<FastifyFrontendEndpointsGeneratorOptions>

export default plugin

declare module "fastify" {
  interface FastifyContextConfig {
    /**
     * Used to name a route to generate endpoints file
     */
    name: string
  }
}
