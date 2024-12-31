import { pgEnum } from "drizzle-orm/pg-core"

export const TRANSACTION_TYPE = [
  "ticket-purchase",
  "ticket-transference"
] as const
export const transactionType = pgEnum("transaction_type", TRANSACTION_TYPE)
