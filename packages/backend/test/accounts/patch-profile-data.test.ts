import dayjs from "dayjs"

import { verify } from "@node-rs/argon2"
import type { users } from "@reeba/common"

import { afterAll, beforeAll, describe, expect, test } from "vitest"
import createServer from "../../src/app.js"
import argon2Options from "../../src/constants/argon2.js"
import client from "../pool.js"

describe("patch profile data", async () => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
  })

  beforeAll(async () => {
    await client.query('delete from "users" where user_username = $1', [
      "patchprofiledataguy"
    ])

    await app.inject({
      method: "post",
      url: "/auth/signup",
      payload: {
        username: "patchprofiledataguy",
        email: "patchprofiledataguy@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "4589403342"
      }
    })

    const userResponse = await app.inject({
      method: "post",
      url: "/auth/signin",
      payload: {
        email: "patchprofiledataguy@gmail.com",
        password: "asdfghjkl123"
      }
    })

    const token = userResponse.json<{ token: string }>().token
  })

  test("no username in params", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts//profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "4589403342",
        birthdate: dayjs().toISOString()
      }
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json().message).toEqual(
      "params should have required property 'username'"
    )
  })

  test("missing email", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "4589403342",
        birthdate: dayjs().toISOString()
      }
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json().message).toEqual(
      "body should have required property 'email'"
    )
  })

  test("missing password", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "patchprofiledataguy@gmail.com",
        phoneCountryCode: "66",
        phoneNumber: "4589403342",
        birthdate: dayjs().toISOString()
      }
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json()).toHaveProperty(
      "message",
      "body should have required property 'password'"
    )
  })

  test("missing phone country code", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "patchprofiledataguy@gmail.com",
        password: "asdfghjkl123",
        phoneNumber: "4589403342",
        birthdate: dayjs().toISOString()
      }
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json()).toHaveProperty(
      "message",
      "body should have required property 'phoneCountryCode'"
    )
  })

  test("missing phone number", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "patchprofiledataguy@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        birthdate: dayjs().toISOString()
      }
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json()).toHaveProperty(
      "message",
      "body should have required property 'phoneNumber'"
    )
  })

  test("missing birthdate", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "patchprofiledataguy@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "4589403342"
      }
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json()).toHaveProperty(
      "message",
      "body should have required property 'birthdate'"
    )
  })

  test("wrong email format", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "patchprofiledataguygmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "4589403342",
        birthdate: dayjs().toISOString()
      }
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json()).toHaveProperty("message", "invalid 'email' format")
  })

  test("wrong phone number format", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "patchprofiledataguy@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "4589403342sdffdfsf33232",
        birthdate: dayjs().toISOString()
      }
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json()).toHaveProperty(
      "message",
      "invalid 'phoneNumber' format"
    )
  })

  const newBirthdate = dayjs().subtract(30, "years").format("YYYY-MM-DD")

  test("sending empty string should not change value", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "",
        password: "",
        phoneCountryCode: "",
        phoneNumber: "",
        birthdate: ""
      }
    })

    const newUserData = await client.query<users>(
      'select * from "users" where user_username = $1',
      ["patchprofiledataguy"]
    )

    const newUser = newUserData.rows[0]
    const isSamePassword = await verify(
      newUser.user_password,
      "asdfghjkl123",
      argon2Options
    )

    expect(response.json()).toHaveProperty("message", "complete")
    expect(newUser).toHaveProperty(
      "user_email",
      "patchprofiledataguy@gmail.com"
    )
    expect(isSamePassword).toBeTruthy()
    expect(newUser).toHaveProperty("user_phone_country_code", "66")
    expect(newUser).toHaveProperty("user_phone_number", "4589403342")
    expect(() => {
      dayjs(newUserData.rows[0].user_birthdate).toISOString()
    }).toThrow()
  })

  test("changing email", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "patchprofiledataguy2@gmail.com",
        password: "",
        phoneCountryCode: "",
        phoneNumber: "",
        birthdate: ""
      }
    })

    const newUserData = await client.query<users>(
      'select * from "users" where user_username = $1',
      ["patchprofiledataguy"]
    )

    const newUser = newUserData.rows[0]
    const isSamePassword = await verify(
      newUserData.rows[0].user_password,
      "asdfghjkl123",
      argon2Options
    )

    expect(response.json()).toHaveProperty("message", "complete")
    expect(newUser).toHaveProperty(
      "user_email",
      "patchprofiledataguy2@gmail.com"
    )
    expect(isSamePassword).toBeTruthy()
    expect(newUser).toHaveProperty("user_phone_country_code", "66")
    expect(newUser).toHaveProperty("user_phone_number", "4589403342")
    expect(() => {
      dayjs(newUserData.rows[0].user_birthdate).toISOString()
    }).toThrow()
  })

  test("changing phone country code", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "",
        password: "",
        phoneCountryCode: "44",
        phoneNumber: "",
        birthdate: ""
      }
    })

    const newUserData = await client.query<users>(
      'select * from "users" where user_username = $1',
      ["patchprofiledataguy"]
    )

    const newUser = newUserData.rows[0]
    const isSamePassword = await verify(
      newUserData.rows[0].user_password,
      "asdfghjkl123",
      argon2Options
    )

    expect(response.json()).toHaveProperty("message", "complete")
    expect(newUser).toHaveProperty(
      "user_email",
      "patchprofiledataguy2@gmail.com"
    )
    expect(isSamePassword).toBeTruthy()
    expect(newUser).toHaveProperty("user_phone_country_code", "44")
    expect(newUser).toHaveProperty("user_phone_number", "4589403342")
    expect(() => {
      dayjs(newUserData.rows[0].user_birthdate).toISOString()
    }).toThrow()
  })

  test("changing phone number", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "",
        password: "",
        phoneCountryCode: "",
        phoneNumber: "949504939",
        birthdate: ""
      }
    })

    const newUserData = await client.query<users>(
      'select * from "users" where user_username = $1',
      ["patchprofiledataguy"]
    )

    const newUser = newUserData.rows[0]
    const isSamePassword = await verify(
      newUserData.rows[0].user_password,
      "asdfghjkl123",
      argon2Options
    )

    expect(response.json()).toHaveProperty("message", "complete")
    expect(newUser).toHaveProperty(
      "user_email",
      "patchprofiledataguy2@gmail.com"
    )
    expect(isSamePassword).toBeTruthy()
    expect(newUser).toHaveProperty("user_phone_country_code", "44")
    expect(newUser).toHaveProperty("user_phone_number", "949504939")
    expect(() => {
      dayjs(newUserData.rows[0].user_birthdate).toISOString()
    }).toThrow()
  })

  test("changing birthdate", async t => {
    try {
      const response = await app.inject({
        method: "patch",
        url: "/accounts/patchprofiledataguy/profile-data",
        headers: {
          Authorization: `Bearer ${token}`
        },
        payload: {
          email: "",
          password: "",
          phoneCountryCode: "",
          phoneNumber: "949504939",
          birthdate: dayjs(newBirthdate).toISOString()
        }
      })

      const newUserData = await client.query<users>(
        'select * from "users" where user_username = $1',
        ["patchprofiledataguy"]
      )

      const isSamePassword = await verify(
        newUserData.rows[0].user_password,
        "asdfghjkl123",
        argon2Options
      )

      t.strictSame(response.json(), { message: "complete" })
      t.strictSame(
        newUserData.rows[0].user_email,
        "patchprofiledataguy2@gmail.com"
      )
      t.ok(isSamePassword)
      t.strictSame(newUserData.rows[0].user_phone_country_code, "44")
      t.strictSame(newUserData.rows[0].user_phone_number, "949504939")
      t.doesNotThrow(() => {
        dayjs(newUserData.rows[0].user_birthdate).toISOString()
      })
      t.strictSame(
        dayjs(newUserData.rows[0].user_birthdate).format("YYYY-MM-DD"),
        dayjs(newBirthdate).format("YYYY-MM-DD")
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  test("changing things except password", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "patchprofiledataguy2@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "55",
        phoneNumber: "968483948",
        birthdate: dayjs(newBirthdate).toISOString()
      }
    })

    const newUserData = await client.query<users>(
      'select * from "users" where user_username = $1',
      ["patchprofiledataguy"]
    )

    const isSamePassword = await verify(
      newUserData.rows[0].user_password,
      "asdfghjkl123",
      argon2Options
    )

    const newUser = newUserData.rows[0]
    expect(response.json()).toHaveProperty("message", "complete")
    expect(newUser).toHaveProperty(
      "user_email",
      "patchprofiledataguy2@gmail.com"
    )
    expect(isSamePassword).toBeTruthy()
    expect(newUser).toHaveProperty("user_phone_country_code", "55")
    expect(newUser).toHaveProperty("user_phone_number", "968483948")
    expect(
      dayjs(newUser.user_birthdate ?? dayjs()).toISOString(),
      dayjs(newBirthdate)
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0)
        .toISOString()
    )
  })

  test("changing password", async () => {
    const response = await app.inject({
      method: "patch",
      url: "/accounts/patchprofiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`
      },
      payload: {
        email: "patchprofiledataguy2@gmail.com",
        password: "asdfghjkl1234",
        phoneCountryCode: "55",
        phoneNumber: "968483948",
        birthdate: newBirthdate
      }
    })

    const newUserData = await client.query(
      'select * from "users" where user_username = $1',
      ["patchprofiledataguy"]
    )

    const newUser = newUserData.rows[0]
    const isSamePassword = await verify(
      newUser.user_password as string,
      "asdfghjkl1234"
    )

    expect(response.json()).toHaveProperty("message", "complete")
    expect(newUser).toHaveProperty(
      "user_email",
      "patchprofiledataguy2@gmail.com"
    )
    expect(isSamePassword).toBeTruthy()
    expect(newUser).toHaveProperty("user_phone_country_code", "55")
    expect(newUser).toHaveProperty("user_phone_number", "968483948")
    expect(
      dayjs(newUser.user_birthdate ?? dayjs()).toISOString(),
      dayjs(newBirthdate)
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0)
        .toISOString()
    )
  })
})
