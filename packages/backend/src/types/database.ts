/**
 * Table that stores user informations.
 */
export interface users {
  /**
   * id of each user. Unique. Not null. generated using `nanoid(25)`. Primary key.
   */
  user_id: string
  /**
   * User's username, will not exceed 15 characters. Not null.
   */
  user_name: string
  /**
   * User's email. Not null. Unique.
   */
  user_email: string
  /**
   * User's password. Not null, cannot be longer than 64 characters but no length limit in database.
   */
  user_password: string
}
