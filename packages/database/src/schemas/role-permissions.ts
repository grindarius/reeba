import { relations } from "drizzle-orm"
import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT } from "../time.js"
import { permissions } from "./permissions.js"
import { roles } from "./roles.js"

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: varchar("role_id", { length: 26 })
      .notNull()
      .references(() => roles.id),
    permissionId: varchar("permission_id", { length: 26 })
      .notNull()
      .references(() => permissions.id),
    createdAt: CREATED_AT
  },
  t => [primaryKey({ columns: [t.roleId, t.permissionId] })]
)

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id]
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id]
    })
  })
)
