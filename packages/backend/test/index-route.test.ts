import { afterAll, expect, test } from "vitest"
import createServer from "../src/app.js"

test("Requesting / route", async t => {
  const app = createServer()

  afterAll(async () => await app.close())

  const response = await app.inject({
    method: "GET",
    url: "/"
  })

  expect(response.statusCode, "Return status code of 200").toEqual(200)
  expect(
    response.json(),
    "Return object of email and author for contribution."
  ).toEqual({
    author: "Bhattarapong Somwong",
    description: "Please contact bhattarapongs62@nu.ac.th for contrubition."
  })
})
