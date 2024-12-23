import { createReadStream } from "node:fs"
import { resolve } from "node:path"
import dotenv from "dotenv-flow"
import FormData from "form-data"

import { afterAll, beforeAll, describe, expect, test } from "vitest"
import createServer from "../../src/app.js"
import client from "../pool.js"

dotenv.config({
  path: resolve(__dirname, "..", ".."),
  silent: true
})

describe("post image", async () => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
  })

  beforeAll(async () => {
    // * Looking for existing logged in user, if not. create one (without image path).
    const email = await client.query(
      "select * from \"users\" where user_username = 'postavatartest'"
    )

    if (email.rows.length <= 0) {
      await app.inject({
        method: "POST",
        url: "/auth/signup",
        payload: {
          username: "postavatartest",
          email: "postavatartest@gmail.com",
          password: "postavatartest_123",
          phoneCountryCode: "334",
          phoneNumber: "4304849384"
        }
      })
    }
  })

  test("passing empty string as username", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/avatars/"
    })

    expect(
      response.statusCode,
      "status code from posting without username"
    ).toEqual(400)
    expect(response.json().message, "error message").toEqual(
      "params should have required property 'username'"
    )
  })

  test("passing unknown username", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/avatars/unknown_username"
    })

    expect(
      response.statusCode,
      "status code from posting without username"
    ).toEqual(404)
    expect(response.json().message, "error message").toEqual("user not found")
  })

  test("posting image to existing profile", async () => {
    const form = new FormData()
    form.append(
      "image",
      createReadStream(resolve(__dirname, "test-post-avatar.png"))
    )

    const response = await app.inject({
      method: "POST",
      url: "/avatars/postavatartest",
      payload: form,
      headers: form.getHeaders()
    })

    expect(response.statusCode, "status code from posting image").toEqual(200)
    expect(response.json().message, "message from posting image").toEqual(
      "complete"
    )
  })

  test("posting unmatched file extension", async () => {
    const form = new FormData()
    form.append(
      "image",
      createReadStream(resolve(__dirname, "unmatched-file-extension.md"))
    )

    const response = await app.inject({
      method: "POST",
      url: "/avatars/postavatartest",
      payload: form,
      headers: form.getHeaders()
    })

    expect(
      response.statusCode,
      "status code from posting unmatched file extension"
    ).toEqual(400)
    expect(
      response.json().message,
      "message from posting unmatched file extension"
    ).toEqual("unmatched file extension")
  })
})
