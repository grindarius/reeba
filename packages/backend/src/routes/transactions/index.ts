import { FastifyInstance, FastifyPluginOptions } from "fastify"

import deleteTransactionRoute from "./delete-transaction"
import getTransactionRoute from "./get-transaction"
import postTransactionRoute from "./post-transaction"
import postTransferTransactionRoute from "./post-transfer-transaction"

export default async (
  instance: FastifyInstance,
  _: FastifyPluginOptions
): Promise<void> => {
  void instance.register(deleteTransactionRoute)
  void instance.register(getTransactionRoute)
  void instance.register(postTransactionRoute)
  void instance.register(postTransferTransactionRoute)
}
