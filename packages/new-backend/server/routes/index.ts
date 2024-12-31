export default defineEventHandler(event => {
  setResponseStatus(event, 308)
  setResponseHeader(event, 'location', 'http://localhost:3000/api')
})
