-- create database if not exists reeba;

create type t_user_roles as enum ('user', 'organizer', 'admin');
create type t_event_datetime as (
  start_date timestamp with time zone,
  end_date timestamp with time zone
);

-- create type t_event_zone as (
--   event_zone_width integer,
--   event_zone_height integer,
--   event_zone_prices
-- )

-- create type t_event_section as (
--   event_section_width integer,
--   event_section_height integer,
--   event_zones 
-- )

drop table if exists users cascade;
create table users (
  user_username text not null unique,
  user_email text not null unique,
  user_password text not null,
  user_verification_status boolean not null default false,
  user_role t_user_roles not null default 'user',
  user_image_profile_path text not null default '',
  user_telephone_number text not null default '',
  user_birthdate date default null,
  primary key (user_username)
);

create table event_datetimes (
  event_datetime_id serial not null,
  event_id text not null,
  event_start_datetime timestamp with time zone,
  event_end_datetime timestamp with time zone,
  primary key (event_datetime_id),
  foreign key (event_id) references events(event_id) on delete cascade
);

drop table if exists events cascade;
create table events (
  user_username text not null,
  event_id text not null unique,
  event_name text not null,
  event_website text not null default '',
  event_description text not null default '',
  -- event_datetimes t_event_datetime[] not null default '{}',
  event_venue_name text not null default '',
  event_venue_coordinates point not null default '0,0',
  event_opening_date timestamp with time zone not null,
  event_ticket_prices integer[] not null default '{}',
  primary key (event_id),
  foreign key (user_username) references users(user_username) on delete cascade
);

create table event_seats (
  seat_id text not null,
  section_id text not null,
  seat_row integer not null,
  seat_column integer not null,
  seat_occupation_status boolean not null default false,
  seat_price integer not null,
  primary key (seat_id),
  foreign key (zone_id) references event_sections(event_section_id) on delete cascade
)

create table event_sections (
  event_section_id text not null,
  event_id text not null,
  event_section_width integer not null,
  event_section_height integer not null,
  primary key (event_section_id),
  foreign key (event_id) references events(event_id) on delete cascade
);

-- -- this table needs HEAVY normalization before put in
-- drop table if exists tags cascade;
-- create table tags (
--   tag_label text not null unique,
--   primary key (tag_label)
-- );

-- drop table if exists event_tags cascade;
-- create table event_tags (
--   event_id text not null,
--   tag_label text not null,
--   primary key (event_id, tag_label),
--   foreign key (event_id) references events(event_id) on update cascade,
--   foreign key (tag_label) references tags(tag_label) on update cascade
-- );

drop table if exists ticket_transactions;
create event ticket_transactions (
  transaction_id text not null unique,
  event_id text not null,
  user_useranme text not null,
  
);
