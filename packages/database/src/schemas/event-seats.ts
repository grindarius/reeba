import { pgTable, varchar } from "drizzle-orm/pg-core"

export const eventSeats = pgTable("event_seats", {
  id: varchar("id", { length: 26 }).notNull().primaryKey()
})
