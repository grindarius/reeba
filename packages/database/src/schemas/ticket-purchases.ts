import { relations } from "drizzle-orm"
import { pgTable, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT } from "../time.js"
import { transactions } from "./transactions.js"

export const ticketPurchases = pgTable("ticket_purchases", {
  id: varchar("id", { length: 26 }).notNull().primaryKey(),
  transactionId: varchar("transaction_id", { length: 26 })
    .notNull()
    .references(() => transactions.id),
  createdAt: CREATED_AT
})

export const ticketPurchasesRelations = relations(
  ticketPurchases,
  ({ one }) => ({
    transaction: one(transactions, {
      fields: [ticketPurchases.transactionId],
      references: [transactions.id]
    }),
  })
)
