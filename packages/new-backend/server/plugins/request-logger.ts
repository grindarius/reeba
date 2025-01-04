export default defineNitroPlugin(app => {
  const logger = useLogger()

  app.hooks.hook('request', event => {
    logger.info(`request: ${event.method} ${event.path}`)
  })

  app.hooks.hook('error', error => {
    logger.info(`error: ${error.name}`)
  })

  app.hooks.hook('beforeResponse', event => {
    logger.info(
      `response: ${event.method} ${event.path} ${event.node.res.statusCode}`
    )
  })
})
