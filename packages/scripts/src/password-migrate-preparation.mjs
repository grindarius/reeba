import { promisify } from "node:util"
import { exec } from "node:child_process"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"
import chalk from "chalk"

const execAsync = promisify(exec)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log(chalk.green("copying environment variables file"))
// * copy .env files for configurations on secrets
await execAsync("cp ../../backend/.env.local ../dist/.env.local", {
  cwd: resolve(__dirname)
})

console.log(chalk.green("building argon2.ts"))
// * build the argon2 file and dumping to dist folder of scripts package
await execAsync("pnpm build:argon2", { cwd: resolve(__dirname, "..") })
