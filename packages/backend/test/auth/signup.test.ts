import { resolve } from "node:path"
import dotenv from "dotenv-flow"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import createServer from "../../src/app.js"
import client from "../pool.js"

dotenv.config({
  path: resolve(__dirname, "..", ".."),
  silent: true
})

describe("signup process", async () => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
  })

  beforeAll(async () => {
    await client.query(
      "delete from \"users\" where user_email = 'authtest@gmail.com'"
    )
  })

  test("missing username (as empty string)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "",
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "983322552"
      }
    })

    expect(response.statusCode, "Error code from missing username").toEqual(400)
    expect(
      response.json().message,
      "Error message from missing username"
    ).toEqual("body should have required property 'username'")
  })

  test("missing username (as missing params)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "983322552"
      }
    })

    expect(response.statusCode, "Error code from missing username").toEqual(400)
    expect(
      response.json().message,
      "Error message from missing username"
    ).toEqual("body should have required property 'username'")
  })

  test("missing email (as empty string)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "983322552"
      }
    })

    expect(response.statusCode, "Error code from missing email").toEqual(400)
    expect(response.json().message, "Error message from missing email").toEqual(
      "body should have required property 'email'"
    )
  })

  test("missing email (as missing params)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "983322552"
      }
    })

    expect(response.statusCode, "Error code from missing email").toEqual(400)
    expect(response.json().message, "Error message from missing email").toEqual(
      "body should have required property 'email'"
    )
  })

  test("email is not empty but wrong format", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest @gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "983322552"
      }
    })

    expect(
      response.statusCode,
      "Error code when email is in wrong format"
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message when email is in wrong format"
    ).toEqual("invalid 'email' format")
  })

  test("missing password (as empty string)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest@gmail.com",
        password: "",
        phoneCountryCode: "66",
        phoneNumber: "983322552"
      }
    })

    expect(response.statusCode, "Error code when missing password").toEqual(400)
    expect(
      response.json().message,
      "Error message when missing password"
    ).toEqual("body should have required property 'password'")
  })

  test("missing password (as missing params)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest@gmail.com",
        phoneCountryCode: "66",
        phoneNumber: "983322552"
      }
    })

    expect(response.statusCode, "Error code when missing password").toEqual(400)
    expect(
      response.json().message,
      "Error message when missing password"
    ).toEqual("body should have required property 'password'")
  })

  test("missing phone country code (empty string)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "",
        phoneNumber: "9823322552"
      }
    })

    expect(
      response.statusCode,
      "Error code when missing phone country code"
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message when missing phone country code"
    ).toEqual("body should have required property 'phoneCountryCode'")
  })

  test("missing phone country code (missing params)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneNumber: "9823322552"
      }
    })

    expect(
      response.statusCode,
      "Error code when missing phone country code"
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message when missing phone country code"
    ).toEqual("body should have required property 'phoneCountryCode'")
  })

  test("missing phone number (empty string)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: ""
      }
    })

    expect(response.statusCode, "Error code when missing phone number").toEqual(
      400
    )
    expect(
      response.json().message,
      "Error message when missing phone number"
    ).toEqual("body should have required property 'phoneNumber'")
  })

  test("missing phone number (missing params)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66"
      }
    })

    expect(response.statusCode, "Error code when missing phone number").toEqual(
      400
    )
    expect(
      response.json().message,
      "Error message when missing phone number"
    ).toEqual("body should have required property 'phoneNumber'")
  })

  test("wrong phone number format (includes space)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: " 98 23322552"
      }
    })

    expect(
      response.statusCode,
      "Error code when phone number wrong format"
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message when wrong phone number format"
    ).toEqual("invalid 'phoneNumber' format")
  })

  test("wrong phone number format (includes \\n)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "\n43445452"
      }
    })

    expect(
      response.statusCode,
      "Error code when phone number wrong format"
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message when wrong phone number format"
    ).toEqual("invalid 'phoneNumber' format")
  })

  test("wrong phone number format (includes \\t)", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "\t43445452"
      }
    })

    expect(
      response.statusCode,
      "Error code when phone number wrong format"
    ).toEqual(400)
    expect(
      response.json().message,
      "Error message when wrong phone number format"
    ).toEqual("invalid 'phoneNumber' format")
  })

  test("successful signup", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "9823322552"
      }
    })

    expect(response.statusCode, "Success code from registration.").toEqual(200)
    expect(response.json().message, "response message from signup.").toEqual(
      "complete"
    )
  })

  test("duplicate email signup", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius2",
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "9823322552"
      }
    })

    expect(response.statusCode, "Error code from redundant email.").toEqual(400)
    expect(
      response.json().message,
      "Error message from redundant email."
    ).toEqual("duplicate 'email'")
  })

  test("duplicate username signup", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "grindarius",
        email: "authtest2@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "9823322552"
      }
    })

    expect(response.statusCode, "Error code from redundant username.").toEqual(
      400
    )
    expect(
      response.json().message,
      "Error message from redundant username."
    ).toEqual("duplicate 'username'")
  })

  test("invalid username", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/signup",
      payload: {
        username: "longgggggggggggggggggggggggggggggggggggggggg",
        email: "authtest@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "9823322552"
      }
    })

    expect(response.statusCode, "Error code from invalid name format.").toEqual(
      400
    )
    expect(
      response.json().message,
      "Error message from invalid username."
    ).toEqual("invalid 'username' format")
  })
})
