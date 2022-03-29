import { FastifyInstance, FastifyPluginOptions } from 'fastify'

import {
  AdminGrantVerificationReply,
  AdminGrantVerificationReplySchema,
  AdminGrantVerificationRequestParams,
  AdminGrantVerificationRequestParamsSchema,
  AdminRevokeVerificationReply,
  AdminRevokeVerificationReplySchema,
  AdminRevokeVerificationRequestParams,
  AdminRevokeVerificationRequestParamsSchema,
  BadRequestReplySchema,
  ForbiddenReplySchema,
  t_user_role
} from '@reeba/common'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.patch<{ Params: AdminGrantVerificationRequestParams, Reply: AdminGrantVerificationReply }>(
    '/:username/verification',
    {
      schema: {
        params: AdminGrantVerificationRequestParamsSchema,
        response: {
          200: AdminGrantVerificationReplySchema,
          400: BadRequestReplySchema,
          403: ForbiddenReplySchema
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
        'update "users" set user_verification_status = $1 where user_username = $2',
        [true, request.params.username]
      )

      return {
        message: 'complete'
      }
    }
  )

  instance.delete<{ Params: AdminRevokeVerificationRequestParams, Reply: AdminRevokeVerificationReply }>(
    '/:username/verification',
    {
      schema: {
        params: AdminRevokeVerificationRequestParamsSchema,
        response: {
          200: AdminRevokeVerificationReplySchema,
          400: BadRequestReplySchema,
          403: ForbiddenReplySchema
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
        'update "users" set user_verification_status = $1 where user_username = $2',
        [false, request.params.username]
      )

      return {
        message: 'complete'
      }
    }
  )
}
