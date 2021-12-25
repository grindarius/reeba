[English](README.md) | [Thai](/docs/README-th.md)

<p align="center">
  <img src="https://user-images.githubusercontent.com/60266519/147319453-ac26e0ca-eca1-43a9-9aea-79426e3fbf6a.png" alt="ReebA Logo">
</p>
<h2 align="center">
  Ticket booking. Redefined.
</h2>

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

You can download Node.js [here](https://nodejs.org/en/) (download the LTS version).

When Node.js is installed, upgrade `npm` by running
```
npm i -g npm@latest
```

## Running the application.
### Before anything.
Run this command from the root of the project
```
npm install
```
to install dependencies in the project. (you *should* do this everytime you pull or change branch)

### ReebA.com.
Run this command from the root of the project
```
npm run build:common && npm run dev:frontend
```
and you should see the website pop up at `http://localhost:8080`.

### ReebA API.
If you need to develop backend API. You need more than 1 terminal. Run these commands from the root of the project.
| Terminal #1             | Terminal #2            |
| ----------------------- | ---------------------- |
| `npm run dev:common`    | `npm run dev:backend`  |
You will see the API runs at `http://localhost:3000`.

### Full system development.
Open 3 terminals and run these commands from the root of the project.
| Terminal #1             | Terminal #2            | Terminal #3           |
| ----------------------- | ---------------------- | --------------------- |
| `npm run dev:common`    | `npm run dev:frontend` | `npm run dev:backend` |

You will see the API runs at `http://localhost:3000` and frontend server runs at `http://localhost:8080`
