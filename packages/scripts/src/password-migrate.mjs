import dotenv from 'dotenv-flow'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * `__dirname` creation in ESM
 *
 * @see https://stackoverflow.com/a/55944697/12386405
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({
  path: resolve(__dirname, '..', '..', 'backend'),
  silent: true
})

const file = await readFile(resolve(__dirname, '..', '..', 'backend', 'src', 'constants', 'argon2.ts'))
const fileString = file.toString()
  .replace('import { resolve } from \'node:path\'', 'import { dirname, resolve } from \'node:path\'')
  .replace('resolve(__dirname, \'..\', \'..\')', 'resolve(__dirname, \'..\', \'..\', \'backend\')')

const lastConstIndex = fileString.indexOf('import { dirname, resolve } from \'node:path\'') + 'import { dirname, resolve } from \'node:path\''.length

/**
 * Inseting a string in the middle of a long string
 * 
 * @see https://stackoverflow.com/a/4314044/12386405
 */
const finalString = fileString.slice(0, lastConstIndex) +
'\n' +
'import { fileURLToPath } from \'node:url\'' + '\n\n' +
'const __filename = fileURLToPath(import.meta.url)' + '\n' +
'const __dirname = dirname(__filename)' +
fileString.slice(lastConstIndex)

await writeFile(resolve(__dirname, 'argon2.mjs'), finalString)
