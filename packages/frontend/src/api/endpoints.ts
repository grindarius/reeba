export const url = import.meta.env.VITE_API_URL

interface Endpoint {
  url: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head'
}

export const postAvatar: Endpoint = {
  url: url + '/avatars',
  method: 'post'
}
