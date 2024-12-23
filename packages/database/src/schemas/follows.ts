import { relations } from "drizzle-orm"
import { pgTable, primaryKey, varchar } from "drizzle-orm/pg-core"
import { accounts } from "./accounts.js"

export const follows = pgTable(
  "follows",
  {
    followerId: varchar("follower_id", { length: 26 })
      .notNull()
      .references(() => accounts.id),
    followingId: varchar("following_id", { length: 26 })
      .notNull()
      .references(() => accounts.id)
  },
  t => [primaryKey({ columns: [t.followerId, t.followingId] })]
)

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(accounts, {
    relationName: "follower",
    fields: [follows.followerId],
    references: [accounts.id]
  }),
  followed: one(accounts, {
    relationName: "followed",
    fields: [follows.followingId],
    references: [accounts.id]
  })
}))
