
import { Config } from "./types"

export function getDefaultConfig(): Config {
  return {
    version: 1,
    enabled: true
  }
}

export const standardIcons = {
  "128": `icon128.png`
}

export const grayscaleIcons = {
  "128": `icon128_grayscale.png`
}