import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get('/login', async () => {
    return {
      message: 'you have been to the right route'
    }
  })
}
