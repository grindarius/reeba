import dayjs from "dayjs"

/**
 * Formats a given date string to format to specific style
 *
 * @param datetime datetime, either an object of date or a string
 * @param format dayjs format, default is `MMMM D, YYYY HH:mm`
 * @returns date string of a given format
 *
 * @see https://day.js.org/docs/en/display/format
 */
export const formatTimeString = (
  datetime: string | Date,
  format = "MMMM D, YYYY HH:mm"
): string => {
  return dayjs(datetime).format(format)
}
