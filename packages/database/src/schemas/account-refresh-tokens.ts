import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { accounts } from "./accounts.js"

export const accountRefreshTokens = pgTable("account_refresh_tokens", {
  id: varchar("id", { length: 26 }).notNull().primaryKey(),
  accountId: varchar("account_id", { length: 26 })
    .notNull()
    .references(() => accounts.id),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "string"
  }).notNull()
})

export const accountRefreshTokensRelations = relations(
  accountRefreshTokens,
  ({ one }) => ({
    account: one(accounts, {
      fields: [accountRefreshTokens.accountId],
      references: [accounts.id]
    })
  })
)
