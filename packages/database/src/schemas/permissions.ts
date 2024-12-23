import { relations } from "drizzle-orm"
import { pgTable, unique, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT } from "../time.js"
import { accessMethod } from "./access-method.js"
import { entities } from "./entities.js"
import { rolePermissions } from "./role-permissions.js"

export const permissions = pgTable(
  "permissions",
  {
    id: varchar("id", { length: 26 }).notNull().primaryKey(),
    method: accessMethod("access_method").notNull(),
    entityId: varchar("entity_id", { length: 26 })
      .notNull()
      .references(() => entities.id),
    createdAt: CREATED_AT
  },
  t => [unique("permissions_unique_entity_method").on(t.method, t.entityId)]
)

export const permissionsRelations = relations(permissions, ({ one, many }) => ({
  entity: one(entities, {
    fields: [permissions.entityId],
    references: [entities.id]
  }),
  rolePermissions: many(rolePermissions)
}))
