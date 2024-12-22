import { afterAll, beforeAll, expect, test } from "vitest"
import createServer from "../../src/app.js"
import client from "../pool.js"

test("getting transaction data", async () => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
  })

  beforeAll(async () => {
    await client.query('delete from "users" where user_username = $1', [
      "thatfakeadminbrother",
    ])

    await app.inject({
      method: "post",
      url: "/auth/signup",
      payload: {
        username: "thatfakeadminbrother",
        email: "thatfakeadminbrother@gmail.com",
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
        email: "thatfakeadminbrother@gmail.com",
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

  test("forbidden request by fake admin", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/transactions",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        page: "1",
        sort: "time-asc",
      },
    })

    expect(response.statusCode).toEqual(403)
    expect(response.json()).toHaveProperty("message", "forbidden")
  })

  test("page being 0", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/transactions",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      query: {
        page: "0",
      },
    })

    expect(response.statusCode).toEqual(200)
  })

  test("undefined causing 0 in number conversion", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/transactions",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      query: {
        page: "undefined",
        sort: "time-desc",
      },
    })

    expect(response.statusCode).toEqual(200)
  })

  test("null causing NaN in number conversion", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/transactions",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      query: {
        page: "null",
        sort: "username-asc",
      },
    })

    expect(response.statusCode).toEqual(200)
  })

  test("sort being empty string", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/transactions",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      query: {
        page: "1",
        sort: "",
      },
    })

    expect(response.statusCode).toEqual(200)
  })

  test("successful order", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/transactions",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      query: {
        page: "1",
        sort: "username-desc",
      },
    })

    expect(response.statusCode).toEqual(200)
  })

  test("page too high", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/transactions",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      query: {
        page: "10",
        sort: "price-asc",
      },
    })

    expect(response.statusCode).toEqual(200)
  })

  test("another one for price desc", async () => {
    const response = await app.inject({
      method: "get",
      url: "/admin/transactions",
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      query: {
        page: "10",
        sort: "price-desc",
      },
    })

    expect(response.statusCode).toEqual(200)
  })
})
