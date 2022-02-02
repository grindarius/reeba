-- create database if not exists reeba;

drop type t_user_role, t_event_price, t_event_status cascade;
drop table if exists users, user_followers, user_roles, events, event_tags, event_tags_bridge, event_datetimes, event_sections, event_seats, transactions, transaction_details cascade;

create type t_user_role as enum ('user', 'admin');
create type t_event_status as enum ('open', 'closed');
create type t_event_price as (
  price_color text,
  price_value integer
);

create table users (
  user_username text not null unique,
  user_email text not null unique,
  user_password text not null,
  user_role t_user_role not null default 'user',
  user_image_profile_path text not null default '',
  user_verification_status boolean not null default false,
  user_telephone_number text not null default '',
  user_birthdate date default null,
  primary key (user_username)
);

create table user_followers (
  follow_id serial not null unique,
  base_username text not null,
  base_username_following text not null,
  primary key (follow_id),
  foreign key (base_username) references users(user_username) on delete cascade
);

create table events (
  event_id text not null unique, -- nanoid(25)
  user_username text not null,
  event_name text not null,
  event_description text not null default '## No description provided',
  event_cover_image_path text not null default '',
  event_website text not null default '',
  event_venue_name text not null default '',
  event_venue_coordinates point not null default '0,0',
  event_opening_date timestamp with time zone not null,
  event_status t_event_status not null default 'closed',
  event_ticket_prices t_event_price[] not null default '{}',
  event_minimum_age integer not null default 0,
  primary key (event_id),
  foreign key (user_username) references users(user_username) on delete cascade
);

create table event_tags (
  event_tag_label text not null unique,
  primary key (event_tag_label)
);

create table event_tags_bridge (
  event_tag_label text not null,
  event_id text not null,
  primary key (event_tag_label, event_id),
  foreign key (event_tag_label) references users(user_username) on update cascade,
  foreign key (event_id) references events(event_id) on update cascade
);

create table event_datetimes (
  event_datetime_id text not null unique,
  event_id text not null,
  event_start_datetime timestamp with time zone,
  event_end_datetime timestamp with time zone,
  primary key (event_datetime_id),
  foreign key (event_id) references events(event_id) on delete cascade
);

create table event_sections (
  event_section_id text not null unique,
  event_datetime_id text not null,
  event_section_row_position integer not null,
  event_section_column_position integer not null,
  primary key (event_section_id),
  foreign key (event_datetime_id) references event_datetimes(event_datetime_id) on delete cascade
);

create table event_seats (
  event_seat_id text not null unique,
  event_section_id text not null,
  event_seat_price integer not null,
  event_seat_row_position integer not null,
  event_seat_column_position integer not null,
  primary key (event_seat_id),
  foreign key (event_section_id) references event_sections(event_section_id) on delete cascade
);

create table transactions (
  transaction_id text not null unique, -- nanoid(32)
  user_username text not null,
  event_id text not null,
  primary key (transaction_id),
  foreign key (user_username) references users(user_username) on delete cascade
);

create table transaction_details (
  event_seat_id text not null unique,
  transaction_id text not null,
  primary key (event_seat_id),
  constraint fk_event_seat_id foreign key (event_seat_id) references event_seats(event_seat_id)
);
