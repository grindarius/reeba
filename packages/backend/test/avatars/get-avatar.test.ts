import { createReadStream, readFileSync } from "node:fs"
import { resolve } from "node:path"
import dotenv from "dotenv-flow"
import FormData from "form-data"
import Resemble from "resemblejs"

import { afterAll, beforeAll, describe, expect, test } from "vitest"

import createServer from "../../src/app.js"
import client from "../pool.js"

dotenv.config({
  path: resolve(__dirname, "..", ".."),
  silent: true
})

describe("get image", async () => {
  const app = createServer()

  afterAll(async () => {
    await client.query(
      'update "users" set user_image_profile_path = $1 where user_username = $2',
      ["", "no_image_user"]
    )
    await app.close()
  })

  beforeAll(async () => {
    // * Looking for existing logged in user, if not. create one (without image path).
    const email = await client.query(
      "select * from \"users\" where user_username = 'getavatartest'"
    )

    if (email.rows.length <= 0) {
      await app.inject({
        method: "POST",
        url: "/auth/signup",
        payload: {
          username: "getavatartest",
          email: "getavatartest@gmail.com",
          password: "getavatartest_123",
          phoneCountryCode: "332",
          phoneNumber: "9384937485"
        }
      })
    }

    const form = new FormData()
    form.append(
      "image",
      createReadStream(resolve(__dirname, "test-get-avatar.png"))
    )

    await app.inject({
      method: "POST",
      url: "/avatars/getavatartest",
      payload: form,
      headers: form.getHeaders()
    })
  })

  test("get default user image when emptystring is passed", async () => {
    const response = await app.inject({
      method: "GET",
      path: "/avatars/"
    })

    Resemble(response.rawPayload)
      .compareTo(
        readFileSync(
          resolve(__dirname, "..", "..", "uploads", "default-user-profile.png")
        )
      )
      .onComplete(result => {
        expect(result.isSameDimensions).toEqual(true)
        expect(Number(result.misMatchPercentage)).toEqual(0)
      })
  })

  test("get avatar of unknown user", async () => {
    const response = await app.inject({
      method: "GET",
      path: "/avatars/unknown_user"
    })

    Resemble(response.rawPayload)
      .compareTo(
        readFileSync(
          resolve(__dirname, "..", "..", "uploads", "default-user-profile.png")
        )
      )
      .onComplete(result => {
        expect(result.isSameDimensions).toEqual(true)
        expect(Number(result.misMatchPercentage)).toEqual(0)
      })
  })

  test("get avatar of user getavatartest", async () => {
    const response = await app.inject({
      method: "GET",
      path: "/avatars/getavatartest"
    })

    Resemble(response.rawPayload)
      .compareTo(readFileSync(resolve(__dirname, "test-get-avatar.png")))
      .onComplete(result => {
        expect(result.isSameDimensions).toEqual(true)
        expect(Number(result.misMatchPercentage)).toEqual(0)
      })
  })

  const email = await client.query(
    "select * from \"users\" where user_username = 'no_image_user'"
  )

  if (email.rows.length <= 0) {
    await app.inject({
      method: "post",
      url: "/auth/signup",
      payload: {
        username: "no_image_user",
        email: "noimageguy@gmail.com",
        password: "noimageguy",
        phoneCountryCode: "232",
        phoneNumber: "9384937485"
      }
    })
  }

  await client.query(
    'update "users" set user_image_profile_path = $1 where user_username = $2',
    ["", "no_image_user"]
  )

  test("get avatar of a user that doesn't have image", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/avatars/no_image_user"
    })

    Resemble(response.rawPayload)
      .compareTo(
        readFileSync(
          resolve(__dirname, "..", "..", "uploads", "default-user-profile.png")
        )
      )
      .onComplete(result => {
        expect(result.isSameDimensions).toEqual(true)
        expect(Number(result.misMatchPercentage)).toEqual(0)
      })
  })

  await client.query(
    'update "users" set user_image_profile_path = $1 where user_username = $2',
    ["unknown-file.png", "no_image_user"]
  )

  test("get avatar of user with filename but file does not exist", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/avatars/no_image_user"
    })

    Resemble(response.rawPayload)
      .compareTo(
        readFileSync(
          resolve(__dirname, "..", "..", "uploads", "default-user-profile.png")
        )
      )
      .onComplete(result => {
        expect(result.isSameDimensions).toEqual(true)
        expect(Number(result.misMatchPercentage)).toEqual(0)
      })
  })

  await client.query(
    'update "users" set user_image_profile_path = $1 where user_username = $2',
    ["", "no_image_user"]
  )
})
