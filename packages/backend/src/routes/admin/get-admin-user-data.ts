import dayjs from "dayjs"
import { FastifyInstance, FastifyPluginOptions, FastifySchema } from "fastify"

import {
  AdminGetUserDataReply,
  AdminGetUserDataReplySchema,
  AdminGetUserDataRequestQuerystring,
  AdminGetUserDataRequestQuerystringSchema,
  t_user_role,
  users
} from "@reeba/common"

const schema: FastifySchema = {
  querystring: AdminGetUserDataRequestQuerystringSchema,
  response: {
    200: AdminGetUserDataReplySchema
  }
}

const PAGE_SIZE = 30

const buildOrderQuery = (query: AdminGetUserDataRequestQuerystring): string => {
  switch (query.sort) {
    case "name-asc":
      return "user_username asc"
    case "name-desc":
      return "user_username desc"
    case "regis-asc":
      return "user_registration_datetime asc"
    case "regis-desc":
      return "user_registration_datetime desc"
  }
}

const buildQ = (query: AdminGetUserDataRequestQuerystring): string => {
  if (query.q != null && query.q !== "") {
    return `and array[user_username, user_iso_31662_code, user_phone_country_code, user_phone_number] &@ '${query.q}'`
  }

  return ""
}

export default async (
  instance: FastifyInstance,
  _: FastifyPluginOptions
): Promise<void> => {
  instance.get<{
    Querystring: AdminGetUserDataRequestQuerystring
    Reply: AdminGetUserDataReply
  }>(
    "/users",
    {
      schema,
      onRequest: [
        instance.authenticate,
        (request, reply) => {
          if (request.user.role !== t_user_role.admin) {
            void reply.code(403)
            throw new Error("forbidden")
          }
        }
      ],
      preValidation: request => {
        if (Number(request.query.page) <= 0) {
          request.query.page = 1
        }

        if (isNaN(Number(request.query.page))) {
          request.query.page = 1
        }

        // @ts-expect-error sort could be empty string
        if (request.query.sort == null || request.query.sort === "") {
          request.query.sort = "name-asc"
        }
      },
      config: {
        name: "AdminGetUserData"
      }
    },
    async request => {
      const { page } = request.query

      const usersList = await instance.pg.query<
        users & { total_users: number },
        [number, number]
      >(
        `select
          *,
          count(*) over() as total_users
        from "users"
        where user_deletion_status != 'true'::boolean ${buildQ(request.query)}
        order by ${buildOrderQuery(request.query)} limit $1 offset $2`,
        [PAGE_SIZE, PAGE_SIZE * page - PAGE_SIZE]
      )

      return {
        total: usersList.rows[0]?.total_users ?? 0,
        users: usersList.rows.map(u => {
          return {
            username: u.user_username,
            email: u.user_email,
            socialMedias: u.user_social_medias,
            phoneNumber: u.user_phone_number,
            phoneCountryCode: u.user_phone_country_code,
            birthdate:
              u.user_birthdate == null
                ? null
                : dayjs(u.user_birthdate).toISOString(),
            iso31662: u.user_iso_31662_code,
            registrationDatetime: dayjs(
              u.user_registration_datetime
            ).toISOString(),
            isAdmin: u.user_role === "admin",
            isVerified: u.user_verification_status
          }
        })
      }
    }
  )
}
