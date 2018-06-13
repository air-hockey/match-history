import 'now-env'
import * as next from 'next'
import * as compression from 'compression'

import { server } from './src'

const {
  NODE_ENV,
  PORT,
  SERVER_ENDPOINT,
  GRAPHQL_ENDPOINT,
  SUBSCRIPTIONS_ENDPOINT,
  PLAYGROUND_ENDPOINT
} = process.env

// These routes will not be handled by Next.js
const staticRoutes = [
  PLAYGROUND_ENDPOINT,
  GRAPHQL_ENDPOINT,
  SUBSCRIPTIONS_ENDPOINT
]

const app = next({ dev: NODE_ENV !== 'production' })
const handle = app.getRequestHandler() // the Next.js handler

app.prepare().then(() => {
  server.express.use(compression())

  server.express.get('*', (req, res, next) => {
    if (
      req.path.match(
        new RegExp(
          `^(${staticRoutes
            .filter(route => route) // remove undefined routes
            .join('|')})((?!.)|\/).*` // match all subroutes
        )
      )
    ) {
      next() // Do not render Next.js if static route
    } else {
      return handle(req, res) // Render Next.js
    }
  })

  server.start(
    {
      port: parseInt(PORT, 10) || 3000,
      endpoint: GRAPHQL_ENDPOINT,
      subscriptions: SUBSCRIPTIONS_ENDPOINT,
      playground: PLAYGROUND_ENDPOINT
    },
    ({ endpoint, subscriptions, playground, port }) => {
      endpoint &&
        console.log(
          `> GraphQL server is running on ${SERVER_ENDPOINT}:${port}${endpoint}`
        )
      subscriptions &&
        console.log(
          `> GraphQL subscriptions is running on ${SERVER_ENDPOINT}:${port}${subscriptions}`
        )
      playground &&
        console.log(
          `> GraphQL playground is running on ${SERVER_ENDPOINT}:${port}${playground}`
        )
      console.log(`> Ready on ${SERVER_ENDPOINT}:${port}`)
    }
  )
})
