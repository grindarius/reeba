import { pgEnum } from "drizzle-orm/pg-core"

export const TRANSACTION_STATUS = ["pending", "success", "failed"] as const
export const transactionStatus = pgEnum(
  "transaction_status",
  TRANSACTION_STATUS
)
