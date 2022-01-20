import { t_user_roles } from '@reeba/common'

/**
 * Create object used to sign by `jsonwebtoken`
 *
 * @param useranme username
 * @returns an object containing username to be signed by `jsonwebtoken`
 */
export const createSignPayload = (username: string, role: t_user_roles): {
  user: {
    username: string
    role: t_user_roles
  }
} => {
  return { user: { username, role } }
}
