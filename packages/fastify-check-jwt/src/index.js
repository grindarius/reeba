const jwt = require('fastify-jwt')
const fp = require('fastify-plugin')

const plugin = async (instance, opts) => {
  instance.register(jwt, opts)

  instance.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (error) {
      reply.send(error)
    }
  })
}

module.exports = fp(plugin, { name: 'fastify-check-jwt', fastify: '3.x' })
