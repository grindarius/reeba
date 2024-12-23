import { relations } from "drizzle-orm"
import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT } from "../time.js"
import { accounts } from "./accounts.js"
import { events } from "./events.js"
import { roles } from "./roles.js"

export const accountRoles = pgTable(
  "account_roles",
  {
    accountId: varchar("account_id", { length: 26 })
      .notNull()
      .references(() => accounts.id),
    eventId: varchar("event_id", { length: 26 })
      .notNull()
      .references(() => events.id),
    roleId: varchar("role_id", { length: 26 })
      .notNull()
      .references(() => roles.id),
    createdAt: CREATED_AT
  },
  t => [primaryKey({ columns: [t.accountId, t.eventId, t.roleId] })]
)

export const accountRolesRelations = relations(accountRoles, ({ one }) => ({
  account: one(accounts, {
    fields: [accountRoles.accountId],
    references: [accounts.id]
  }),
  event: one(events, {
    fields: [accountRoles.eventId],
    references: [events.id]
  }),
  role: one(roles, {
    fields: [accountRoles.roleId],
    references: [roles.id]
  })
}))
