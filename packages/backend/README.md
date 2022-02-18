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
    Schema looks like this
    ```ts
    interface SignupBody {
      username: string
      email: string
      password: string
      phoneCountryCode: string
      phoneNumber: string
    }
    ```

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
    Schema looks like this
    ```ts
    interface SigninBody {
      email: string
      password: string
    }
    ```

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

  - `404` for email not found

  - `500` for `bcrypt` error while comparing salt, or any other db errors.

### `GET /avatars/:username`
For getting a profile picture of a specific user

- Requests
  - Params
    - `username`

- Responses
  - `200` with a user's profile, either default profile or the user's own profile.

  - `500` for any other errors

### `POST /avatars/:username`
For sending a profile picture to specific user, validates filename using these RegExp
```ts
/^.*\.(jpg|JPG|png|PNG|jpeg|JPEG)$/
```

- Requests
  - Params
    - `username`

  - Body
    - FormData with key of `image` with an image file.

- Responses
  - `200` with payload of
    ```json
    {
      "message": "complete"
    }
    ```

  - `400` for missing username, or invalid file extension.

  - `404` for user not found.

  - `500` for any other errors

### `POST /events`
For sending new event to the system

- Requests
  - Body
    Schema looks like this
    ```ts
    interface PostEventBody {
      eventName: string,
      createdBy: string,
      description: string,
      website: string,
      venueName: string,
      venueCoordinates: {
        x: string,
        y: string
      },
      openingDate: string,
      tags: Array<string>,
      ticketPrices: Array<{
        color: string,
        price: number
      }>,
      datetimes: Array<{
        start: string,
        end: string
      }>,
      minimumAge: number,
      sections: Array<Array<{
        sectionRowPosition: number
        sectionColumnPosition: number
        seats: Array<Array<{
          seatRowPosition: number
          seatColumnPosition: number
          seatPrice: number
        }>>
      }>>
    }
    ```

- Responses
  - `200` with a payload of
    ```json
    {
      "message": "complete"
    }
    ```

  - `400` for any other type mismatch errors and missing values (unlikely to happen if our frontend did a good job)

  - `500` for any other errors

### `GET /events/:eventId`
Getting individual event for each event page

- Requests
  - Params
    - `eventId`

- Responses
  - `200` with a payload of
  ```json
  {
    "name": "bts live in korea",
    "createdBy": "grindarius",
    "description": "event description",
    "website": "venue website",
    "venueName": "venue name",
    "venueCoordinates": { 
      "x": "122.038480232343043",
      "y": "14.02938443089723293"
    },
    "openingDate": "2021-01-01T22:33:22.893Z",
    "prices": [
      {
        "color": "#221343",
        "value": 2000
      }
    ],
    "tags": ["stand-up-comedy", "funny"],
    "datetimes": [
      {
        "start": "2021-01-01T22:33:22.893Z",
        "end": "2021-01-01T22:33:22.893Z"
      }
    ]
  }
  ```

  - `404` for event not found.

  - `500` for any other errors

### `GET /events/root`
Get events for root page, get any events that is in between 1 month of query

- Requests
  - No request schema

- Responses
  - `200` with payload of
  ```json
  {
    "official": [
      {
        "id": "fknldkfngsdjf393",
        "name": "Bangtan fanmeet",
        "firstDatetime": "2021-01-01T22:33:22.893Z",
        "venueName": "Rajamangkala stadium"
      }
    ],
    "local": [
      {
        "id": "fknldkfsdfdfds3f393",
        "name": "Kamin and the gang",
        "firstDatetime": "2021-01-01T22:33:22.893Z",
        "venueName": "Kamin's house"
      }
    ]
  }
  ```

  - `500` for any other errors

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
