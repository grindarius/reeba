import {
  events,
  accessMethod,
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
} from "@reeba/database"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

export function usePostgres(): postgres.Sql {
  const config = useRuntimeConfig()

  return postgres({
    user: config.database.user,
    pass: config.database.password,
    host: config.database.host,
    port: config.database.port,
    database: config.database.database,
    onnotice: () => {}
  })
}

export function useDrizzle() {
  const pg = usePostgres()

  return drizzle(pg, {
    schema: {
      accessMethod,

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
