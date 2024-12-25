import { relations } from "drizzle-orm"
import { numeric, pgTable, varchar } from "drizzle-orm/pg-core"
import { bytea } from "../bytea.js"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { eventZones } from "./event-zones.js"
import { events } from "./events.js"

export const eventTicketPrices = pgTable("event_ticket_prices", {
  id: varchar("id", { length: 26 }).notNull().primaryKey(),
  eventId: varchar("event_id", { length: 26 })
    .notNull()
    .references(() => events.id),
  color: bytea("color").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT
})

export const eventTicketPricesRelations = relations(
  eventTicketPrices,
  ({ one, many }) => ({
    event: one(events, {
      fields: [eventTicketPrices.eventId],
      references: [events.id]
    }),
    zones: many(eventZones)
  })
)
