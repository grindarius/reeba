import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  AdminRemoveUserReply,
  AdminRemoveUserReplySchema,
  AdminRemoveUserRequestParams,
  AdminRemoveUserRequestParamsSchema,
  t_user_role
} from '@reeba/common'

const schema: FastifySchema = {
  params: AdminRemoveUserRequestParamsSchema,
  response: {
    200: AdminRemoveUserReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.delete<{ Params: AdminRemoveUserRequestParams, Reply: AdminRemoveUserReply }>(
    '/:username',
    {
      schema,
      onRequest: [
        instance.authenticate,
        async (request, reply) => {
          if (request.user.role !== t_user_role.admin) {
            void reply.code(403)
            throw new Error('forbidden')
          }
        }
      ],
      preValidation: async (request, reply) => {
        if (request.params.username == null || request.params.username === '') {
          void reply.code(400)
          throw new Error('params should have required property \'username\'')
        }
      }
    },
    async (request) => {
      await instance.pg.query(
        'update "users" set user_deletion_status = $1 where user_username = $2',
        [true, request.params.username]
      )

      return {
        message: 'complete'
      }
    }
  )
}
