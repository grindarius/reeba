/**
 * Create object used to sign by `jsonwebtoken`
 *
 * @param id user id
 * @returns an object containing user id to be signed by `jsonwebtoken`
 */
export const createSignPayload = (id: string): {
  user: {
    id: string
  }
} => {
  return { user: { id } }
}
