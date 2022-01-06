-- create database if not exists reeba;

drop type if exists t_user_role;
create type t_user_role as enum ('user', 'organizer', 'admin');

drop database if exists users;
create table if not exists users(
  user_id text not null,
  user_name text not null UNIQUE,
  user_email text not null UNIQUE,
  user_password text not null,
  user_role t_user_role not null default 'user',
  user_profile_path text not null default './uploads/default-user-profile.png',
  primary key (user_id)
);
