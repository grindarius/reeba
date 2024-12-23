import { test, expect } from "vitest"

import {
  getFileExtension,
  validateEmail,
  validatePhoneNumber,
  validateUsername
} from "../src/utils/index.js"

test("validate email formats", async () => {
  expect(validateEmail("an_email@gmail.com")).toEqual(true)
  expect(validateEmail("_another_email@gmail.com")).toEqual(true)
  expect(validateEmail("this_is_hard@outlook.co.th")).toEqual(true)
  expect(validateEmail("abc-@mail.com")).toEqual(true)
  expect(validateEmail("abc..def@mail.com")).toEqual(true)
  expect(validateEmail("abc-d@mail.com")).toEqual(true)
  expect(validateEmail("abc.def@mail.com")).toEqual(true)
  expect(validateEmail("abc-def@gmail.org")).toEqual(true)
  expect(validateEmail("noreply@reeba.com")).toEqual(true)

  expect(validateEmail("sdfdfgmail.com")).toEqual(false)
  expect(validateEmail("this.is_hard @gmail.com")).toEqual(false)
  expect(validateEmail("abc-def#gmail.com")).toEqual(false)
  expect(validateEmail("abc-def@gmail#archive.com")).toEqual(false)
})

test("validate username formats", async () => {
  expect(validateUsername("a")).toEqual(true)
  expect(validateUsername("abc")).toEqual(true)
  expect(validateUsername("AbC")).toEqual(true)
  expect(validateUsername("Chang")).toEqual(true)
  expect(validateUsername("123sdfdf")).toEqual(true)
  expect(validateUsername("Chang_international")).toEqual(true)

  expect(validateUsername("events")).toEqual(false)
  expect(validateUsername("root")).toEqual(false)
  expect(validateUsername("signin")).toEqual(false)
  expect(validateUsername("signup")).toEqual(false)
  expect(validateUsername("auth")).toEqual(false)
  expect(validateUsername("avatars")).toEqual(false)

  expect(validateUsername("Chang international")).toEqual(false)
  expect(validateUsername(" sdfdf")).toEqual(false)
  expect(validateUsername("")).toEqual(false)
  expect(validateUsername("longgggggggggggggggggggggggggggggg")).toEqual(false)

  expect(validateUsername("null")).toEqual(false)
  expect(validateUsername("undefined")).toEqual(false)
  expect(validateUsername("event")).toEqual(false)
  expect(validateUsername("search")).toEqual(false)
  expect(validateUsername("docs")).toEqual(false)
  expect(validateUsername("receipt")).toEqual(false)
  expect(validateUsername("create")).toEqual(false)
  expect(validateUsername("developer")).toEqual(false)
  expect(validateUsername("organizer")).toEqual(false)
  expect(validateUsername("account")).toEqual(false)
  expect(validateUsername("edit")).toEqual(false)
  expect(validateUsername("seats")).toEqual(false)
})

test("validate file extensions", async () => {
  expect(getFileExtension("imgur_image.png")).toEqual("png")
  expect(getFileExtension("imgur_image.PNG")).toEqual("PNG")
  expect(getFileExtension("imgur_image.jpg")).toEqual("jpg")
  expect(getFileExtension("imgur_image.JPG")).toEqual("JPG")
  expect(getFileExtension("imgur_image.jpeg")).toEqual("jpeg")
  expect(getFileExtension("imgur_image.JPEG")).toEqual("JPEG")

  expect(getFileExtension("imgur image test.png")).toEqual("png")
  expect(getFileExtension("imgur image test.PNG")).toEqual("PNG")
  expect(getFileExtension("imgur image test.jpg")).toEqual("jpg")
  expect(getFileExtension("imgur image test.JPG")).toEqual("JPG")
  expect(getFileExtension("imgur image test.jpeg")).toEqual("jpeg")
  expect(getFileExtension("imgur image test.JPEG")).toEqual("JPEG")

  expect(getFileExtension("โลกทัศน์ใหม่แห่งการเรียนรู้.png")).toEqual("png")
  expect(getFileExtension("โลกทัศน์ใหม่แห่งการเรียนรู้.PNG")).toEqual("PNG")
  expect(getFileExtension("โลกทัศน์ใหม่แห่งการเรียนรู้.jpg")).toEqual("jpg")
  expect(getFileExtension("โลกทัศน์ใหม่แห่งการเรียนรู้.JPG")).toEqual("JPG")
  expect(getFileExtension("โลกทัศน์ใหม่แห่งการเรียนรู้.jpeg")).toEqual("jpeg")
  expect(getFileExtension("โลกทัศน์ใหม่แห่งการเรียนรู้.JPEG")).toEqual("JPEG")

  expect(getFileExtension("โลกทัศน์ ใหม่แห่งการเรียนรู้.png")).toEqual("png")
  expect(getFileExtension("โลกทัศน์ ใหม่แห่งการเรียนรู้.PNG")).toEqual("PNG")
  expect(getFileExtension("โลกทัศน์ ใหม่แห่งการเรียนรู้.jpg")).toEqual("jpg")
  expect(getFileExtension("โลกทัศน์ ใหม่แห่งการเรียนรู้.JPG")).toEqual("JPG")
  expect(getFileExtension("โลกทัศน์ ใหม่แห่งการเรียนรู้.jpeg")).toEqual("jpeg")
  expect(getFileExtension("โลกทัศน์ ใหม่แห่งการเรียนรู้.JPEG")).toEqual("JPEG")

  expect(getFileExtension("โลกทัศน์.ใหม่แห่งการเรียนรู้.png")).toEqual("png")
  expect(getFileExtension("โลกทัศน์.ใหม่แห่งการเรียนรู้.PNG")).toEqual("PNG")
  expect(getFileExtension("โลกทัศน์.ใหม่แห่งการเรียนรู้.jpg")).toEqual("jpg")
  expect(getFileExtension("โลกทัศน์.ใหม่แห่งการเรียนรู้.JPG")).toEqual("JPG")
  expect(getFileExtension("โลกทัศน์.ใหม่แห่งการเรียนรู้.jpeg")).toEqual("jpeg")
  expect(getFileExtension("โลกทัศน์.ใหม่แห่งการเรียนรู้.JPEG")).toEqual("JPEG")

  expect(getFileExtension("imgur.image.test.png")).toEqual("png")
  expect(getFileExtension("imgur.image.test.PNG")).toEqual("PNG")
  expect(getFileExtension("imgur.image.test.jpg")).toEqual("jpg")
  expect(getFileExtension("imgur.image.test.JPG")).toEqual("JPG")
  expect(getFileExtension("imgur.image.test.jpeg")).toEqual("jpeg")
  expect(getFileExtension("imgur.image.test.JPEG")).toEqual("JPEG")

  expect(() => {
    getFileExtension("render.md")
  }).toThrow("unmatched file extension")
})

test("validate phone numbers", async () => {
  expect(validatePhoneNumber("943452365")).toEqual(true)
  expect(validatePhoneNumber("442352332444444444444423")).toEqual(false)
  expect(validatePhoneNumber("3984873334534244")).toEqual(false)
  expect(validatePhoneNumber("398487333453424")).toEqual(true)
  expect(validatePhoneNumber(" 4454545423")).toEqual(false)
  expect(validatePhoneNumber("445454 5423")).toEqual(false)
  expect(validatePhoneNumber("445454\n5423")).toEqual(false)
  expect(validatePhoneNumber("445454\t5423")).toEqual(false)
  expect(validatePhoneNumber("445454ก5423")).toEqual(false)
  expect(validatePhoneNumber("445454ndd5423")).toEqual(false)
})
