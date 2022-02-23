export const url = import.meta.env.VITE_API_URL

interface Endpoint {
  url: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head'
}

export const postAvatar: Endpoint = {
  url: url + '/avatars',
  method: 'post'
}

export const getRootPageEvents: Endpoint = {
  url: url + '/events/root',
  method: 'get'
}

export const getUserAvatar: Endpoint = {
  url: url + '/avatars',
  method: 'get'
}

export const getEventImage: Endpoint = {
  url: url + '/event-images',
  method: 'get'
}

export const getIndividualEvent: Endpoint = {
  url: url + '/events',
  method: 'get'
}
