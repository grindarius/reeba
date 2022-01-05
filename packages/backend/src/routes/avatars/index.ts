import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.post('/', async (request) => {
    const data = await request.file()

    const pump = promisify(pipeline)

    await pump(data.file, createWriteStream('./uploads/' + data.filename))

    return {
      message: 'world'
    }
  })
}
