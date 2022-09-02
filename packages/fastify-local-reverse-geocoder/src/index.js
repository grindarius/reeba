const fp = require('fastify-plugin')
const { createRevGeocoder } = require('@webkitty/geo-rev')

const plugin = async (instance, opts) => {
  const revGeocoder = await createRevGeocoder(opts)

  instance.decorate('lookup', (point) => {
    return revGeocoder.lookup(point)
  })
}

module.exports = fp(plugin, { name: 'fastify-local-reverse-geocoder', fastify: '4.x' })
