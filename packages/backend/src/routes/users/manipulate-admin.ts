import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import {
  AdminGrantAdminReply,
  AdminGrantAdminReplySchema,
  AdminGrantAdminRequestParams,
  AdminGrantAdminRequestParamsSchema,
  AdminRevokeAdminReply,
  AdminRevokeAdminReplySchema,
  AdminRevokeAdminRequestParams,
  AdminRevokeAdminRequestParamsSchema,
  t_user_role
} from '@reeba/common'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.patch<{ Params: AdminGrantAdminRequestParams, Reply: AdminGrantAdminReply }>(
    '/:username/admin',
    {
      schema: {
        params: AdminGrantAdminRequestParamsSchema,
        response: {
          200: AdminGrantAdminReplySchema
        }
      },
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
        'update "users" set user_role = $1 where user_username = $2',
        [t_user_role.admin, request.params.username]
      )

      return {
        message: 'complete'
      }
    }
  )

  instance.delete<{ Params: AdminRevokeAdminRequestParams, Reply: AdminRevokeAdminReply }>(
    '/:username/admin',
    {
      schema: {
        params: AdminRevokeAdminRequestParamsSchema,
        response: {
          200: AdminRevokeAdminReplySchema
        }
      },
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
        'update "users" set user_role = $1 where user_username = $2',
        [t_user_role.user, request.params.username]
      )

      return {
        message: 'complete'
      }
    }
  )
}
