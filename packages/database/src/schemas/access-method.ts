import { pgEnum } from "drizzle-orm/pg-core"

export const ACCESS_METHOD = [
  "list",
  "get",
  "create",
  "update",
  "delete"
] as const
export const accessMethod = pgEnum("access_method", ACCESS_METHOD)
