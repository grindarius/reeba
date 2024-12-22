import { resolve } from "node:path"
import dotenv from "dotenv-flow"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import createServer from "../../src/app.js"
import client from "../pool.js"

dotenv.config({
  path: resolve(__dirname, "..", ".."),
  silent: true,
})

describe("signin process", async t => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
  })

  beforeAll(async () => {
    // * Looking for existing logged in user, if not. create one.
    const email = await client.query(
      "select * from \"users\" where user_email = 'logintest@gmail.com'",
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
          phoneNumber: "33442200",
        },
      })
    }
  })

  test("Missing email (as empty string)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        email: "",
        password: "logintest_123",
      },
    })

    expect(
      response.statusCode,
      "Error code from missing email as empty string",
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message from missing email as empty string",
    ).toEqual("body should have required property 'email'")
  })

  test("Missing email (as missing params)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        password: "logintest_123",
      },
    })

    expect(
      response.statusCode,
      "Error code from missing email as missing params",
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message from missing email as missing params",
    ).toEqual("body should have required property 'email'")
  })

  test("Missing password (as empty string)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        email: "logintest@gmail.com",
        password: "",
      },
    })

    expect(
      response.statusCode,
      "Error code from missing password as missing params",
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message from missing password as empty string",
    ).toEqual("body should have required property 'password'")
  })

  test("Missing password (as missing params)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        password: "logintest_123",
      },
    })

    expect(
      response.statusCode,
      "Error code from missing email as missing params",
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message from missing password as missing params",
    ).toEqual("body should have required property 'email'")
  })

  test("Successful signin", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signin",
      payload: {
        email: "logintest@gmail.com",
        password: "logintest_123",
      },
    })

    expect(response.statusCode, "Success code from success signin").toEqual(200)
    expect(
      response.json().token,
      "Error message from missing email as missing params",
    ).toBeTypeOf("string")
    expect(response.json().username, "Return type of username").toBeTypeOf(
      "string",
    )
    expect(
      response.json().username,
      "Username returned from registering",
    ).toEqual("login_test_boy")
    expect(
      ["admin", "organizer", "user"].includes(response.json().role),
      true,
      "User role should be one in user roles",
    )
    t.type(
      response.json().verificationStatus,
      "boolean",
      "Type of verification status",
    )
    expect(
      response.json().email,
      "logintest@gmail.com",
      "Email of current logged in user",
    )
  })

  test("email not found", async t => {
    try {
      const response = await app.inject({
        method: "POST",
        url: "/auth/signin",
        payload: {
          email: "wronglogintest@gmail.com",
          password: "logintest_123",
        },
      })

      expect(response.statusCode).toEqual(404)
      t.strictSame(
        response.json().message,
        "user with supplied 'email' not found",
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  test("wrong password", async t => {
    try {
      const response = await app.inject({
        method: "POST",
        url: "/auth/signin",
        payload: {
          email: "logintest@gmail.com",
          password: "wrongpassword",
        },
      })

      t.strictSame(
        response.statusCode,
        400,
        "response status of wrong password",
      )
      t.strictSame(
        response.json().message,
        "invalid 'password'",
        "response message of wrong password",
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  t.end()
})
