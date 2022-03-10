import chalk from 'chalk'
import { readdir, unlink } from 'node:fs'
import { resolve } from 'node:path'

readdir(resolve(__dirname, '..', '..', 'backend', 'uploads'), (err, files) => {
  console.log(chalk.blue('Reading directories...'))

  if (err != null) {
    throw new Error(err.message)
  }

  for (const file of files) {
    if (file === 'default-user-profile.png' || file === 'default-event-image.png' || file === 'arya-stark.png' || file === 'sansa-stark.png') {
      continue
    }

    console.log(chalk.blue('Unlinking', file, '...'))
    unlink(resolve(__dirname, '..', '..', 'backend', 'uploads', file), err => {
      if (err != null) {
        throw new Error(err.message)
      }
    })
  }
})
