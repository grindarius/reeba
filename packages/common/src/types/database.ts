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

/**
 * Enum to store event status
 *
 * - `'open'` means the event is open to others, will be able to look at and make transactions.
 * - `'closed'` means the event is not accepting anymore transactions, and will not be visible to others.
 * Will be marked as closed for other people who bought the ticket.
 *
 * TODO: Might need more statuses
 */
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
   * Event's opening date to sell tickets, stored as `timestamp with time zone` string, no default
   * but will never be null.
   */
  event_opening_date: string
  /**
   * Event's status, either `'open'` or `'closed'`. default for when opening an event is `closed`.
   */
  event_status: t_event_status
  /**
   * Event's ticket prices array. Will be an array of type `t_event_price`. Stored as a pair of
   * color and their price as integer.
   */
  event_ticket_prices: Array<t_event_price>
  /**
   * Minimum age of a user, cannot be null, cannot be less than 0, default is 0
   */
  event_minimum_age: number
}

/**
 * Table that stores tags of an event. needs HEAVY NORMALIZATION before putting in.
 */
export interface event_tags {
  /**
   * Tag label, primark key. Refers to type of an event.
   */
  event_tag_label: string
}

/**
 * table that creates a many to many relationship between an event and their tags.
 */
export interface event_tags_bridge {
  /**
   * Tag label, primark key. Refers to type of an event.
   */
  event_tag_label: string
  /**
   * Event's ID
   */
  event_id: string
}

/**
 * Table that stores datetimes of an event. (1 event could occur many times)
 */
export interface event_datetimes {
  /**
   * Datetime id, default is `nanoid()`
   */
  event_datetime_id: string
  /**
   * Event's id
   */
  event_id: string
  /**
   * Event start datetime, refers to when an event is starting.
   */
  event_start_datetime: string
  /**
   * Event's end datetime, referes to when an event is ending.
   */
  event_end_datetime: string
}

/**
 * Event seat section (a group of many seats)
 */
export interface event_sections {
  /**
   * Section id
   */
  event_section_id: string
  /**
   * Datetime id
   */
  event_datetime_id: string
  /**
   * row position, the section is constructed in 2d manner, zero-based
   */
  event_section_row_position: number
  /**
   * column position, the section is constructed in 2d manner, zero-based
   */
  event_section_column_position: number
}

/**
 * Table storing each individual seats in an event
 */
export interface event_seats {
  /**
   * Seat id.
   */
  event_seat_id: string
  /**
   * its section it belongs to.
   */
  event_section_id: string
  /**
   * Seat price.
   */
  event_seat_price: number
  /**
   * seat row position, the seat is constructed in 2d manner. zero-based
   */
  event_seat_row_position: number
  /**
   * seat column position, the seat is constructed in 2d manner. zero-based
   */
  event_seat_column_position: number
}

/**
 * Table storing each transaction
 */
export interface transactions {
  /**
   * transaction id
   */
  transaction_id: string
  /**
   * user who does the transaction
   */
  user_username: string
  /**
   * time when the transaction happens. stores in pg timestamp with time zone format.
   */
  transaction_time: string
}

/**
 * table storing individual seats the transactions happen.
 */
export interface transaction_details {
  /**
   * which seat this transaction has acquired.
   */
  event_seat_id: string
  /**
   * which transaction id it belongs to.
   */
  transaction_id: string
}
