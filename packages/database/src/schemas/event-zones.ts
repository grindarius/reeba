import { pgTable, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"

export const eventZones = pgTable("event_zones", {
  id: varchar("id", { length: 26 }).notNull().primaryKey(),
  key: varchar("key", { length: 26 }).notNull(),
  name: varchar("name", { length: 64 }).notNull(),
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT
})
