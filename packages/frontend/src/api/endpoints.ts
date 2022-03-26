export const url = import.meta.env.VITE_API_URL

interface Endpoint {
  url: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head'
}

export type EndpointFunc<T extends object> = (args: T) => Endpoint

export const postAvatar: Endpoint = {
  url: url + '/avatars',
  method: 'post'
}

export const getRootPageEvents: Endpoint = {
  url: url + '/events/root',
  method: 'get'
}

export const signin: Endpoint = {
  url: url + '/auth/signin',
  method: 'post'
}

export const signup: Endpoint = {
  url: url + '/auth/signup',
  method: 'post'
}

export const getUserAvatar: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/avatars/${username}`,
    method: 'get'
  }
}

export const getEventImage: EndpointFunc<{ eventId: string }> = ({ eventId }): Endpoint => {
  return {
    url: `${url}/event-images/${eventId}`,
    method: 'get'
  }
}

export const getIndividualEvent: EndpointFunc<{ eventId: string }> = ({ eventId }): Endpoint => {
  return {
    url: `${url}/events/${eventId}`,
    method: 'get'
  }
}

export const postEvent: Endpoint = {
  url: url + '/events',
  method: 'post'
}

export const postEventImage: Endpoint = {
  url: url + '/event-images',
  method: 'post'
}

export const getUser: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}`,
    method: 'get'
  }
}

export const getUserRelatedEvents: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}/events`,
    method: 'get'
  }
}

export const getSearchResult: Endpoint = {
  url: url + '/search',
  method: 'get'
}

export const postTransaction: Endpoint = {
  url: url + '/transactions',
  method: 'post'
}
