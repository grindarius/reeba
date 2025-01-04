// https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2024-12-23',
  runtimeConfig: {
    database: {
      user: process.env?.NITRO_POSTGRES_USER,
      password: process.env?.NITRO_POSTGRES_PASSWORD,
      host: process.env?.NITRO_POSTGRES_HOST,
      port: Number(process.env?.NITRO_POSTGRES_PORT),
      database: process.env?.NITRO_POSTGRES_DATABASE
    }
  }
})
