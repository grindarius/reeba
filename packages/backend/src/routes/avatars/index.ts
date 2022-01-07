import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get('/', async (_, reply) => {
    return await reply.sendFile('default-user-profile.png')
  })
  instance.post('/', async (request, _) => {
    const data = await request.file()

    const pump = promisify(pipeline)

    await pump(data.file, createWriteStream('./uploads/' + data.filename))

    return {
      message: 'post avatar'
    }
  })
}
