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
