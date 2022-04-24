import { Options } from '@node-rs/argon2'

const ARGON2_ITERATION_ROUNDS = 12
const ARGON2_HASH_LENGTH = 40
const ARGON2_PARALLELISM_THREAD_COUNT = 4

/* istanbul ignore if */
if (process.env.ARGON2_PEPPER == null || process.env.ARGON2_PEPPER === '') {
  throw new Error('missing argon2 pepper')
}

/**
 * Options for hashing a password using `argon2`
 */
const argon2Options: Options = {
  timeCost: ARGON2_ITERATION_ROUNDS,
  outputLen: ARGON2_HASH_LENGTH,
  parallelism: ARGON2_PARALLELISM_THREAD_COUNT,
  secret: Buffer.from(process.env.ARGON2_PEPPER)
}

export default argon2Options
