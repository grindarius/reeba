import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  PostManipulateEventReply,
  PostManipulateEventReplySchema,
  PostManipulateEventRequestBody,
  PostManipulateEventRequestBodySchema,
  PostManipulateEventRequestParams,
  PostManipulateEventRequestParamsSchema,
  t_user_role
} from '@reeba/common'

const schema: FastifySchema = {
  params: PostManipulateEventRequestParamsSchema,
  body: PostManipulateEventRequestBodySchema,
  response: {
    200: PostManipulateEventReplySchema
  }
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post<{ Params: PostManipulateEventRequestParams, Body: PostManipulateEventRequestBody, Reply: PostManipulateEventReply }>(
    '/:eventId/manipulate',
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
      preValidation: [
        async (request, reply) => {
          // @ts-expect-error this could be empty string
          if (request.body.targetStatus == null || request.body.targetStatus === '') {
            void reply.code(400)
            throw new Error('body should have required property \'targetStatus\'')
          }
        }
      ]
    },
    async (request, reply) => {
      const ev = await instance.pg.query(
        'select event_name from "events" where event_id = $1',
        [request.params.eventId]
      )

      if (ev.rowCount === 0) {
        void reply.code(404)
        throw new Error('event not found')
      }

      await instance.pg.query(
        'update "events" set event_status = $1 where event_id = $2',
        [request.body.targetStatus, request.params.eventId]
      )

      return {
        message: 'complete'
      }
    }
  )
}
