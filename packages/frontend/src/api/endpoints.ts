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

export const getUserProfileData: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/profile-data`,
    method: 'get'
  }
}

export const patchUserProfileData: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/profile-data`,
    method: 'patch'
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

export const getMyTickets: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/tickets`,
    method: 'get'
  }
}

export const getEventSeats: EndpointFunc<{ eventId: string }> = ({ eventId }): Endpoint => {
  return {
    url: `${url}/events/${eventId}/seats`,
    method: 'get'
  }
}

export const postFollow: Endpoint = {
  url: `${url}/followings/follow`,
  method: 'post'
}

export const adminGetUserData: Endpoint = {
  url: `${url}/admin/users`,
  method: 'get'
}

export const adminGrantAdmin: EndpointFunc<{ username: string }> = ({ username }) => {
  return {
    url: `${url}/users/${username}/admin`,
    method: 'patch'
  }
}

export const adminRevokeAdmin: EndpointFunc<{ username: string }> = ({ username }) => {
  return {
    url: `${url}/users/${username}/admin`,
    method: 'delete'
  }
}

export const adminGrantVerification: EndpointFunc<{ username: string }> = ({ username }) => {
  return {
    url: `${url}/users/${username}/verification`,
    method: 'patch'
  }
}

export const adminRevokeVerification: EndpointFunc<{ username: string }> = ({ username }) => {
  return {
    url: `${url}/users/${username}/verification`,
    method: 'delete'
  }
}

export const adminRemoveUser: EndpointFunc<{ username: string }> = ({ username }) => {
  return {
    url: `${url}/users/${username}`,
    method: 'delete'
  }
}

export const adminGetTransactionData: Endpoint = {
  url: `${url}/admin/transactions`,
  method: 'get'
}

export const getTransaction: EndpointFunc<{ transactionId: string }> = ({ transactionId }): Endpoint => {
  return {
    url: `${url}/transactions/${transactionId}`,
    method: 'get'
  }
}

export const getTransactionInvoice: EndpointFunc<{ transactionId: string }> = ({ transactionId }): Endpoint => {
  return {
    url: `${url}/transactions/${transactionId}/pdf`,
    method: 'get'
  }
}

export const adminGetEventData = {
  url: `${url}/admin/events`,
  method: 'get'
}

export const postTransferTransaction: EndpointFunc<{ transactionId: string }> = ({ transactionId }): Endpoint => {
  return {
    url: `${url}/transactions/${transactionId}/transfer`,
    method: 'post'
  }
}

export const postManipulateEvent: EndpointFunc<{ eventId: string }> = ({ eventId }): Endpoint => {
  return {
    url: `${url}/events/${eventId}/manipulate`,
    method: 'post'
  }
}

export const adminGetStatisticsSummary: Endpoint = {
  url: `${url}/admin/summary`,
  method: 'get'
}

export const adminGetMapsData: Endpoint = {
  url: `${url}/admin/maps`,
  method: 'get'
}

export const adminGetTransactionSummary: Endpoint = {
  url: `${url}/admin/transaction-summary`,
  method: 'get'
}

export const adminGetRegistrationSummary: Endpoint = {
  url: `${url}/admin/registration-summary`,
  method: 'get'
}

export const adminGetTopEventTagsOfAllTime: Endpoint = {
  url: `${url}/admin/top-event-tags`,
  method: 'get'
}

export const getOrganizerData: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/organizer`,
    method: 'get'
  }
}

export const getOrganizerOverviewData: EndpointFunc<{ username: string, eventId: string }> = ({ username, eventId }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/organizer/${eventId}`,
    method: 'get'
  }
}

export const getOrganizerMapOverview: EndpointFunc<{ username: string, eventId: string }> = ({ username, eventId }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/organizer/${eventId}/maps`,
    method: 'get'
  }
}
