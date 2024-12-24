import postgres from "postgres"

export function usePostgres(): postgres.Sql {
  const runtimeConfig = useRuntimeConfig()

  console.info(runtimeConfig)

  return postgres({
    user: runtimeConfig.postgresUser,
    pass: runtimeConfig.postgresPassword,
    host: runtimeConfig.postgresHost,
    port: Number(runtimeConfig.postgresPort),
    database: runtimeConfig.postgresDatabase
  })
}
