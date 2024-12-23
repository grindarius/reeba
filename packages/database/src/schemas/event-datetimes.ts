import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { events } from "./events.js"

export const eventSchedules = pgTable("event_schedules", {
  id: varchar("id").notNull().primaryKey(),
  eventId: varchar("event_id")
    .notNull()
    .references(() => events.id),
  start: timestamp("start", { withTimezone: true, mode: "string" }).notNull(),
  startLocal: timestamp("start_local", {
    withTimezone: false,
    mode: "string"
  }).notNull(),
  ianaTimezone: text("iana_timezone").notNull(),
  end: timestamp("end", { withTimezone: true, mode: "string" }),
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT
})

export const eventSchedulesRelations = relations(eventSchedules, ({ one }) => ({
  event: one(events, {
    fields: [eventSchedules.eventId],
    references: [events.id]
  })
}))
