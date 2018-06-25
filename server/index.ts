import 'now-env'
import * as express from 'express'
import * as next from 'next'
import * as cookieSession from 'cookie-session'
import * as compression from 'compression'

import { createGraphQLServer } from './src'

const {
  NODE_ENV,
  PORT,
  SERVER_ENDPOINT,
  API_ROUTE,
  GRAPHQL_ENDPOINT,
  SUBSCRIPTIONS_ENDPOINT,
  PLAYGROUND_ENDPOINT,
  COOKIE_SECRET
} = process.env

const app = express()

app.use(compression())
app.use(
  cookieSession({
    name: 'session',
    secret: COOKIE_SECRET,
    sameSite: true,
    maxAge: 24 * 60 * 60e3
  })
)
// Update a value in the cookie so that the set-cookie will be sent.
// Only changes every minute so that it's not sent with every request.
app.use((req: any, res, next) => {
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
  next()
})

app.use(
  API_ROUTE,
  createGraphQLServer({
    port: parseInt(PORT, 10) || 3000,
    cors: {
      origin: `${SERVER_ENDPOINT}:${PORT}`,
      credentials: true
    },
    endpoint: GRAPHQL_ENDPOINT,
    subscriptions: SUBSCRIPTIONS_ENDPOINT,
    playground: PLAYGROUND_ENDPOINT
  })
)

const nextApp = next({ dev: NODE_ENV !== 'production' })
const nextHandler = nextApp.getRequestHandler() // the Next.js handler

app.use('/', nextHandler)

nextApp.prepare().then(() => {
  console.log(`> Ready on ${SERVER_ENDPOINT}:${PORT}`)
})

app.listen(PORT, () => {
  SERVER_ENDPOINT &&
    console.log(
      `> GraphQL server is running on ${SERVER_ENDPOINT}:${PORT}${API_ROUTE}${GRAPHQL_ENDPOINT}`
    )
  SUBSCRIPTIONS_ENDPOINT &&
    console.log(
      `> GraphQL subscriptions is running on ${SERVER_ENDPOINT}:${PORT}${API_ROUTE}${SUBSCRIPTIONS_ENDPOINT}`
    )
  PLAYGROUND_ENDPOINT &&
    console.log(
      `> GraphQL playground is running on ${SERVER_ENDPOINT}:${PORT}${API_ROUTE}${PLAYGROUND_ENDPOINT}`
    )
})
