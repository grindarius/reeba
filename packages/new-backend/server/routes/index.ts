import { usePostgres } from "~/utils/use-postgres.js"

export default eventHandler(event => {
  const sql = usePostgres()
  const runtimeConfig = useRuntimeConfig(event)

  console.info('from server', runtimeConfig)

  sql`select 1+1`
  return "Start by editing <code>server/routes/index.ts</code>."
})
