import { emailRegExp, fileExtensionMatchRegExp, phoneNumberRegExp, usernameRegExp } from '../constants'

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
  if (username.toLowerCase() === 'events') {
    return false
  }

  if (username.toLowerCase() === 'null') {
    return false
  }

  if (username.toLowerCase() === 'undefined') {
    return false
  }

  if (username.toLowerCase() === 'event') {
    return false
  }

  if (username.toLowerCase() === 'search') {
    return false
  }

  if (username.toLowerCase() === 'docs') {
    return false
  }

  if (username.toLowerCase() === 'receipt') {
    return false
  }

  if (username.toLowerCase() === 'create') {
    return false
  }

  if (username.toLowerCase() === 'developer') {
    return false
  }

  if (username.toLowerCase() === 'organizer') {
    return false
  }

  if (username.toLowerCase() === 'account') {
    return false
  }

  if (username.toLowerCase() === 'edit') {
    return false
  }

  if (username.toLowerCase() === 'seats') {
    return false
  }

  if (username.toLowerCase() === 'root') {
    return false
  }

  if (username.toLowerCase() === 'signin') {
    return false
  }

  if (username.toLowerCase() === 'signup') {
    return false
  }

  if (username.toLowerCase() === 'auth') {
    return false
  }

  if (username.toLowerCase() === 'avatars') {
    return false
  }

  if (username.length < 1 || username.length > 30) {
    return false
  }

  if (!usernameRegExp.test(username)) {
    return false
  }

  return true
}

/**
 * A function to validate simple phone number without spacebar and at least 4 digits, max 15 digits, will
 * fail if the string contains any delimiters (` `, `\n`, `\t`)
 *
 * @see https://www.quora.com/What-is-maximum-and-minimum-length-of-any-mobile-number-across-the-world
 *
 * @param phoneNumber phone number string
 * @returns boolean indicating whether the format is right
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  if (phoneNumber.length < 4 || phoneNumber.length > 15) {
    return false
  }

  if (!phoneNumberRegExp.test(phoneNumber)) {
    return false
  }

  return true
}

/**
 * Get file extension from a filename, used to extract file extension to rename a file when saving
 * an image to API. Either returns the extension without the dot, or throw an error about unmatched file extension.
 *
 * @param filename the filename
 * @returns either extension name without the dot, or throw an error about unmatched file extension
 */
export const getFileExtension = (filename: string): string => {
  const matches = filename.match(fileExtensionMatchRegExp)

  if (matches != null) {
    return matches[1]
  }

  throw new Error('unmatched file extension')
}
