const emailRegExp: RegExp = /[\w-]+@\w+\.[a-zA-Z]+/

/**
 * Function for validating user emails wheter it's the right format or not.
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
