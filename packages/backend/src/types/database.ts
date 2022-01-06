/**
 * Status about how each user is doing
 *
 * - `'user'` is when they haven't created or don't have any events running.
 * - `'organizer'` is when they have created an event and running, if an event is completed,
 * that user's role will automatically downgraded to 'user'.
 * - `'admin'` superuser role that cannot be created normally.
 */
export const enum UserRoles {
  User = 'user',
  Organizer = 'organizer',
  Admin = 'admin'
}

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
  /**
   * User's roles, Not null, default is 'user', will get upgraded to 'organizer' when there's an event running,
   * An admin role could only be created right in the database by injecting custom api calls.
   */
  user_role: UserRoles
  /**
   * Users's image profile, Not null, stores path to user image in /uploads folder, default is
   * `/uploads/default-user-profile.png`.
   */
  user_profile_path: string
}
