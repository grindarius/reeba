import { UserRoles } from '../types'

/**
 * Create object used to sign by `jsonwebtoken`
 *
 * @param id user id
 * @returns an object containing user id to be signed by `jsonwebtoken`
 */
export const createSignPayload = (id: string, role: UserRoles): {
  user: {
    id: string
    role: UserRoles
  }
} => {
  return { user: { id, role } }
}
