-- create database if not exists reeba;

create type t_user_roles as enum ('user', 'organizer', 'admin');
create type t_event_date as (
  start_date timestamp with time zone,
  end_date timestamp with time zone
);

drop table if exists users cascade;
create table users (
  user_username text not null unique,
  user_email text not null unique,
  user_password text not null,
  user_role t_user_roles not null default 'user',
  user_image_profile_path text not null default '',
  user_telephone_number text not null default '',
  user_birthdate date default null,
  primary key (user_username)
);

drop table if exists events cascade;
create table events (
  event_id text not null unique,
  event_name text not null,
  event_description text not null default '',
  event_dates t_event_date[] not null default '{}',
  primary key (event_id)
);

drop table if exists event_tags cascade;
create table event_tags (
  event_id text not null,
  tag_label text not null,
  primary key (event_id, tag_label),
  foreign key (event_id) references events(event_id) on update cascade,
  foreign key (tag_label) references tags(tag_label) on update cascade
);

-- this table needs HEAVY normalization before put in
drop table if exists tags cascade;
create table tags (
  tag_label text not null unique,
  primary key (tag_label)
);
