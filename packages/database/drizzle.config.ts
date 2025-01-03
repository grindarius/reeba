import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schemas/*",
  dbCredentials: {
    user: process.env.NITRO_POSTGRES_USER ?? "",
    password: process.env.NITRO_POSTGRES_PASSWORD ?? "",
    host: process.env.NITRO_POSTGRES_HOST ?? "",
    port: Number(process.env.NITRO_POSTGRES_PORT ?? 0),
    database: process.env.NITRO_POSTGRES_DATABASE ?? ""
  },
  out: "./src/migrations"
})
