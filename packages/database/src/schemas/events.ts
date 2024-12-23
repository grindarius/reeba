import { relations } from "drizzle-orm"
import {
  integer,
  pgTable,
  point,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { accountRoles } from "./account-roles.js"
import { eventSchedules } from "./event-datetimes.js"
import { eventTicketPrices } from "./event-ticket-prices.js"

export const events = pgTable("events", {
  id: varchar("id", { length: 26 }).notNull().primaryKey(),
  key: varchar("key", { length: 32 }).notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  coverImageKey: text("cover_image_key"),
  externalWebsite: text("external_website"),
  venueName: text("venue_name").notNull(),
  ticketSellingDate: timestamp("ticket_selling_date", {
    withTimezone: true,
    mode: "string"
  }).notNull(),
  venueCoordinates: point("venue_coordinates").notNull(),
  venueCountryCode: varchar("venue_country_code", { length: 2 }).notNull(),
  venueTimezone: text("venue_timezone").notNull(),
  minimumAge: integer("minimum_age"),
  maximumAge: integer("maximum_age"),
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT
})

export const eventsRelations = relations(events, ({ many }) => ({
  accountRoles: many(accountRoles),
  ticketPrices: many(eventTicketPrices),
  schedules: many(eventSchedules)
}))
