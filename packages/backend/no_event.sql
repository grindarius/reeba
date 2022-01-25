create table events (
  event_id text not null,
  user_username text not null unique,
  primary key (event_id)
);

create table event_datetimes (
  event_id text not null,
  event_datetime_id serial not null,
  event_start_datetime timestamp with time zone,
  event_end_datetime timestamp with time zone,
  primary key (event_datetime_id),
  foreign key (event_id) references events(event_id) on delete cascade
);

create table event_sections (
  event_section_id serial not null,
  event_datetime_id serial not null,
  section_row_position integer,
  section_column_position integer,
  primary key (event_section_id),
  foreign key (event_datetime_id) references event_datetimes(event_datetime_id) on delete cascade
);

create table event_seats (
  event_seat_id serial not null,
  event_section_id serial not null,
  event_price integer,
  event_seat_row_position integer not null,
  event_seat_column_position integer not null,
  primary key (event_seat_id),
  foreign key (event_section_id) references event_sections(event_section_id) on delete cascade
);
