import { readdir, unlink } from 'node:fs'
import { resolve } from 'node:path'

readdir(resolve(__dirname, '..', '..', 'backend', 'uploads'), (err, files) => {
  if (err != null) {
    throw new Error(err.message)
  }

  for (const file of files) {
    if (file === 'default-user-profile.png') {
      continue
    }

    unlink(resolve(__dirname, '..', '..', 'backend', 'uploads', file), err => {
      if (err != null) {
        throw new Error(err.message)
      }
    })
  }
})
