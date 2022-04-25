import { hash } from '@node-rs/argon2'
import argon2Options from './argon2.mjs'
import { unlink, readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const userPassword = await hash('aryastark', argon2Options)
const adminPassword = await hash('sansastark', argon2Options)

const seedFile = await readFile(resolve(__dirname, 'seed.ts'), 'utf-8')
const clearDbFile = await readFile(resolve(__dirname, 'clear-db.ts'), 'utf-8')

const editedSeedFile = seedFile.replace(
  /const userPassword = '.+?'/,
  `const userPassword = '${userPassword}'`
)
const editedClearDbFile = clearDbFile
.replace(
  /const userPassword = '.+?'/,
  `const userPassword = '${userPassword}'`
)
.replace(
  /const adminPassword = '.+?'/,
  `const adminPassword = '${adminPassword}'`
)

await writeFile(resolve(__dirname, 'seed.ts'), editedSeedFile, 'utf-8')
await writeFile(resolve(__dirname, 'clear-db.ts'), editedClearDbFile, 'utf-8')

unlink(resolve(__dirname, 'argon2.mjs'), (err) => {
  if (err != null) {
    throw err
  }
})
