import { relations } from "drizzle-orm"
import { pgTable, unique, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { eventSchedules } from "./event-schedules.js"
import { eventSeatedZones } from "./event-seated-zones.js"
import { eventStandingZones } from "./event-standing-zones.js"
import { eventTicketPrices } from "./event-ticket-prices.js"
import { eventZoneNames } from "./event-zone-names.js"
import { eventZoneType } from "./event-zone-type.js"

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
    eventTicketPriceId: varchar("event_ticket_price_id", { length: 26 })
      .notNull()
      .references(() => eventTicketPrices.id),
    zoneType: eventZoneType("zone_type").notNull(),
    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT
  },
  t => [
    unique("event_zones_unique_name_schedule").on(
      t.eventZoneNameId,
      t.eventScheduleId
    )
  ]
)

export const eventZonesRelations = relations(eventZones, ({ one }) => ({
  zoneName: one(eventZoneNames, {
    fields: [eventZones.eventZoneNameId],
    references: [eventZoneNames.id]
  }),
  schedule: one(eventSchedules, {
    fields: [eventZones.eventScheduleId],
    references: [eventSchedules.id]
  }),
  ticketPrice: one(eventTicketPrices, {
    fields: [eventZones.eventTicketPriceId],
    references: [eventTicketPrices.id]
  }),
  standingZone: one(eventStandingZones),
  seatedZone: one(eventSeatedZones)
}))
