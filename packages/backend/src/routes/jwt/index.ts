import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Headers: { 'x-access-token': string } }>(
    '/jwt',
    {
      onRequest: async (request) => {
        await request.jwtVerify()
      }
    },
    async (request) => {
      const user = request.user

      return {
        user
      }
    }
  )
}
