import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> {
  instance.get('/', async () => {
    return {
      author: 'Bhattarapong Somwong',
      description: 'Please contact bhattarapongs62@nu.ac.th for contrubition.'
    }
  })
}
