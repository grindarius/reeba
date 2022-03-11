export const url = import.meta.env.VITE_API_URL

interface Endpoint {
  url: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head'
}

type EndpointFunc<T extends object> = (args: T) => Endpoint

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

export const getEventImage: Endpoint = {
  url: url + '/event-images',
  method: 'get'
}

export const getIndividualEvent: Endpoint = {
  url: url + '/events',
  method: 'get'
}

export const postEvent: Endpoint = {
  url: url + '/events',
  method: 'post'
}

export const postEventImage: Endpoint = {
  url: url + '/event-images',
  method: 'post'
}

export const getUser: Endpoint = {
  url: url + '/users',
  method: 'get'
}

export const getUserRelatedEvents: Endpoint = {
  url: url + '/users',
  method: 'get'
}
