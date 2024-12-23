import { randomInt } from "d3"
import tinycolor from "tinycolor2"

export const randomPastelColor = (): string => {
  const r = randomInt(255)()
  const g = randomInt(255)()
  const b = randomInt(255)()

  const randomColor = tinycolor({ r, g, b }).saturate(10)
  return tinycolor.mix(randomColor, { r: 255, g: 255, b: 255 }).toHexString()
}
