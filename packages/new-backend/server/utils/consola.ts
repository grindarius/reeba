import consola from "consola"

export function useLogger() {
  return consola.withTag("nitro")
}
