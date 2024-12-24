import { pgEnum } from "drizzle-orm/pg-core";

export const EVENT_ZONE_TYPE = ['seated', 'standing'] as const
export const eventZoneType = pgEnum('event_zone_type', EVENT_ZONE_TYPE)
