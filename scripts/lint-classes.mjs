import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import upath from 'node:upath'

/**
 * Recursively walk a directory asynchronously and obtain all file names (with full path).
 *
 * @param dir Folder name you want to recursively process
 * @param done Callback function, returns all files with full path.
 * @param filter Optional filter to specify which files to include,
 *   e.g. for json files: (f: string) => /.json$/.test(f)
 * @see https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search/50345475#50345475
 */
const walk = (
  dir,
  done,
  filter
) => {
  let results = []
  fs.readdir(dir, (err, list) => {
    if (err) {
      return done(err)
    }
    let pending = list.length
    if (!pending) {
      return done(null, results)
    }
    list.forEach((file) => {
      file = path.resolve(dir, file)
      fs.stat(file, (err2, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err3, res) => {
            if (res) {
              results = results.concat(res)
            }
            if (!--pending) {
              done(null, results)
            }
          }, filter)
        } else {
          if (typeof filter === 'undefined' || (filter && filter(file))) {
            results.push(file)
          }
          if (!--pending) {
            done(null, results)
          }
        }
      })
    })
  })
}

const main = () => {
  const argv = process.argv.slice(2)

  walk(argv[0], (error, pathnames) => {
    if (error) {
      throw new Error(error)
    }

    const relative = pathnames
      .map(pathname => {
        return upath.toUnix(pathname)
      })
      .filter(pathname => !pathname.includes('node_modules'))

    relative.forEach(pathname => {
      const content = fs.readFileSync(pathname).toString()

      // * goal is to wrap classes in @apply and let rustywind sort them, then strip them out.
      const wrappedApplyStyle = content.replace(/@apply\s(.+);/gm, '@apply class="$1";')

      fs.writeFileSync(pathname, wrappedApplyStyle)
    })

    exec('npx rustywind --write ./packages/frontend', (error, stdout, stderr) => {
      console.log('stdout: ' + stdout)
      console.log('stderr: ' + stderr)
      if (error != null) {
        console.log('exec error: ' + error)
      }

      relative.forEach(pathname => {
        const content = fs.readFileSync(pathname).toString()

        const unwrappedStyle = content.replace(/@apply\sclass="(.+)";/gm, '@apply $1;')

        fs.writeFileSync(pathname, unwrappedStyle)
      })
    })
  }, (name) => /.vue$/.test(name))
}

main()
