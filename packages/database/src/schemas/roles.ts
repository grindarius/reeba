import { relations } from "drizzle-orm"
import { pgTable, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { accountRoles } from "./account-roles.js"
import { rolePermissions } from "./role-permissions.js"

export const roles = pgTable("roles", {
  id: varchar("id", { length: 26 }).notNull().primaryKey(),
  key: varchar("key", { length: 32 }).notNull().unique(),
  name: varchar("name", { length: 64 }).notNull(),
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT
})

export const rolesRelations = relations(roles, ({ many }) => ({
  rolePermissions: many(rolePermissions),
  accountRoles: many(accountRoles)
}))
