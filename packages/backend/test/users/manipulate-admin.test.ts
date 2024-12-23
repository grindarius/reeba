import t from "tap"

import createServer from "../../src/app"
import client from "../pool"

void t.test("manipulating a user", async t => {
  const app = createServer()

  t.teardown(async () => {
    await app.close()
  })

  await client.query('delete from "users" where user_username in ($1, $2)', [
    "rolebulliedguy",
    "fakeadminguy"
  ])

  await app.inject({
    method: "post",
    url: "/auth/signup",
    payload: {
      username: "rolebulliedguy",
      email: "rolebulliedguy@gmail.com",
      password: "asdfghjkl123",
      phoneCountryCode: "66",
      phoneNumber: "9485983984",
      iso31662: "TH"
    }
  })

  await app.inject({
    method: "post",
    url: "/auth/signup",
    payload: {
      username: "fakeadmin",
      email: "fakeadmin@gmail.com",
      password: "asdfghjkl123",
      phoneCountryCode: "66",
      phoneNumber: "948593383984",
      iso31662: "TH"
    }
  })

  const fakeAdminResponse = await app.inject({
    method: "post",
    url: "/auth/signin",
    payload: {
      email: "fakeadmin@gmail.com",
      password: "asdfghjkl123"
    }
  })

  const fakeAdminToken = fakeAdminResponse.json<{ token: string }>().token

  await t.test("granting admin by fake admin", async t => {
    try {
      const response = await app.inject({
        method: "patch",
        url: "/users/rolebulliedguy/admin",
        headers: {
          Authorization: `Bearer ${fakeAdminToken}`
        }
      })

      expect(response.statusCode).toEqual(403)
      t.strictSame(response.json().message, "forbidden")
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await client.query(
    'update "users" set user_role = $1 where user_username = $2',
    ["admin", "fakeadmin"]
  )

  const realAdminResponse = await app.inject({
    method: "post",
    url: "/auth/signin",
    payload: {
      email: "fakeadmin@gmail.com",
      password: "asdfghjkl123"
    }
  })
  const realAdminToken = realAdminResponse.json<{ token: string }>().token

  await t.test("granting admin with fake admin", async t => {
    try {
      const response = await app.inject({
        method: "patch",
        url: "/users/rolebulliedguy/admin",
        headers: {
          Authorization: `Bearer ${fakeAdminToken}`
        }
      })

      expect(response.statusCode).toEqual(403)
      t.strictSame(response.json().message, "forbidden")
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("granting but no username to grant", async t => {
    try {
      const response = await app.inject({
        method: "patch",
        url: "/users//admin",
        headers: {
          Authorization: `Bearer ${realAdminToken}`
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

  await t.test("successfully grant admin", async t => {
    try {
      const response = await app.inject({
        method: "patch",
        url: "/users/rolebulliedguy/admin",
        headers: {
          Authorization: `Bearer ${realAdminToken}`
        }
      })

      expect(response.statusCode).toEqual(200)
      t.strictSame(response.json(), { message: "complete" })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("revoke admin by fake admin", async t => {
    try {
      const response = await app.inject({
        method: "delete",
        url: "/users/rolebulliedguy/admin",
        headers: {
          Authorization: `Bearer ${fakeAdminToken}`
        }
      })

      expect(response.statusCode).toEqual(403)
      t.strictSame(response.json().message, "forbidden")
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })

  await t.test("no username to revoke admin from", async t => {
    try {
      const response = await app.inject({
        method: "delete",
        url: "/users//admin",
        headers: {
          Authorization: `Bearer ${realAdminToken}`
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

  await t.test("successfully revoke admin", async t => {
    try {
      const response = await app.inject({
        method: "delete",
        url: "/users/rolebulliedguy/admin",
        headers: {
          Authorization: `Bearer ${realAdminToken}`
        }
      })

      expect(response.statusCode).toEqual(200)
      t.strictSame(response.json(), { message: "complete" })
    } catch (error) {
      t.error(error)
      t.fail()
    }
  })
})
