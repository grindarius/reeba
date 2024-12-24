import { relations } from "drizzle-orm"
import { pgTable, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { eventZones } from "./event-zones.js"
import { events } from "./events.js"

export const eventZoneNames = pgTable("event_zones", {
  id: varchar("id", { length: 26 }).notNull().primaryKey(),
  eventId: varchar("event_id", { length: 26 })
    .notNull()
    .references(() => events.id),
  key: varchar("key", { length: 32 }).notNull(),
  name: varchar("name", { length: 64 }).notNull(),
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT
})

export const eventZoneNamesRelations = relations(
  eventZoneNames,
  ({ one, many }) => ({
    event: one(events, {
      fields: [eventZoneNames.eventId],
      references: [events.id]
    }),
    zones: many(eventZones)
  })
)
