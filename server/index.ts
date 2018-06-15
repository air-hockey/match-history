import 'now-env'
import * as next from 'next'
import * as cookieSession from 'cookie-session'
import * as compression from 'compression'

import { server } from './src'

const {
  NODE_ENV,
  PORT,
  SERVER_ENDPOINT,
  GRAPHQL_ENDPOINT,
  SUBSCRIPTIONS_ENDPOINT,
  PLAYGROUND_ENDPOINT,
  COOKIE_SECRET
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
  server.express.use(
    cookieSession({
      name: 'session',
      secret: COOKIE_SECRET,
      sameSite: true,
      maxAge: 24 * 60 * 60 * 1000
    })
  )
  // Update a value in the cookie so that the set-cookie will be sent.
  // Only changes every minute so that it's not sent with every request.
  server.express.use((req: any, res, next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
  })

  server.express.get('*', (req: any, res, next) => {
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
      cors: {
        origin: `${SERVER_ENDPOINT}:${PORT}`,
        credentials: true
      },
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
