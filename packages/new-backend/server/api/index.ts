import { events } from '@reeba/database'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async _event => {
  const db = useDrizzle()

  const result = await db.select().from(events).where(eq(events.id, '2'))
  return 'Start by editing <code>server/routes/index.ts</code>.'
})
