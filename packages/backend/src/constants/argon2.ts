import { Options } from '@node-rs/argon2'

const ARGON2_ITERATION_ROUNDS = 12
const ARGON2_HASH_LENGTH = 40
const ARGON2_PARALLELISM_THREAD_COUNT = 4

const argon2Options: Options = {
  timeCost: ARGON2_ITERATION_ROUNDS,
  outputLen: ARGON2_HASH_LENGTH,
  parallelism: ARGON2_PARALLELISM_THREAD_COUNT,
  secret: Buffer.from('whoisthis')
}

export default argon2Options
