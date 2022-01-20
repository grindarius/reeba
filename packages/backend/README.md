## API Schemas

- GET /
  For getting information about how to contribute.

- POST /auth/signup
  For signing up new user, returns 404, 500 or 200 saying `complete`.

- POST /auth/signin
  For signing in the user, returns 404, 500 or 200 with JWT token that valids for 6 hours.

- GET /users/:userId
  Get data about that users, return 401 unauthorized, 404 for wrong userId, 500 for db error and 200 with user credentials.

- GET /events/:eventId
  Get data about the event

- POST /events
  Register new event
