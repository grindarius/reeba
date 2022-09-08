import type { FastifyPluginCallback, RouteOptions } from 'fastify'
import fp from 'fastify-plugin'

interface FastifyFrontendEndpointsGeneratorOptions {
  destinationFilePath: string
  blacklistRoutes?: Array<string>
}

const plugin: FastifyPluginCallback<FastifyFrontendEndpointsGeneratorOptions> = (instance, opts, done) => {
  if (opts.blacklistRoutes == null) {
    opts.blacklistRoutes = []
  }

  const routes: Array<RouteOptions> = []

  instance.addHook('onRoute', route => {
    routes.push(route)
  })

  instance.addHook('onReady', done => {
    console.log(routes)
    done()
  })

  done()
}

export default fp(plugin, {
  name: 'fastify-frontend-endpoints-generator',
  fastify: '4.x'
})

export type {
  FastifyFrontendEndpointsGeneratorOptions
}
