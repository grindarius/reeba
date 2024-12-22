import { sql } from "drizzle-orm"
import { timestamp } from "drizzle-orm/pg-core"

export const CREATED_AT = timestamp("created_at", {
  withTimezone: true,
  mode: "string"
})
  .notNull()
  .defaultNow()

export const UPDATED_AT = timestamp("updated_at", {
  withTimezone: true,
  mode: "string"
})
  .notNull()
  .defaultNow()
  .$onUpdateFn(() => sql`now()`)
