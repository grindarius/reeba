[English](README.md) | [Thai](/docs/README-th.md)

# ReebA
Ticket booking, Redefined.

## Project structure.
The project is consists of 3 main directories stayed together as a monorepo.

- `common` for storing types and code used in `functions` and `hosting`
- `functions` for backend server (Fastify)
- `hosting` for frontend server (Vue)

## Prequistics.
First, check the required versions.

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
```
npm install
```
to install dependencies in the project.

Then, open 2 terminals and run these commands from the root of the project.
| Terminal #1             | Terminal #2           |
| ----------------------- | --------------------- |
| `npm run dev:functions` | `npm run dev:hosting` |

You will see the API runs at `http://127.0.0.1:3000` and frontend server runs at `http://localhost:8080`
