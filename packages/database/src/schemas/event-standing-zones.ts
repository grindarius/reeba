import { relations } from "drizzle-orm"
import { integer, pgTable, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { eventZones } from "./event-zones.js"

export const eventStandingZones = pgTable("event_standing_zones", {
  eventZoneId: varchar("id", { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => eventZones.id),

  /**
   * Count of how many persons could a zone fit.
   * The count needs to be greater than 0. If
   * the count is `null`, then it means there's no limit
   * to how many persons could this zone fit.
   */
  count: integer("count").notNull(),
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT
})

export const eventStandingZonesRelations = relations(
  eventStandingZones,
  ({ one }) => ({
    eventZone: one(eventZones, {
      fields: [eventStandingZones.eventZoneId],
      references: [eventZones.id]
    })
  })
)
