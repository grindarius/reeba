import dayjs from 'dayjs'
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from 'fastify'

import {
  AdminGetUserDataReply,
  AdminGetUserDataReplySchema,
  AdminGetUserDataRequestQuerystring,
  AdminGetUserDataRequestQuerystringSchema,
  ForbiddenReplySchema,
  t_user_role,
  users
} from '@reeba/common'

const schema: FastifySchema = {
  querystring: AdminGetUserDataRequestQuerystringSchema,
  response: {
    200: AdminGetUserDataReplySchema,
    403: ForbiddenReplySchema
  }
}

const PAGE_SIZE = 30

export default async (instance: FastifyInstance, _: FastifyPluginOptions): Promise<void> => {
  instance.get<{ Querystring: AdminGetUserDataRequestQuerystring, Reply: AdminGetUserDataReply }>(
    '/users',
    {
      schema,
      onRequest: [
        instance.authenticate,
        async (request, reply) => {
          if (request.user.role !== t_user_role.admin) {
            void reply.code(403)
            throw new Error('forbidden')
          }
        }
      ],
      preValidation: async (request) => {
        if (Number(request.query.page) === 0) {
          request.query.page = 1
        }

        if (isNaN(Number(request.query.page))) {
          request.query.page = 1
        }
      }
    },
    async (request) => {
      const page = request.query.page

      const usersList = await instance.pg.query<users & { total_users: number }, [number, number]>(
        'select *, count(*) over() as total_users from "users" order by user_registration_datetime limit $1 offset $2',
        [PAGE_SIZE, (PAGE_SIZE * page) - PAGE_SIZE]
      )

      return {
        total: usersList.rows[0]?.total_users ?? 0,
        users: usersList.rows.map(u => {
          return {
            username: u.user_username,
            email: u.user_email,
            registrationDatetime: dayjs(u.user_registration_datetime).toISOString(),
            isAdmin: u.user_role === 'admin',
            isVerified: u.user_role === 'admin' ? true : u.user_verification_status
          }
        })
      }
    }
  )
}
