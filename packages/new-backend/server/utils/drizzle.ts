import {
  events,
  accessMethod,
  accountRefreshTokens,
  accountRefreshTokensRelations,
  accountRoles,
  accountSocialMedias,
  accountSocialMediasRelations,
  accounts,
  accountsRelations,
  entities,
  entitiesRelations,
  eventSchedules,
  eventSchedulesRelations,
  eventSeatedZoneConfigurations,
  eventSeatedZoneConfigurationsRelations,
  eventSeatedZones,
  eventSeatedZonesRelations,
  eventSeats,
  eventSeatsRelations,
  eventStandingZones,
  eventStandingZonesRelations,
  eventTicketPrices,
  eventTicketPricesRelations,
  eventZoneNames,
  eventZoneNamesRelations,
  eventZoneType,
  eventZones,
  eventZonesRelations,
  eventsRelations,
  follows,
  followsRelations,
  orientation,
  permissions,
  permissionsRelations,
  rolePermissions,
  rolePermissionsRelations,
  roles,
  rolesRelations,
  seatAvailability,
  socialMedias,
  socialMediasRelations,
  ticketPurchases,
  ticketPurchasesRelations,
  transactionStatus,
  transactionType,
  transactions,
  transactionsRelations
} from '@reeba/database'
import { drizzle } from 'drizzle-orm/postgres-js'

export function useDrizzle() {
  const pg = usePostgres()

  return drizzle(pg, {
    schema: {
      accessMethod,

      accountRefreshTokens,
      accountRefreshTokensRelations,

      accountRoles,

      accountSocialMedias,
      accountSocialMediasRelations,

      accounts,
      accountsRelations,

      entities,
      entitiesRelations,

      eventSchedules,
      eventSchedulesRelations,

      eventSeatedZoneConfigurations,
      eventSeatedZoneConfigurationsRelations,

      eventSeatedZones,
      eventSeatedZonesRelations,

      eventSeats,
      eventSeatsRelations,

      eventStandingZones,
      eventStandingZonesRelations,

      eventTicketPrices,
      eventTicketPricesRelations,

      eventZoneNames,
      eventZoneNamesRelations,

      eventZoneType,

      eventZones,
      eventZonesRelations,

      events,
      eventsRelations,

      follows,
      followsRelations,

      orientation,

      permissions,
      permissionsRelations,

      rolePermissions,
      rolePermissionsRelations,

      roles,
      rolesRelations,

      seatAvailability,

      socialMedias,
      socialMediasRelations,

      ticketPurchases,
      ticketPurchasesRelations,

      transactionStatus,

      transactionType,

      transactions,
      transactionsRelations
    }
  })
}
