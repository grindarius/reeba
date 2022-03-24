import { EventTags } from '../types'

/**
 * Convert string with space to lowercase and replace space with dashes for event tag keys
 *
 * @param original original string
 * @returns converted string, matches with primary key of `event_tags` table
 */
export const normalizeTag = (original: EventTags): string => {
  return original.trim().replace(/\s+/g, '-').toLowerCase()
}
