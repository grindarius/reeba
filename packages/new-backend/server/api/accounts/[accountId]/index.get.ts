import { accounts } from '@reeba/database'
import { eq } from 'drizzle-orm'

export default defineEventHandler({
  handler: async event => {
    const accountId = getRouterParam(event, 'accountId')

    if (accountId == null) {
      throw createError({
        status: 400,
        statusMessage: 'Bad Request',
        message: 'Parameter should have required property `accountId`.'
      })
    }

    const db = useDrizzle()

    const account = await db.query.accounts.findFirst({
      where: eq(accounts.id, accountId),
      columns: {
        id: true,
        username: true
      }
    })

    return {
      username: account.username
    }
  }
})
