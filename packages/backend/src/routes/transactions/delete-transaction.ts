import { FastifyInstance, FastifyPluginOptions } from "fastify"

import {
  DeleteTransactionReply,
  DeleteTransactionReplySchema,
  DeleteTransactionRequestParams,
  DeleteTransactionRequestParamsSchema
} from "@reeba/common"

export default async (
  instance: FastifyInstance,
  _: FastifyPluginOptions
): Promise<void> => {
  instance.delete<{
    Params: DeleteTransactionRequestParams
    Reply: DeleteTransactionReply
  }>(
    "/:transactionId",
    {
      schema: {
        params: DeleteTransactionRequestParamsSchema,
        response: {
          200: DeleteTransactionReplySchema
        }
      },
      onRequest: [instance.authenticate],
      config: {
        name: "DeleteTransaction"
      }
    },
    async request => {
      return await instance.pg.transact<{ message: string }>(async client => {
        await client.query(
          'delete from "transaction_details" where transaction_id = $1',
          [request.params.transactionId]
        )

        await client.query(
          'delete from "transactions" where transaction_id = $1',
          [request.params.transactionId]
        )

        return {
          message: "complete"
        }
      })
    }
  )
}
