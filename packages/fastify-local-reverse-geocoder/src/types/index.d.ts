import {
  LookupResult as GeoRevLookupResult,
  Options as CreateRevGeocoderOptions,
  Point as GeoRevPoint
} from '@webkitty/geo-rev'

export const plugin: FastifyPluginAsync<CreateRevGeocoderOptions>

export default plugin

declare module 'fastify' {
  interface FastifyInstance {
    lookup: (point: GeoRevPoint) => GeoRevLookupResult
  }
}
