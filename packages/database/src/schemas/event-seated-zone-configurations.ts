import { relations } from "drizzle-orm"
import { index, integer, pgTable, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { eventSeatedZones } from "./event-seated-zones.js"
import { eventSeats } from "./event-seats.js"
import { orientation } from "./orientation.js"

export const eventSeatedZoneConfigurations = pgTable(
  "event_seated_zone_configurations",
  {
    id: varchar("id", { length: 26 }).notNull().primaryKey(),
    eventSeatedZoneId: varchar("event_seated_zone_id", { length: 26 })
      .notNull()
      .references(() => eventSeatedZones.eventZoneId),
    name: varchar("name", { length: 64 }).notNull(),
    orientation: orientation("orientation").notNull(),

    /**
     * A 0-indexed integer that denotes the order of rows/columns
     * when being shown to the UI.
     */
    order: integer("order").notNull().default(0),
    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT
  },
  t => [index("seated_tables_orientation_index").on(t.order)]
)

export const eventSeatedZoneConfigurationsRelations = relations(
  eventSeatedZoneConfigurations,
  ({ one, many }) => ({
    seatedZone: one(eventSeatedZones, {
      fields: [eventSeatedZoneConfigurations.eventSeatedZoneId],
      references: [eventSeatedZones.eventZoneId]
    }),
    seats: many(eventSeats)
  })
)
