import { pgTable, varchar } from "drizzle-orm/pg-core"
import { eventSchedules } from "./event-schedules.js"
import { eventZoneNames } from "./event-zone-names.js"
import { eventZones } from "./event-zones.js"

export const eventSeatedZones = pgTable("event_seated_zones", {
  eventZoneId: varchar("event_zone_id", { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => eventZones.id),
})
