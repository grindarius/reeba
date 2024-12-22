import { relations, sql } from "drizzle-orm"
import {
  boolean,
  date,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar
} from "drizzle-orm/pg-core"
import { CREATED_AT, UPDATED_AT } from "../time.js"
import { accountSocialMedias } from "./account-social-medias.js"

export const accounts = pgTable(
  "accounts",
  {
    id: varchar("id", { length: 26 }).notNull().primaryKey(),
    username: varchar("username", { length: 64 }).notNull().unique(),
    email: text("email").notNull(),
    profileDescription: text("profile_description").notNull().default(""),
    password: text("password").notNull(),
    registrationDatetime: timestamp("registration_datetime", {
      withTimezone: true,
      mode: "string"
    }).defaultNow(),
    profileImagePath: text("profile_image_path"),
    emailVerificationStatus: boolean("email_verification_status").default(
      false
    ),
    countryCode: varchar("country_code", { length: 2 }),
    phoneNumber: text("phone_number"),
    birthdate: date("birthdate"),
    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT
  },
  t => [uniqueIndex("email_lowercase_index").on(sql`lower(${t.email})`)]
)

export const accountsRelations = relations(accounts, ({ many }) => ({
  accountSocialMedias: many(accountSocialMedias)
}))
