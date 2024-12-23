import { FastifyInstance, FastifyPluginOptions } from "fastify"

import {
  PatchUserDescriptionReply,
  PatchUserDescriptionReplySchema,
  PatchUserDescriptionRequestBody,
  PatchUserDescriptionRequestBodySchema,
  PatchUserDescriptionRequestParams,
  PatchUserDescriptionRequestParamsSchema
} from "@reeba/common"

export default async (
  instance: FastifyInstance,
  _: FastifyPluginOptions
): Promise<void> => {
  instance.patch<{
    Params: PatchUserDescriptionRequestParams
    Body: PatchUserDescriptionRequestBody
    Reply: PatchUserDescriptionReply
  }>(
    "/:username/profile",
    {
      schema: {
        params: PatchUserDescriptionRequestParamsSchema,
        body: PatchUserDescriptionRequestBodySchema,
        response: {
          200: PatchUserDescriptionReplySchema
        }
      },
      onRequest: [instance.authenticate],
      preValidation: request => {
        const {
          description,
          facebook,
          instagram,
          twitter,
          tiktok,
          website,
          email
        } = request.body

        if (description == null) {
          request.body.description = ""
        }

        if (facebook == null) {
          request.body.facebook = ""
        }

        if (instagram == null) {
          request.body.instagram = ""
        }

        if (twitter == null) {
          request.body.twitter = ""
        }

        if (tiktok == null) {
          request.body.tiktok = ""
        }

        if (website == null) {
          request.body.website = ""
        }

        if (email == null) {
          request.body.email = ""
        }
      },
      config: {
        name: "PatchUserDescription"
      }
    },
    async request => {
      const {
        description,
        facebook,
        instagram,
        twitter,
        tiktok,
        website,
        email
      } = request.body

      return await instance.pg.transact<{ message: string }>(async client => {
        await client.query(
          'update "users" set user_profile_description = $1 where user_username = $2',
          [description, request.params.username]
        )

        await client.query(
          `update
            "users"
          set
            user_social_medias = jsonb_set(user_social_medias, '{facebook}', $1)
          where user_username = $2`,
          [`"${facebook}"`, request.params.username]
        )

        await client.query(
          `update
            "users"
          set
            user_social_medias = jsonb_set(user_social_medias, '{instagram}', $1)
          where user_username = $2`,
          [`"${instagram}"`, request.params.username]
        )

        await client.query(
          `update
            "users"
          set
            user_social_medias = jsonb_set(user_social_medias, '{twitter}', $1)
          where user_username = $2`,
          [`"${twitter}"`, request.params.username]
        )

        await client.query(
          `update
            "users"
          set
            user_social_medias = jsonb_set(user_social_medias, '{tiktok}', $1)
          where user_username = $2`,
          [`"${tiktok}"`, request.params.username]
        )

        await client.query(
          `update
            "users"
          set
            user_social_medias = jsonb_set(user_social_medias, '{email}', $1)
          where user_username = $2`,
          [`"${email}"`, request.params.username]
        )

        await client.query(
          `update
            "users"
          set
            user_social_medias = jsonb_set(user_social_medias, '{website}', $1)
          where user_username = $2`,
          [`"${website}"`, request.params.username]
        )

        return {
          message: "complete"
        }
      })
    }
  )
}
