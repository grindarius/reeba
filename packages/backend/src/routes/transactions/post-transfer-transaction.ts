import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  PostTransferTransactionReplySchema,
  PostTransferTransactionRequestBodySchema,
  PostTransferTransactionRequestParamsSchema
} from '@reeba/common'

const schema: FastifySchema = {
  params: PostTransferTransactionRequestParamsSchema,
  body: PostTransferTransactionRequestBodySchema,
  response: PostTransferTransactionReplySchema
}

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post(
    '/:transactionId/transfer',
    {
      schema
    },
    async () => {
      return {
        w: 'orld'
      }
    }
  )
}
