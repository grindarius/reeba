import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import signinRoute from './signin'
import signupRoute from './signup'
import verificationRoute from './verification'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  void instance.register(signinRoute)
  void instance.register(signupRoute)
  void instance.register(verificationRoute)
}
