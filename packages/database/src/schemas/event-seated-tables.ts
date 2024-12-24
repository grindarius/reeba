import { pgTable, varchar } from "drizzle-orm/pg-core"
import { eventSeatedZones } from "./event-seated-zones.js"

export const eventSeatedTables = pgTable("event_seated_tables", {
  id: varchar("id", { length: 26 }).notNull().primaryKey(),
  eventSeatedZoneId: varchar("event_seated_zone_id", { length: 26 })
    .notNull()
    .references(() => eventSeatedZones.eventZoneId),

})
