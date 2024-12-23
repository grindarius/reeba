import { exec } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { exit } from "node:process"
import upath from "upath"

/**
 * Recursively walk a directory asynchronously and obtain all file names (with full path).
 *
 * @param dir Folder name you want to recursively process
 * @param done Callback function, returns all files with full path.
 * @param filter Optional filter to specify which files to include,
 *   e.g. for json files:
 *
 * ```ts
 * (f: string) => /.json$/.test(f)
 * ```
 * @see https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search/50345475#50345475
 */
const walk = (
  dir: string,
  done: (err: Error | null, results?: Array<string>) => void,
  filter?: (f: string) => boolean
): void => {
  let results: Array<string> = []
  fs.readdir(dir, (err: NodeJS.ErrnoException | null, list: Array<string>) => {
    if (err != null) {
      return done(err)
    }

    let pending = list.length
    // eslint-disable-next-line
    if (!pending) {
      return done(null, results)
    }

    list.forEach((file: string) => {
      file = path.resolve(dir, file)
      fs.stat(file, (_, stat) => {
        // eslint-disable-next-line
        if (stat && stat.isDirectory()) {
          // eslint-disable-next-line
          walk(
            file,
            (_, res) => {
              if (res != null) {
                results = results.concat(res)
              }

              // eslint-disable-next-line
              if (!--pending) {
                done(null, results)
              }
            },
            filter
          )
        } else {
          // eslint-disable-next-line
          if (typeof filter === "undefined" || (filter && filter(file))) {
            results.push(file)
          }

          // eslint-disable-next-line
          if (!--pending) {
            done(null, results)
          }
        }
      })
    })
  })
}

const main = (): void => {
  walk(
    path.resolve(__dirname, "..", "..", "frontend", "src"),
    (error, pathnames) => {
      console.log("paths are", pathnames)

      if (error != null) {
        throw new Error(error.message)
      }

      if (pathnames == null || pathnames.length === 0) {
        throw new Error("Did not find any pathnames")
      }

      console.log("filtering paths")
      const relative = pathnames
        .map(pathname => {
          return upath.toUnix(pathname)
        })
        .filter(pathname => {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          return !pathname.includes("node_modules")
        })

      console.log("applying styles for rustywind")
      relative.forEach(pathname => {
        const content = fs.readFileSync(pathname).toString()

        // * goal is to wrap classes in @apply and let rustywind sort them, then strip them out.
        const wrappedApplyStyle = content.replace(
          /@apply\s(.+);/gm,
          '@apply class="$1";'
        )

        fs.writeFileSync(pathname, wrappedApplyStyle)
      })

      exec(
        "pnpm dlx rustywind --write .",
        { cwd: path.resolve(__dirname, "..", "..", "frontend") },
        (error, stdout, stderr) => {
          console.log("stdout: " + stdout)
          console.log("stderr: " + stderr)

          if (error != null) {
            console.log(error)
            exit()
          }

          relative.forEach(pathname => {
            const content = fs.readFileSync(pathname).toString()

            const unwrappedStyle = content.replace(
              /@apply\sclass="(.+)";/gm,
              "@apply $1;"
            )

            fs.writeFileSync(pathname, unwrappedStyle)
          })
        }
      )
    },
    name => /.vue$/.test(name)
  )
}

main()
