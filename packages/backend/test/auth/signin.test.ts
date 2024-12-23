import { resolve } from "node:path"
import dotenv from "dotenv-flow"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import createServer from "../../src/app.js"
import client from "../pool.js"

dotenv.config({
  path: resolve(__dirname, "..", ".."),
  silent: true
})

describe("signin process", async () => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
  })

  beforeAll(async () => {
    // * Looking for existing logged in user, if not. create one.
    const email = await client.query(
      "select * from \"users\" where user_email = 'logintest@gmail.com'"
    )

    if (email.rows.length <= 0) {
      await app.inject({
        method: "POST",
        url: "/auth/signup",
        payload: {
          username: "login_test_boy",
          email: "logintest@gmail.com",
          password: "logintest_123",
          phoneCountryCode: "883",
          phoneNumber: "33442200"
        }
      })
    }
  })

  test("Missing email (as empty string)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        email: "",
        password: "logintest_123"
      }
    })

    expect(
      response.statusCode,
      "Error code from missing email as empty string"
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message from missing email as empty string"
    ).toEqual("body should have required property 'email'")
  })

  test("Missing email (as missing params)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        password: "logintest_123"
      }
    })

    expect(
      response.statusCode,
      "Error code from missing email as missing params"
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message from missing email as missing params"
    ).toEqual("body should have required property 'email'")
  })

  test("Missing password (as empty string)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        email: "logintest@gmail.com",
        password: ""
      }
    })

    expect(
      response.statusCode,
      "Error code from missing password as missing params"
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message from missing password as empty string"
    ).toEqual("body should have required property 'password'")
  })

  test("Missing password (as missing params)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        password: "logintest_123"
      }
    })

    expect(
      response.statusCode,
      "Error code from missing email as missing params"
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message from missing password as missing params"
    ).toEqual("body should have required property 'email'")
  })

  test("Successful signin", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        email: "logintest@gmail.com",
        password: "logintest_123"
      }
    })

    expect(response.statusCode, "Success code from success signin").toEqual(200)

    const json = response.json()
    expect(
      json.token,
      "Error message from missing email as missing params"
    ).toBeTypeOf("string")
    expect(json.username, "Return type of username").toBeTypeOf("string")
    expect(json, "Username returned from registering").toHaveProperty(
      "username",
      "login_test_body"
    )
    expect(
      ["admin", "organizer", "user"],
      "User role should be one in user roles"
    ).toContain(json.role)

    expect(json.verificationStatus, "Type of verification status").toBeTypeOf(
      "boolean"
    )
    expect(json, "Email of current logged in user").toHaveProperty(
      "email",
      "logintest@gmail.com"
    )
  })

  test("email not found", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        email: "wronglogintest@gmail.com",
        password: "logintest_123"
      }
    })

    expect(response.statusCode).toEqual(404)
    expect(response.json()).toHaveProperty(
      "email",
      "user with supplied 'email' not found"
    )
  })

  test("wrong password", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        email: "logintest@gmail.com",
        password: "wrongpassword"
      }
    })

    expect(response.statusCode, "response status of wrong password").toEqual(
      400
    )
    expect(
      response.json(),
      "response message of wrong password"
    ).toHaveProperty("message", "invalid 'password'")
  })
})
