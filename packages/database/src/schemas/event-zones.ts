import { relations } from "drizzle-orm"
import { pgTable, unique, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { eventSchedules } from "./event-schedules.js"
import { eventZoneType } from "./event-zone-type.js"
import { eventZoneNames } from "./event-zone-names.js"

export const eventZones = pgTable(
  "event_zones",
  {
    id: varchar("id", { length: 26 }).notNull().primaryKey(),
    eventZoneNameId: varchar("event_zone_name_id", { length: 26 })
      .notNull()
      .references(() => eventZoneNames.id),
    eventScheduleId: varchar("event_schedule_id", { length: 26 })
      .notNull()
      .references(() => eventSchedules.id),
    zoneType: eventZoneType("zone_type").notNull(),
    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT
  },
  t => [
    unique("event_zones_unique_zone_name_schedule").on(
      t.eventZoneNameId,
      t.eventScheduleId
    )
  ]
)

export const eventZonesRelations = relations(eventZones, ({ one }) => ({
  schedule: one(eventSchedules, {
    fields: [eventZones.eventScheduleId],
    references: [eventSchedules.id]
  }),
  zoneName: one(eventZoneNames, {
    fields: [eventZones.eventZoneNameId],
    references: [eventZoneNames.id]
  })
}))
