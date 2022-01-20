-- create database if not exists reeba;

create type t_user_roles as enum ('user', 'organizer', 'admin');

drop table if exists users cascade;
create table users(
  user_username text not null unique,
  user_email text not null unique,
  user_password text not null,
  user_role t_user_roles not null default 'user',
  user_image_profile_path text not null default '',
  primary key (user_username)
);
