import { emailRegExp, usernameRegExp } from '../constants'

/**
 * Function for validating user emails whether it's the right format or not.
 *
 * The format starts with word, dot and dash starts with length of 1, followed by `@` with
 * any word, followed by `.` and a word at last part.
 *
 * @param email email string
 * @returns boolean states that whether the email is the correct format or not.
 */
export const validateEmail = (email: string): boolean => {
  return emailRegExp.test(email)
}

/**
 * Function for validation usernames whether it's the right format or not.
 *
 * The rules are:
 * - within 1 to 30 character length.
 * - can only contain characters in RegExp `\w`.
 *
 * @param username username
 * @returns boolean indicating if username is right.
 */
export const validateUsername = (username: string): boolean => {
  if (username.length < 1 && username.length > 30) {
    return false
  }

  if (!usernameRegExp.test(username)) {
    return false
  }

  return true
}
