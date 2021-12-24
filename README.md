[English](README.md) | [Thai](/docs/README-th.md)

<p align="center">
  <img src="https://user-images.githubusercontent.com/60266519/147319453-ac26e0ca-eca1-43a9-9aea-79426e3fbf6a.png" alt="ReebA Logo">
</p>
<h2 align="center">
  Ticket booking. Redefined.
</h2>

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
| Terminal #1             | Terminal #2            |
| ----------------------- | ---------------------- |
| `npm run dev:backend`   | `npm run dev:frontend` |

You will see the API runs at `http://127.0.0.1:3000` and frontend server runs at `http://localhost:8080`
