import { relations } from 'drizzle-orm'
import { numeric, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { CREATED_AT, UPDATED_AT } from '../time.js'
import { accounts } from './accounts.js'
import { ticketPurchases } from './ticket-purchases.js'
import { transactionStatus } from './transaction-status.js'
import { transactionType } from './transaction-type.js'

export const transactions = pgTable('transactions', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  type: transactionType('transaction_type').notNull(),
  status: transactionStatus('transaction_status').notNull(),
  accountId: varchar('account_id', { length: 26 })
    .notNull()
    .references(() => accounts.id),
  price: numeric('price', { precision: 12, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('THB'),
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT
})

export const transactionsRelations = relations(
  transactions,
  ({ one, many }) => ({
    account: one(accounts, {
      fields: [transactions.accountId],
      references: [accounts.id]
    }),
    ticketPurchases: many(ticketPurchases)
  })
)
