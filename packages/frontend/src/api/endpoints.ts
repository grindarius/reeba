export const url = import.meta.env.VITE_API_URL

interface Endpoint {
  url: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options'
}

export type EndpointFunc<T extends object> = (args: T) => Endpoint

export const getMyTicketsEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/tickets`,
    method: 'get'
  }
}

export const getProfileDataEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/profile-data`,
    method: 'get'
  }
}

export const patchProfileDataEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/profile-data`,
    method: 'patch'
  }
}

export const getOrganizerDataEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/organizer`,
    method: 'get'
  }
}

export const getOrganizerEventStatisticsEndpoint: EndpointFunc<{ username: string, eventId: string }> = ({ username, eventId }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/organizer/${eventId}`,
    method: 'get'
  }
}

export const getOrganizerEventOrdersEndpoint: EndpointFunc<{ username: string, eventId: string }> = ({ username, eventId }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/organizer/${eventId}/orders`,
    method: 'get'
  }
}

export const getOrganizerEventUsersMapEndpoint: EndpointFunc<{ username: string, eventId: string }> = ({ username, eventId }): Endpoint => {
  return {
    url: `${url}/accounts/${username}/organizer/${eventId}/maps`,
    method: 'get'
  }
}

export const adminGetEventsDataEndpoint: Endpoint = {
  url: `${url}/admin/events`,
  method: 'get'
}

export const adminGetStatisticsSummaryEndpoint: Endpoint = {
  url: `${url}/admin/summary`,
  method: 'get'
}

export const adminGetMapsDataEndpoint: Endpoint = {
  url: `${url}/admin/maps`,
  method: 'get'
}

export const adminGetTransactionSummaryEndpoint: Endpoint = {
  url: `${url}/admin/transaction-summary`,
  method: 'get'
}

export const adminGetRegistrationSummaryEndpoint: Endpoint = {
  url: `${url}/admin/registration-summary`,
  method: 'get'
}

export const adminGetTopEventTagsOfAllTimeEndpoint: Endpoint = {
  url: `${url}/admin/top-event-tags`,
  method: 'get'
}

export const adminGetTransactionDataEndpoint: Endpoint = {
  url: `${url}/admin/transactions`,
  method: 'get'
}

export const adminGetUserDataEndpoint: Endpoint = {
  url: `${url}/admin/users`,
  method: 'get'
}

export const signinEndpoint: Endpoint = {
  url: `${url}/auth/signin`,
  method: 'post'
}

export const signupEndpoint: Endpoint = {
  url: `${url}/auth/signup`,
  method: 'post'
}

export const getUserAvatarEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/avatars/${username}`,
    method: 'get'
  }
}

export const postAvatarEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/avatars/${username}`,
    method: 'post'
  }
}

export const getEventImageEndpoint: EndpointFunc<{ eventId: string }> = ({ eventId }): Endpoint => {
  return {
    url: `${url}/event-images/${eventId}`,
    method: 'get'
  }
}

export const postEventImageEndpoint: EndpointFunc<{ eventId: string }> = ({ eventId }): Endpoint => {
  return {
    url: `${url}/event-images/${eventId}`,
    method: 'post'
  }
}

export const getEventSeatsEndpoint: EndpointFunc<{ eventId: string }> = ({ eventId }): Endpoint => {
  return {
    url: `${url}/events/${eventId}/seats`,
    method: 'get'
  }
}

export const getRootPageEventEndpoint: Endpoint = {
  url: `${url}/events/root`,
  method: 'get'
}

export const getAllEventsEndpoint: Endpoint = {
  url: `${url}/events/all`,
  method: 'get'
}

export const getIndividualEventEndpoint: EndpointFunc<{ eventId: string }> = ({ eventId }): Endpoint => {
  return {
    url: `${url}/events/${eventId}`,
    method: 'get'
  }
}

export const postManipulateEventEndpoint: EndpointFunc<{ eventId: string }> = ({ eventId }): Endpoint => {
  return {
    url: `${url}/events/${eventId}/manipulate`,
    method: 'post'
  }
}

export const getEditableEventDataEndpoint: EndpointFunc<{ eventId: string }> = ({ eventId }): Endpoint => {
  return {
    url: `${url}/events/${eventId}/edit`,
    method: 'get'
  }
}

export const patchEditableEventDataEndpoint: EndpointFunc<{ eventId: string }> = ({ eventId }): Endpoint => {
  return {
    url: `${url}/events/${eventId}/edit`,
    method: 'patch'
  }
}

export const unspecifiedEndpoint: Endpoint = {
  url: `${url}/events`,
  method: 'post'
}

export const postFollowEndpoint: Endpoint = {
  url: `${url}/followings/follow`,
  method: 'post'
}

export const getSearchResultEndpoint: Endpoint = {
  url: `${url}/search`,
  method: 'get'
}

export const deleteTransactionEndpoint: EndpointFunc<{ transactionId: string }> = ({ transactionId }): Endpoint => {
  return {
    url: `${url}/transactions/${transactionId}`,
    method: 'delete'
  }
}

export const getTransactionEndpoint: EndpointFunc<{ transactionId: string }> = ({ transactionId }): Endpoint => {
  return {
    url: `${url}/transactions/${transactionId}`,
    method: 'get'
  }
}

export const getTransactionPDFEndpoint: EndpointFunc<{ transactionId: string }> = ({ transactionId }): Endpoint => {
  return {
    url: `${url}/transactions/${transactionId}/pdf`,
    method: 'get'
  }
}

export const postTransactionEndpoint: Endpoint = {
  url: `${url}/transactions`,
  method: 'post'
}

export const postTransferTransactionEndpoint: EndpointFunc<{ transactionId: string }> = ({ transactionId }): Endpoint => {
  return {
    url: `${url}/transactions/${transactionId}/transfer`,
    method: 'post'
  }
}

export const getUserEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}`,
    method: 'get'
  }
}

export const adminRemoveUserEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}`,
    method: 'delete'
  }
}

export const getUserFollowersListEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}/followers`,
    method: 'get'
  }
}

export const getUserFollowingsListEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}/followings`,
    method: 'get'
  }
}

export const getUserRelatedEventsEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}/events`,
    method: 'get'
  }
}

export const adminGrantAdminEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}/admin`,
    method: 'patch'
  }
}

export const adminRevokeAdminEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}/admin`,
    method: 'delete'
  }
}

export const adminGrantVerificationEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}/verification`,
    method: 'patch'
  }
}

export const adminRevokeVerificationEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}/verification`,
    method: 'delete'
  }
}

export const patchUserDescriptionEndpoint: EndpointFunc<{ username: string }> = ({ username }): Endpoint => {
  return {
    url: `${url}/users/${username}/profile`,
    method: 'patch'
  }
}
