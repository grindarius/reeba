import postgres from "postgres"

export function usePostgres(): postgres.Sql {
  const config = useRuntimeConfig()

  return postgres({
    user: config.database.user,
    pass: config.database.password,
    host: config.database.host,
    port: config.database.port,
    database: config.database.database,
    onnotice: () => {}
  })
}
