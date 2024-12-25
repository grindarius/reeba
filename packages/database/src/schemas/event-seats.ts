import { relations } from "drizzle-orm"
import { pgTable, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { eventSeatedZoneConfigurations } from "./event-seated-zone-configurations.js"
import { seatAvailability } from "./seat-availability.js"

export const eventSeats = pgTable("event_seats", {
  id: varchar("id", { length: 26 }).notNull().primaryKey(),
  rowId: varchar("row_id", { length: 26 })
    .notNull()
    .references(() => eventSeatedZoneConfigurations.id),
  columnId: varchar("column_id", {
    length: 26
  })
    .notNull()
    .references(() => eventSeatedZoneConfigurations.id),
  availability: seatAvailability("availability").notNull(),
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT
})

export const eventSeatsRelations = relations(eventSeats, ({ one }) => ({
  zoneConfiguration: one(eventSeatedZoneConfigurations, {
    fields: [eventSeats.rowId, eventSeats.columnId],
    references: [
      eventSeatedZoneConfigurations.id,
      eventSeatedZoneConfigurations.id
    ]
  })
}))
