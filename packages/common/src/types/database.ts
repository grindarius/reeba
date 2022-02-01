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
 * Stores information about event start dates and end dates, each as a `timestamp with time zone` string.
 */
export interface t_event_datetime {
  /**
   * Event's start date, not null, a string that stores timestamp with time zone string.
   */
  start_date: string
  /**
   * Event's end date, not null, a string that stores tiemstamp with time zone string.
   */
  end_date: string
}

/**
 * PostgreSQL's `point` type
 */
export interface point {
  x: number
  y: number
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
   * whether a user is verified or not. Events created from a verified user will be an `official` event, otherwise a `local` event.
   * default is `false`
   */
  user_verification_status: boolean
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
   * Username of a user who created this event, not null.
   */
  user_username: string
  /**
   * Event id, not null, unique, generates from `nanoid()`
   */
  event_id: string
  /**
   * Event name, not null.
   */
  event_name: string
  /**
   * Event's website for further data, not null, default is `''`
   */
  event_website: string
  /**
   * Event description, as a markdown string, rendered as Github Flavoured Markdown. default is `''`
   */
  event_description: string
  /**
   * Event datetimes, stored as a postgres's custom type up above. default is just empty array.
   */
  event_datetimes: Array<t_event_datetime>
  /**
   * The name of where the event will be hosted. default is empty string but frontend would not let this pass.
   */
  event_venue_name: string
  /**
   * Coordinate of where the event is, stores as a PostgreSQL `point` type. default is
   *
   * ```
   * {
   *   x: 0,
   *   y: 0
   * }
   * ```
   */
  event_venue_coordinates: point
  /**
   * Event's opening date to sell tickets, stored as timestamp with time zone string, not default
   * but will never be null.
   */
  event_opening_date: string
  /**
   * Price range of an event, can only be an integer, will be sorted from min to max. never null,
   * default is empty array but frontend will not let event without price range go through, except
   * an event marked as `free` event.
   */
  event_prices: Array<number>
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
