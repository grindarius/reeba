import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import getAvatars from './get-avatars'
import postAvatars from './post-avatars'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(getAvatars)
  void instance.register(postAvatars)
}
