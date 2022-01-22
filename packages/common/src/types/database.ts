/**
 * Status about how each user is doing
 *
 * - `'user'` is when they haven't created or don't have any events running.
 * - `'organizer'` is when they have created an event and running, if an event is completed,
 * that user's role will automatically downgraded to 'user'.
 * - `'admin'` superuser role that cannot be created normally.
 */
export const enum t_user_roles {
  user = 'user',
  organizer = 'organizer',
  admin = 'admin'
}

/**
 * Table that stores user informations.
 */
export interface users {
  /**
   * User's username, will not exceed 15 characters. Not null.
   */
  user_username: string
  /**
   * User's email. Not null. Unique.
   */
  user_email: string
  /**
   * User's password. Not null, cannot be longer than 64 characters but no length limit in database.
   */
  user_password: string
  /**
   * User's roles, Not null, default is `'user'`, will get upgraded to `'organizer'` when there's an event running,
   * An `'admin'` role could only be created right in the database by injecting custom api calls.
   */
  user_role: t_user_roles
  /**
   * Users's image profile, Not null, stores path to user image in /uploads folder, default is
   * `''`.
   */
  user_image_profile_path: string
  /**
   * Users's telephone number, not null, stores as a string, default is `''`.
   */
  user_telephone_number: string
  /**
   * Users's birthdate, string, NULLABLE, stores as a string in `YYYY-MM-DD` format. default is `null`.
   */
  user_birthdate: string | null
}

/**
 * Table storing events created from users.
 */
export interface events {
  /**
   * Event id, not null, unique, generates from `nanoid()`
   */
  event_id: string
  /**
   * Event name, not null, stores event name.
   */
  event_name: string
  /**
   * Event descriptions, not null default is `''`, stores event descriptions, can be left empty.
   */
  event_descriptions: string
  event_dates: Array<string>
}

/**
 * Table storing a `n:m` relationship between event and its tags
 */
export interface event_tags {
  event_id: string
  tag_label: string
}

/**
 * Table storing tags of events created by users.
 */
export interface tags {
  tag_label: string
}
