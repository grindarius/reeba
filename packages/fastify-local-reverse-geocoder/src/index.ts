import type { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

import {
  type LookupResult as GeoRevLookupResult,
  type Options as CreateRevGeocoderOptions,
  type Point as GeoRevPoint,
  createRevGeocoder
} from '@webkitty/geo-rev'

const plugin: FastifyPluginAsync<CreateRevGeocoderOptions> = async (instance, opts) => {
  const revGeocoder = await createRevGeocoder(opts)

  instance.decorate('lookup', (point: GeoRevPoint): GeoRevLookupResult => {
    return revGeocoder.lookup(point)
  })
}

export default fp(plugin, {
  name: 'fastify-local-reverse-geocoder',
  fastify: '5.x'
})
