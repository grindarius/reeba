create type t_event_price (
  price integer,
  color text
)

create table events (
  event_id text not null,
  user_username text not null unique,
  event_prices t_event_price[] not null default '{}',
  primary key (event_id)
);

create table event_datetimes (
  event_datetime_id text not null,
  event_id text not null,
  event_start_datetime timestamp with time zone,
  event_end_datetime timestamp with time zone,
  primary key (event_datetime_id),
  foreign key (event_id) references events(event_id) on delete cascade
);

create table event_sections (
  section_id text not null,
  event_id text not null,
  section_row_position integer not null,
  section_column_position integer not null,
  datetime_id text not null,
  primary key (section_id),
  foreign key (event_id) references events(event_id) on delete cascade,
  foreign key (datetime_id) references event_datetimes(event_datetime_id) on delete cascade
);

create table event_seats (
  seat_id text not null,
  section_id text not null,
  datetime_id text not null,
  seat_row_position integer not null,
  seat_column_position integer not null,
  primary key (seat_id),
  foreign key (section_id) references event_sections(section_id) on delete cascade,
  foreign key (datetime_id) references event_datetimes(event_datetime_id) on delete cascade,
  foreign key (price_id) references event_pricings(pricing_id) on delete cascade
);
