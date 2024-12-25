import { pgTable, varchar } from "drizzle-orm/pg-core";

export const transactions = pgTable('transactions', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  type: tra
})
