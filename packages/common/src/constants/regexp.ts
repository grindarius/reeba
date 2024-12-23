/**
 * RegExp to match email
 */
export const emailRegExp: RegExp = /[\w-]+@\w+\.[a-zA-Z]+/

/**
 * RegExp to match usernames
 *
 * @see https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username
 */
export const usernameRegExp: RegExp = /^(?=.{0,30}$)[a-zA-Z0-9_-]+$/

/**
 * RegExp used to find file extension to a filename and invalidate file extensions
 *
 * @see https://stackoverflow.com/a/374956/12386405
 */
export const fileExtensionMatchRegExp: RegExp =
  /^.*\.(jpg|JPG|png|PNG|jpeg|JPEG)$/

/**
 * RegExp to match plain `n` digit phone number without spacebar
 *
 * @see https://www.quora.com/What-is-maximum-and-minimum-length-of-any-mobile-number-across-the-world
 */
export const phoneNumberRegExp: RegExp = /^\d{4,15}$/
