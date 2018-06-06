import * as next from 'next'
import * as compression from 'compression'

import { server } from './src'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  server.express.use(compression())

  server.express.get('*', (req, res, next) => {
    if (req.path.match(/^\/(playground|graphql|subscriptions)((?!.)|\/).*/)) {
      next()
    } else {
      return handle(req, res)
    }
  })

  server.start(
    {
      port: parseInt(process.env.PORT, 10) || 3000,
      endpoint: process.env.GRAPHQL_ENDPOINT,
      subscriptions: process.env.SUBSCRIPTIONS_ENDPOINT,
      playground: process.env.PLAYGROUND_ENDPOINT
    },
    ({ endpoint, subscriptions, playground, port }) => {
      endpoint &&
        console.log(
          `> GraphQL server is running on ${
            process.env.SERVER_ENDPOINT
          }:${port}${endpoint}`
        )
      subscriptions &&
        console.log(
          `> GraphQL subscriptions is running on ${
            process.env.SERVER_ENDPOINT
          }:${port}${subscriptions}`
        )
      playground &&
        console.log(
          `> GraphQL playground is running on ${
            process.env.SERVER_ENDPOINT
          }:${port}${playground}`
        )
      console.log(`> Ready on ${process.env.SERVER_ENDPOINT}:${port}`)
    }
  )
})
