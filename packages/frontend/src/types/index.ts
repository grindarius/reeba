import { Dayjs } from 'dayjs'

/**
 * Store event start and end time as a pair in create event page
 */
export interface EventTime {
  from: Dayjs
  to: Dayjs
}
