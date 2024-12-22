import { relations } from "drizzle-orm"
import { pgTable, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { accountSocialMedias } from "./account-social-medias.js"

export const socialMedias = pgTable("social_medias", {
  id: varchar("id", { length: 26 }).notNull().primaryKey(),
  slug: varchar("slug", { length: 32 }).notNull().unique(),
  name: varchar("name", { length: 64 }).notNull(),
  createdAt: CREATED_AT,
  updatedAt: UPDATED_AT
})

export const socialMediasRelations = relations(socialMedias, ({ many }) => ({
  accounts: many(accountSocialMedias)
}))
