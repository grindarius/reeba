[English](README.md) | [Thai](/docs/README-th.md)

<p align="center">
  <img src="https://user-images.githubusercontent.com/60266519/147319453-ac26e0ca-eca1-43a9-9aea-79426e3fbf6a.png" alt="ReebA Logo">
</p>
<h3 align="center">
  Ticket booking. Redefined.
</h3>

## What is ReebA.
ReebA (pronounce Reeb-Ah) is a web-based and comminunity-based application for organizing concerts or any events. You can hop in and find tickets from big shows pretty easily with our sites. Along with shows locally from people around you. We also secure your transaction and you can also easily sell or transfer owner of tickets to other users pretty easily *without having to print out the ticket at all*.

Our project consists of
- ReebA.com: Frontend application.
- ReebA API: Backend application API with PostgreSQL.

## Technology stack.
### ReebA.com
- [Vuejs](https://v3.vuejs.org/) for creating frontend application.
- [Tailwindcss](https://tailwindcss.com/) for styling our application.
- [d3.js](https://d3js.org) for creating beautiful graph admin side.
- [Vite](https://vitejs.dev/) for building our frontend Vuejs application.

### ReebA API.
- [Fastify](https://www.fastify.io/) for serving our api.
- [PostgreSQL](https://www.postgresql.org/) for our database.

## Prequistics.
### Check the required versions.

- Node.js v14 or higher.
  You can check by typing
  ```
  node -v
  ```
  into the terminal.
- `npm` v7 or higher.
  You can check by typing
  ```
  npm -v
  ```
  into the terminal.
- `pnpm` v6.26.0 or higher.
  You can check by typing
  ```
  pnpm -v
  ```
  into the terminal.
- PostgreSQL v14.1 *exact*.
  You can check by typing
  ```
  psql -V postgres
  ```
  into the terminal.

You can download Node.js [here](https://nodejs.org/en/) (download the LTS version).
You can download PostgreSQL [here](https://www.postgresql.org/download/windows/).

When Node.js is installed, upgrade `npm` by running
```
npm i -g npm@latest
```

and then install `pnpm` by running
```
npm i -g pnpm
```
ใน Terminal

## Running the application.
### Before anything.
Run this command from the root of the project
```
pnpm install
```
to install dependencies in the project.

In case of when you switch branch to other people's project. I suggest running
```
pnpm install --frozen-lockfile
```
because `pnpm install --frozen-lockfile` will install dependencies *without* editing `pnpm-lock.yaml`. If there's an error installing dependencies with `pnpm install --frozen-lockfile`, then use the fallback `pnpm install`

### Database setup (ReebA API).
**Reminder: this topic needs to be done only once.**

At ReebA, we use [PostgreSQL](https://www.postgresql.org/) to store user data and credentials, this section will teach you how to set up the database locally. But first of all

- You should have PostgreSQl installed in your machine.
- You should know your master password of `postgres` superuser. (They will ask for it during the installation).
- You should be able to use `psql` command.

If top 3 requirements surpassed. You're ready to develop ReebA's database. These are steps to get the database running.

**WARNING: You should follow the instructions exactly or you'll end up with a broken database that's super hard to work with and fix.**

- Start your favourite terminal (Preferrably [Git Bash](https://git-scm.com/downloads) or `Command Prompt` in [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab), I don't recommend PowerShell) inside `backend` folder.

- Run
  ```
  psql -U postgres
  ```
  and put in your `postgres` superuser password.
  
  You should see a terminal like this
  ```
  psql (14.1)
  Type "help" for help.

  postgres=#
  ```
  This means you've successfully logged in.

- Run
  ```
  postres=# CREATE DATABASE "reeba";
  ```

  You should see
  ```
  CREATE DATABASE
  ```
  This means you've successfully created a database.

- Run
  ```
  postgres=# \c postgres://postgres@localhost:5432/reeba
  ```
  put in your `postgres` superuser password, You should see a message saying

  ```
  You are now connected to database "reeba" as user "postgres".
  ```
  This means you've successfully connected to the database.

  You can see tables and relations by typing
  ```
  reeba=# \dt
  ```

- Migrate the database with schema by running
  ```
  reeba=# \i database.sql
  ```
  I don't know how would it look like for new users, but if the command success there should be a bunch of `CREATE TABLE` pops out.

- Create a file called `.env.local` inside `backend` folder.

  **NOTE, SERIOUS NOTE: THIS FILE CONTAINS CREDENTIALS THAT ARE NOT SAFE TO BE PUSHED TO THE REPOSITORY LIKE YOUR POSTGRES SUPERUSER PASSWORD, AND IMPORTANTLY, JWT SECRET. IF THIS SECRET EVER GETS LEAKED. OUR USERS INSIDE THE DATABASE WILL GET HACKED IN NO TIME. SO PLEASE BE CAREFUL WITH SETTING UP THIS PART.**

  **MAKE SURE THE FILE IS GREYED OUT IN THE VISUAL STUDIO CODE FILE EDITOR. AND MAKE SURE (I MEAN VERY VERY SURE) THAT YOU DON'T PUSH THIS FILE UP TO THE REMOTE.**

  **DO NOT PUT ANY CONFIDENTIALS IN `.env` FILE BECAUSE THIS FILE GETS PUSHED TO THE REMOTE**

  When the file is created, copy stuffs in `.env` file into `.env.local` file.

  The `.env.local` file should look like this
  ```
  FASTIFY_PORT='3000'
  JWT_SECRET=
  POSTGRES_USERNAME=
  POSTGRES_PASSWORD=
  POSTGRES_HOSTNAME='localhost'
  POSTGRES_PORT='5432'
  POSTGRES_DBNAME='reeba'
  ```

  Fill in the missing variables behind the equal sign into `.env.local` file.
  - `JWT_SECRET`: Please email me to get the secret.
  - `POSTGRES_USERNAME`: If you log into the database with command `psql -U postgres`, the username would be `'postgres'`.
  - `POSTGRES_PASSWORD`: The password for `postgres` superuser.

  All fields should be wrapped in single quotes. With all these you should be ready to develop the API.

### ReebA.com.
Run this command from the root of the project
```
pnpm build:common && pnpm dev:frontend
```
and you should see the website pop up at `http://localhost:8080`.

### ReebA API.
First of all, you have to start PostgreSQL database server.

- Open up separate terminal inside `backend` folder. Run
  ```
  psql -U postgres
  ```
  and put in your `postgres` password.
- Run
  ```
  postgres=# \c postgres://postgres@localhost:5432/reeba
  ```
  and put in your `postgres` password.

  You will see
  ```
  You are now connected to database "reeba" as user "postgres".
  ```

  Migrate the database with
  ```
  reeba=# \i database.sql
  ```
  You're ready to develop.

Run these commands from the root of the project.
| Terminal #1              | Terminal #2             |
| -----------------------  | ----------------------  |
| `pnpm dev:common`        | `pnpm dev:backend`      |

You will see the API runs at `http://localhost:3000`.

### Full system development.
First of all, you have to start PostgreSQL database server.

- Open up separate terminal inside `backend` folder. Run
  ```
  psql -U postgres
  ```
  and put in your `postgres` password.
- Run
  ```
  postgres=# \c postgres://postgres@localhost:5432/reeba
  ```
  and put in your `postgres` password.

  You will see
  ```
  You are now connected to database "reeba" as user "postgres".
  ```

  Migrate the database with
  ```
  reeba=# \i database.sql
  ```
  You're ready to develop.

Open 3 terminals and run these commands from the root of the project.
| Terminal #1              | Terminal #2             | Terminal #3            |
| -----------------------  | ----------------------  | ---------------------  |
| `pnpm dev:common`        | `pnpm dev:frontend`     | `pnpm dev:backend`     |

You will see the API runs at `http://localhost:3000` and frontend server runs at `http://localhost:8080`

## Testing
Our `common` and `backend` module will be tested using [`tap`](https://github.com/tapjs/node-tap). This is how to run the test.

- Build `common` module by running
  ```
  pnpm build:common
  ```
  from the root of the project.

- Then run
  ```
  pnpm test
  ```
  to see results.

**All tests should pass before submitting PRs**

## Database seeding
In ReebA, there's a command called `seed` and `inject` that you can run to seed your database.

- `pnpm seed` will generate data based on seed (112233) so all the data will be the same.
- `pnpm inject` will inject the data into the database (please do note that this feature is incomplete and subject to change in the future).

Please bear in mind that `pnpm inject` will only work if backend server is running. You have to run `pnpm dev:backend` from one terminal and use the other terminal to run `pnpm inject`. This hassle is being noted and the change is coming in the future.
