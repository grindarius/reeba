const emailRegExp: RegExp = /^([\w-.]+)@([\w]+)\.([\w]+)$/

export const validateEmail = (email: string): boolean => {
  return emailRegExp.test(email)
}
