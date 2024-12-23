import { FastifyPluginAsync } from "fastify"

import { FastifyJWTOptions } from "@fastify/jwt"
import { t_user_role } from "@reeba/common"

export const plugin: FastifyPluginAsync<FastifyJWTOptions>

export default plugin

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>
  }
}

declare module "@fastify/jwt" {
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
