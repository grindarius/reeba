import { afterAll, beforeAll, describe, expect, test } from "vitest"
import createServer from "../../src/app.js"
import client from "../pool.js"

describe("getting admin data about user", async () => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
  })

  beforeAll(async () => {
    await client.query('delete from "users" where user_username = $1', [
      "thatnolevelguy",
    ])

    await app.inject({
      method: "post",
      url: "/auth/signup",
      payload: {
        username: "thatnolevelguy",
        email: "thatnolevelguy@gmail.com",
        password: "asdfghjkl123",
        phoneCountryCode: "66",
        phoneNumber: "94839483",
        iso31662: "TH",
      },
    })

    const resp = await app.inject({
      method: "post",
      url: "/auth/signin",
      payload: {
        email: "thatnolevelguy@gmail.com",
        password: "asdfghjkl123",
      },
    })

    const adminResp = await app.inject({
      method: "post",
      url: "/auth/signin",
      payload: {
        email: "sansastark@gmail.com",
        password: "sansastark",
      },
    })

    const token = resp.json<{ token: string }>().token
    const adminToken = adminResp.json<{ token: string }>().token
  })

  test("forbidden user", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/users",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        page: "1",
        sort: "name-asc",
      },
    })

    expect(response.statusCode).toEqual(403)
    expect(response.json()).toHaveProperty("message", "forbidden")
  })

  test("successful call", async t => {
    const response = await app.inject({
      method: "get",
      url: "/admin/users",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json().users).not.toHaveLength(0)
  })

  test("page being empty string", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/users",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      query: {
        page: "",
        sort: "name-desc",
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json().users).not.toHaveLength(0)
  })

  test("page being null", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/users",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      query: {
        page: "null",
        sort: "regis-asc",
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json().users).not.toHaveLength(0)
  })

  test("page being zero", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/users",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      query: {
        page: "0",
        sort: "regis-desc",
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json().users).not.toHaveLength(0)
  })

  test("page too high until count becomes undefined", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/users",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      query: {
        page: "10",
        sort: "name-asc",
      },
    })

    expect(response.statusCode).toEqual(200)
    expect(response.json().users).not.toHaveLength(0)
  })
})
