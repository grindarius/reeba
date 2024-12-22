import dayjs from "dayjs"

import { afterAll, beforeAll, describe, expect, test } from "vitest"
import createServer from "../../src/app.js"
import client from "../pool.js"

describe("get profile data", async () => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
  })

  beforeAll(async () => {
    await client.query('delete from "users" where user_username = $1', [
      "profiledataguy",
    ])

    await app.inject({
      method: "post",
      url: "/auth/signup",
      payload: {
        username: "profiledataguy",
        email: "profiledataguy@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "4589403342",
      },
    })

    const birthdate = dayjs().subtract(20, "years").toDate()
    await client.query(
      'update "users" set user_birthdate = $1 where user_username = $2',
      [birthdate, "profiledataguy"],
    )

    const userResponse = await app.inject({
      method: "post",
      url: "/auth/signin",
      payload: {
        email: "profiledataguy@gmail.com",
        password: "asdfghjkl123",
      },
    })
  })

  const token = userResponse.json<{ token: string }>().token

  test("route does not exist", async () => {
    const response = await app.inject({
      method: "get",
      url: "/accounts//profile-data",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toEqual(400)
    expect(response.json().message).toEqual(
      "params should have required property 'username'",
    )
  })

  test("inexistent username", async () => {
    const response = await app.inject({
      method: "get",
      url: "/accounts/randomguylolsdf/profile-data",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.statusCode).toEqual(404)
    expect(response.json().message).toEqual("user not found")
  })

  test("successful call", async () => {
    const response = await app.inject({
      method: "get",
      url: "/accounts/aryastark/profile-data",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.json()).toEqual({
      email: "aryastark@gmail.com",
      phoneCountryCode: "66",
      phoneNumber: "994485893",
      birthdate: "",
      iso31662: "TH",
    })
  })

  test("guys with a birthdate", async () => {
    const response = await app.inject({
      method: "get",
      url: "/accounts/profiledataguy/profile-data",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    expect(response.json()).toEqual({
      email: "profiledataguy@gmail.com",
      phoneCountryCode: "66",
      phoneNumber: "4589403342",
      birthdate: dayjs(birthdate)
        .set("hour", 0)
        .set("minute", 0)
        .set("second", 0)
        .set("millisecond", 0)
        .toISOString(),
      iso31662: "",
    })
  })
})
