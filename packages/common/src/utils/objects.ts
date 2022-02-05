/**
 * A function to group array of objects by a property inside the object
 *
 * @example
 * ```ts
 * const food = [
 *   {
 *     type: 'grape',
 *     price: 150
 *   },
 *   {
 *     type: 'orange',
 *     price: 122
 *   },
 *   {
 *     type: 'grape',
 *     price: 200
 *   },
 *   {
 *     type: 'grape',
 *     price: 150
 *   },
 * ]
 *
 * const grouped = groupBy(food, f => f.type)
 *
 * >>> {
 *   grape: [
 *     {
 *       type: 'grape',
 *       price: 150
 *     },
 *     {
 *       type: 'grape',
 *       price: 200
 *     },
 *     {
 *       type: 'grape',
 *       price: 150
 *     }
 *   ],
 *   orange: [
 *     {
 *       type: 'orange',
 *       price: 122
 *     }
 *   ]
 * }
 * ```
 *
 * @param items list of array of objects
 * @param key which element inside of object to be picked and grouped
 * @returns Record of given key
 *
 * @see https://stackoverflow.com/a/62765924/12386405
 */
export const groupBy = <K extends keyof any, T extends object>(items: Array<T>, key: (i: T) => K): Record<K, Array<T>> => {
  return items.reduce((previous, current) => {
    const group = key(current)

    if (previous[group] == null) {
      previous[group] = []
    }

    previous[group].push(current)
    return previous
  // eslint-disable-next-line
  }, {} as Record<K, Array<T>>)
}
