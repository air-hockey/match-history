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

const dev = NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  server.express.use(compression())

  server.express.get('*', (req, res, next) => {
    if (
      req.path.match(
        new RegExp(
          `^(${[PLAYGROUND_ENDPOINT, GRAPHQL_ENDPOINT, SUBSCRIPTIONS_ENDPOINT]
            .filter(endpoint => endpoint)
            .join('|')})((?!.)|\/).*`
        )
      )
    ) {
      next()
    } else {
      return handle(req, res)
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
