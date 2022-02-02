/**
 * Status about how each user is doing
 *
 * - `'user'` is when they haven't created or don't have any events running.
 * - `'admin'` superuser role that cannot be created normally.
 */
export const enum t_user_role {
  /**
   * User role
   */
  user = 'user',
  /**
   * Admin role
   */
  admin = 'admin'
}

export interface t_event_price {
  event_color: string
  seat_price: number
}

export const enum t_event_status {
  open = 'open',
  closed = 'closed'
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
   * User's roles, Not null, default is `'user'`, will get upgraded to `'organizer'` when there's an event running,
   * An `'admin'` role could only be created right in the database by injecting custom api calls.
   */
  user_role: t_user_role
  /**
   * Users's image profile, Not null, stores path to user image in /uploads folder, default is
   * `''`.
   */
  user_image_profile_path: string
  /**
   * whether a user is verified or not. Events created from a verified user will be an `official` event, otherwise a `local` event.
   * default is `false`
   */
  user_verification_status: boolean
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
   * Username of a user who created this event, not null.
   */
  user_username: string
  /**
   * Event name, not null.
   */
  event_name: string
  /**
   * Event description, rendered as Github Flavoured Markdown, default is `## No description provided`
   */
  event_description: string
  /**
   * Event's cover image
   */
  event_cover_image_path: string
  /**
   * Event's website for further data, not null, default is `''`
   */
  event_website: string
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
  event_status: string
  event_ticket_prices: Array<t_event_price>
  event_minimum_age: number
}

/**
 * Table storing a `n:m` relationship between event and its tags
 */
export interface event_tags {
  event_tag_label: string
}

export interface event_tags_bridge {
  event_tag_label: string
  event_id: string
}

export interface event_datetimes {
  event_datetime_id: string
  event_id: string
  event_start_datetime: string
  event_end_datetime: string
}

export interface event_sections {
  event_section_id: string
  event_datetime_id: string
  event_section_row_position: number
  event_section_column_position: number
}

export interface event_seats {
  event_seat_id: string
  event_section_id: string
  event_seat_price: number
  event_seat_row_position: number
  event_seat_column_position: number
}

export interface transactions {
  transaction_id: string
  user_username: string
  event_id: string
}

export interface transaction_details {
  event_seat_id: string
  transaction_id: string
}

/**
 * Table storing tags of events created by users.
 */
export interface tags {
  tag_label: string
}
