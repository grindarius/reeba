-- create database if not exists reeba;

drop type if exists t_user_role;
create type t_user_role as enum ('user', 'organizer', 'admin');

drop table if exists users;
create table if not exists users(
  user_id text not null,
  user_name text not null unique,
  user_email text not null unique,
  user_password text not null,
  user_role t_user_role not null default 'user',
  user_profile_path text not null default '',
  primary key (user_id)
);
