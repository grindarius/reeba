import { LocationQueryValue } from "vue-router"

export const formatQueryString = (
  query: LocationQueryValue | Array<LocationQueryValue>,
  defaultValue = ""
): string => {
  return query == null
    ? defaultValue
    : Array.isArray(query)
      ? (query.filter(q => q != null)[0] ?? defaultValue)
      : query
}

export const formatQueryArray = (
  query: LocationQueryValue | Array<LocationQueryValue>
): Array<string> => {
  return query == null
    ? []
    : Array.isArray(query)
      ? (query.filter(c => c != null) as Array<string>)
      : [query]
}
