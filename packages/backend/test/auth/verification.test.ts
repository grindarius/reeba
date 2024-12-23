import { resolve } from "node:path"
import dotenv from "dotenv-flow"

import { afterAll, beforeAll, describe, expect, test } from "vitest"
import createServer from "../../src/app.js"
import client from "../pool.js"

dotenv.config({
  path: resolve(__dirname, "..", ".."),
  silent: true
})

describe("jwt check test", async () => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
  })

  beforeAll(async () => {
    const existingUser = await client.query(
      "select * from \"users\" where user_username = 'decoratortest'"
    )

    if (existingUser.rows.length === 0) {
      await app.inject({
        method: "POST",
        url: "/auth/signup",
        payload: {
          username: "decoratortest",
          email: "decoratortest@gmail.com",
          password: "asdfghjkl123",
          phoneCountryCode: "66",
          phoneNumber: "938493892"
        }
      })
    }

    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        email: "decoratortest@gmail.com",
        password: "asdfghjkl123"
      }
    })

    const { token } = response.json<{
      token: string
      username: string
      role: string
      verificationStatus: boolean
    }>()
  })

  test("success test", async () => {
    const responseSuccess = await app.inject({
      method: "GET",
      url: "/auth/verification",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    expect(responseSuccess.statusCode).toEqual(200)
    expect(responseSuccess.json()).toHaveProperty(
      "user.username",
      "decoratortest"
    )
    expect(responseSuccess.json()).toHaveProperty("user.role", "user")
  })

  test("timeout token", async () => {
    const responseError = await app.inject({
      method: "GET",
      url: "/auth/verification",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlY29yYXRvcnRlc3QiLCJyb2xlIjoidXNlciIsImlhdCI6MTY0NTM4NjgyNSwiZXhwIjoxNjQ1Mzg2ODM1fQ.kDYMo1qrrTsoZwEqnuR8EWZFYvyjQEojkGGKrqFaxHA"
      }
    })

    expect(responseError.statusCode).toEqual(401)
    expect(responseError.json().message, "Authorization token expired")
  })
})
