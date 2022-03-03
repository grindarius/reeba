import dotenv from 'dotenv-flow'
import { resolve } from 'node:path'
import { Pool, QueryConfig, QueryResult, QueryResultRow } from 'pg'

dotenv.config({
  path: resolve(__dirname, '..')
})

const pool = new Pool({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOSTNAME,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME,
  allowExitOnIdle: true
})

const client = {
  query: async <R extends QueryResultRow = any, I extends Array<any> = Array<any>>(text: string | QueryConfig<I>, value?: I): Promise<QueryResult<R>> => {
    const result = await pool.query<R, I>(
      text,
      value
    )

    return result
  }
}

export default client
