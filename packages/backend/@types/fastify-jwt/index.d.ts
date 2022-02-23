import { t_user_role } from '@reeba/common'

import 'fastify-jwt'

declare module 'fastify-jwt' {
  interface FastifyJWT {
    payload: {
      username: string
      role: t_user_role
    }

    user: {
      username: string
      role: t_user_role
    }
  }
}
