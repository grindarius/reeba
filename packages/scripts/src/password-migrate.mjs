import { hash } from "@node-rs/argon2"
import { readFile, writeFile } from "node:fs/promises"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import chalk from "chalk"
import argon2Options from "../dist/src/constants/argon2.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log(chalk.green("hashing password"))
const userPassword = await hash("aryastark", argon2Options.default)
const adminPassword = await hash("sansastark", argon2Options.default)

console.log(chalk.green("reading files to inject new password hash"))
const seedFile = await readFile(resolve(__dirname, "seed.ts"), "utf-8")
const clearDbFile = await readFile(resolve(__dirname, "clear-db.ts"), "utf-8")

console.log(chalk.green("editing password hash variables"))
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

console.log(chalk.green("writing new password hash to file"))
await writeFile(resolve(__dirname, "seed.ts"), editedSeedFile, "utf-8")
await writeFile(resolve(__dirname, "clear-db.ts"), editedClearDbFile, "utf-8")
