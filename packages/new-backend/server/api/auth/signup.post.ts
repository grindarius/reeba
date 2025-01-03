import { z } from "zod"

export default defineEventHandler(async event => {
  const signupBodySchema = z.object({
    username: z.string({
      required_error: useRequiredErrorMessage("username")
    }),
    email: z
      .string({
        required_error: useRequiredErrorMessage("email")
      })
      .email("Invalid email format."),
    password: z
      .string({
        required_error: useRequiredErrorMessage("password")
      })
      .min(18, "Password should have minimum length of 18 characters.")
      .max(64, "Password should have maximum length of 64 characters."),
    phoneCountryCode: z.string({
      required_error: useRequiredErrorMessage("phoneCountryCode")
    }),
    iso31662: z.string({ required_error: useRequiredErrorMessage("iso31662") }),
    phoneNumber: z.string({
      required_error: useRequiredErrorMessage("phoneNumber")
    })
  })

  const logger = useLogger()
  const body = await readValidatedBody(event, signupBodySchema.safeParse)

  if (!body.success) {
    logger.error(body.error.issues[0])

    throw createError({
      status: 400,
      statusMessage: "Bad Request",
      message: body.error?.issues[0]?.message
    })
  }

  logger.info(body.data)
  setResponseStatus(event, 200)
})
