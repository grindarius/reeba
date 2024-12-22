import { relations } from "drizzle-orm"
import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core"
import { CREATED_AT } from "../time.js"
import { accounts } from "./accounts.js"
import { socialMedias } from "./social-medias.js"

export const accountSocialMedias = pgTable(
  "account_social_medias",
  {
    accountId: varchar("account_id", { length: 26 })
      .notNull()
      .references(() => accounts.id),
    socialMediaId: varchar("social_media_id", { length: 26 })
      .notNull()
      .references(() => socialMedias.id),
    createdAt: CREATED_AT
  },
  t => [primaryKey({ columns: [t.accountId, t.socialMediaId] })]
)

export const accountSocialMediasRelations = relations(
  accountSocialMedias,
  ({ one }) => ({
    socialMedia: one(socialMedias, {
      fields: [accountSocialMedias.socialMediaId],
      references: [socialMedias.id]
    }),
    account: one(accounts, {
      fields: [accountSocialMedias.accountId],
      references: [accounts.id]
    })
  })
)
