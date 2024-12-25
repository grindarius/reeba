import { pgEnum } from "drizzle-orm/pg-core"

export const ORIENTATION = ["row", "column"] as const
export const orientation = pgEnum("table_orientation", ORIENTATION)
