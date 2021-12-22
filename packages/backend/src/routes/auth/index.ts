import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import { LoginParams, LoginParamsSchema, RegisterParams, RegisterParamsSchema } from '@reeba/common'

const loginSchema: FastifySchema = {
  body: LoginParamsSchema
}

const registerSchema: FastifySchema = {
  body: RegisterParamsSchema
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Body: LoginParams }>('/login', { schema: loginSchema }, async (request) => {
    const { email, password } = request.body

    return {
      message: `you have been to the login route, email is ${email}, password is ${password}`
    }
  })

  instance.post<{ Body: RegisterParams }>('/register', { schema: registerSchema }, async (request) => {
    const { username, email, password } = request.body

    return {
      message: `you have been to the register route, username is ${username}, email is ${email}, password is ${password}`
    }
  })
}
