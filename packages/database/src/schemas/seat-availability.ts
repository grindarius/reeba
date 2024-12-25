import { pgEnum } from "drizzle-orm/pg-core"

export const SEAT_AVAILABILITY = [
  "available",
  "holding-for-checkout",
  "unavailable"
] as const
export const seatAvailability = pgEnum("seat_availability", SEAT_AVAILABILITY)
