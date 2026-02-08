import { sql } from 'drizzle-orm'
import { bigint, text, boolean, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: bigint('id', { mode: 'bigint' }).notNull().generatedAlwaysAsIdentity().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').$defaultFn(() => !1),
  image: text('image'),
  username: varchar('username', { length: 32 }).notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .$onUpdateFn(() => sql`now()`),
})
