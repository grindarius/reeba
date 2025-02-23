import dotenv from "dotenv-flow"
import { resolve } from "node:path"

import { describe, test, expect, beforeAll, afterAll } from "vitest"

import { t_user_role } from "@reeba/common"

import createServer from "../../src/app.js"
import client from "../pool.js"

dotenv.config({
  path: resolve(__dirname, "..", ".."),
  silent: true
})

describe("get user test", async t => {
  const app = createServer()

  afterAll(async () => {
    await app.close()
  })

  const resp = await app.inject({
    method: "post",
    url: "/auth/signin",
    payload: {
      email: "sansastark@gmail.com",
      password: "sansastark"
    }
  })

  const token = resp.json().token

  void t.test("get data from certain user", async t => {
    try {
      const response = await app.inject({
        method: "GET",
        url: "/users/sansastark",
        headers: {
          Authorization: `Bearer ${token as string}`
        }
      })

      t.strictSame(response.json().username, "sansastark")
      expect(response.json().verificationStatus).toEqual(false)
      t.strictSame(response.json().socialMedias, {
        facebook: "",
        instagram: "",
        twitter: "",
        tiktok: "",
        email: "",
        website: ""
      })
      t.strictSame(
        response.json().profileDescription,
        "I am Arya Stark's older sister."
      )
      expect(response.json().eventsCreatedAmount).toEqual(undefined)
      expect(response.json().eventsAttendedAmount).toEqual(undefined)
      expect(response.json().isAdmin).toEqual(true)
      expect(response.json().followersAmount).toEqual(0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test("empty querystring", async t => {
    try {
      const response = await app.inject({
        method: "GET",
        url: "/users/",
        headers: {
          Authorization: `Bearer ${token as string}`
        }
      })

      expect(response.statusCode).toEqual(400)
      t.strictSame(
        response.json().message,
        "params should have required property 'username'"
      )
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  void t.test("user not found", async t => {
    try {
      const response = await app.inject({
        method: "GET",
        url: "/users/sdfsdfddfdf",
        headers: {
          Authorization: `Bearer ${token as string}`
        }
      })

      expect(response.statusCode).toEqual(404)
      t.strictSame(response.json().message, "user not found")
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  const login = await app.inject({
    method: "post",
    url: "/auth/signin",
    payload: {
      email: "aryastark@gmail.com",
      password: "aryastark"
    }
  })

  void t.test("testing the user, admin logic", async t => {
    try {
      const response = await app.inject({
        method: "GET",
        url: "/users/aryastark",
        headers: {
          Authorization: `Bearer ${login.json().token as string}`
        }
      })

      t.strictSame(response.json().username, "aryastark")
      expect(response.json().verificationStatus).toEqual(true)
      expect(response.json().isAdmin).toEqual(false)
      t.strictSame(response.json().socialMedias, {
        facebook: "",
        instagram: "",
        twitter: "",
        tiktok: "",
        email: "",
        website: ""
      })
      t.strictSame(
        response.json().profileDescription,
        "I am Sansa Stark's youger sister."
      )
      expect(response.json().eventsCreatedAmount).toEqual(undefined)
      expect(response.json().eventsAttendedAmount).toEqual(undefined)
      expect(response.json().followersAmount).toEqual(0)
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await client.query(
    'update "users" set user_role = $1 where user_username = $2',
    [t_user_role.admin, "aryastark"]
  )

  await t.test(
    "if admin becomes true, verification status should be ignored",
    async t => {
      try {
        const response = await app.inject({
          method: "GET",
          url: "/users/aryastark",
          headers: {
            Authorization: `Bearer ${login.json().token as string}`
          }
        })

        t.strictSame(response.json().username, "aryastark")
        expect(response.json().verificationStatus).toEqual(true)
        expect(response.json().isAdmin).toEqual(true)
        t.strictSame(response.json().socialMedias, {
          facebook: "",
          instagram: "",
          twitter: "",
          tiktok: "",
          email: "",
          website: ""
        })
        t.strictSame(
          response.json().profileDescription,
          "I am Sansa Stark's youger sister."
        )
        expect(response.json().eventsCreatedAmount).toEqual(undefined)
        expect(response.json().eventsAttendedAmount).toEqual(undefined)
        expect(response.json().followersAmount).toEqual(0)
      } catch (error) {
        t.error(error)
        t.fail()
      }
    }
  )

  await client.query(
    'update "users" set user_role = $1 where user_username = $2',
    [t_user_role.user, "aryastark"]
  )
  await client.query(
    'update "users" set user_verification_status = $1 where user_username = $2',
    [true, "aryastark"]
  )

  await t.test(
    "verified user who is not admin should work correctly",
    async t => {
      try {
        const response = await app.inject({
          method: "GET",
          url: "/users/aryastark",
          headers: {
            Authorization: `Bearer ${login.json().token as string}`
          }
        })

        t.strictSame(response.json().username, "aryastark")
        expect(response.json().verificationStatus).toEqual(true)
        expect(response.json().isAdmin).toEqual(false)
        t.strictSame(response.json().socialMedias, {
          facebook: "",
          instagram: "",
          twitter: "",
          tiktok: "",
          email: "",
          website: ""
        })
        t.strictSame(
          response.json().profileDescription,
          "I am Sansa Stark's youger sister."
        )
        expect(response.json().eventsCreatedAmount).toEqual(undefined)
        expect(response.json().eventsAttendedAmount).toEqual(undefined)
        expect(response.json().followersAmount).toEqual(0)
      } catch (error) {
        t.error(error)
        t.fail()
      }
    }
  )

  await client.query(
    `update "users" set
      user_verification_status = $1,
      user_role = $2
    where user_username = $3`,
    [false, "user", "aryastark"]
  )

  t.end()
})
