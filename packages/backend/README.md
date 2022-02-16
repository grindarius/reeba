## API Schemas

### `ALL /`
For getting information about how to contribute.

- Requests
  - No request params

- Responses
  - `200` with payload of 
  ```json
  {
    "author": "Bhattarapong Somwong",
    "description": "Please contact bhattarapongs62@nu.ac.th for contrubition."
  }
  ```
  - `500` for any other errors.

### `POST /auth/signup`
For signing up new user

- Requests
  - Body
    - `username`
    - `email`
    - `password`
    - `phoneCountryCode`
    - `phoneNumber`

- Responses
  - `200` with payload of
  ```json
  {
    "message": "complete"
  }
  ```
  after request success, frontend should redirect to `/signin` page.

  - `400` for
    - missing `username`, `email`, `password`, `phoneCountryCode`, or `phoneNumber`
    - wrong `username`, `email`, or `phoneNumber` format
    - country code supplied not found (likely not to happen since we use [countries-list](https://www.npmjs.com/package/countries-list) to create the country code dropdown)
    - `phoneNumber` contains alphabets

  - `500` for any other database errors

### `POST /auth/signin`
For signing in the user

- Requests
  - Body
    - `email`
    - `password`

- Responses
  - `200` with payload of
  ```json
  {
    "token": "jwt token generated, lasts 6 hours",
    "username": "grindarius",
    "role": "user",
    "verificationStatus": true
  }
  ```

  - `400` for
    - missing `email` or `password`
    - wrong `email` format
    - user does not exists (email not found)
    - invalid password

  - `404` for
    - email not found

  - `500` for `bcrypt` error while comparing salt, or any other db errors.

### `GET /users/:username`
Get data about that specific user

- Requests
  - Params
    - `username`

- Responses
  - `200` with a payload
  <!-- TODO @grindarius: insert payload shape here -->

  - `404` for user not found (wrong username or user does not exists)
  - `500` for any other errors

### `GET /events/:eventId`

### `POST /events`
