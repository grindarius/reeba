import { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.all(
    '/verification',
    {
      onRequest: instance.authenticate
    },
    async (request) => {
      const user = request.user

      return {
        user
      }
    }
  )
}
