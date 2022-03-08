import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post('/', async () => {
    return {
      hello: 'world'
    }
  })
}
