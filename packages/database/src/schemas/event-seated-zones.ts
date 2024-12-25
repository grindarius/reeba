import { relations } from "drizzle-orm"
import { integer, pgTable, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { eventSeatedZoneConfigurations } from "./event-seated-zone-configurations.js"
import { eventZones } from "./event-zones.js"

export const eventSeatedZones = pgTable("event_seated_zones", {
  eventZoneId: varchar("event_zone_id", { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => eventZones.id),

  /**
   * A cache of how many rows and columns of seat configuration
   * this section has.
   */
  rowCount: integer("row_count").notNull(),
  columnCount: integer("column_count").notNull(),
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT
})

export const eventSeatedZonesRelations = relations(
  eventSeatedZones,
  ({ one, many }) => ({
    eventZone: one(eventZones, {
      fields: [eventSeatedZones.eventZoneId],
      references: [eventZones.id]
    }),
    configurations: many(eventSeatedZoneConfigurations)
  })
)
