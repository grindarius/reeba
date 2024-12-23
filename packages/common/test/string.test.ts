import { test, expect } from "vitest"

import { EventTags, normalizeTag, numberToLetters } from "../src/index.js"

const tags: Array<[EventTags, string]> = [
  ["Amphitheater", "amphitheater"],
  ["Business", "business"],
  ["Concert", "concert"],
  ["Entertainment", "entertainment"],
  ["Fan meet", "fan-meet"],
  ["Gameshow", "gameshow"],
  ["Lifestyle", "lifestyle"],
  ["Live", "live"],
  ["Musical", "musical"],
  ["Online", "online"],
  ["Opera", "opera"],
  ["Seminar", "seminar"],
  ["Stand up comedy", "stand-up-comedy"],
  ["Technology", "technology"],
  ["Variety", "variety"]
]

test("string normalizer", t => {
  expect(tags.map(x => normalizeTag(x[0]))).toEqual(tags.map(x => x[1]))
})

test("number to letters", t => {
  expect(numberToLetters(0)).toEqual("A")
  expect(numberToLetters(5)).toEqual("F")
  expect(numberToLetters(25)).toEqual("Z")
  expect(numberToLetters(26)).toEqual("AA")

  expect(() => {
    numberToLetters(-1)
  }).toThrowError("property 'position' cannot be less than 0")
})
