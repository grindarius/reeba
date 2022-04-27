import { hash } from '@node-rs/argon2'
import { readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const execAsync = promisify(exec)

// * copy .env files for configurations on secrets
await execAsync('cp ../../backend/.env.local ../dist/.env.local', { cwd: resolve(__dirname) })

// * build the argon2 file and dumping to dist folder of scripts package
await execAsync('pnpm build:argon2', { cwd: resolve(__dirname, '..') })

import argon2Options from '../dist/src/constants/argon2.js'

const userPassword = await hash('aryastark', argon2Options.default)
const adminPassword = await hash('sansastark', argon2Options.default)

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
