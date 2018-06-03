const next = require('next')
const compression = require('compression')

const server = require('./server/src')

const port = parseInt(process.env.PORT, 10) || 3000
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
      port,
      endpoint: '/graphql',
      subscriptions: '/subscriptions',
      playground: dev && '/playground'
    },
    ({ endpoint, subscriptions, playground }) => {
      endpoint &&
        console.log(
          `> GraphQL server is running on http://localhost:${port}${endpoint}`
        )
      subscriptions &&
        console.log(
          `> GraphQL subscriptions is running on http://localhost:${port}${subscriptions}`
        )
      playground &&
        console.log(
          `> GraphQL playground is running on http://localhost:${port}${playground}`
        )
      console.log(`> Ready on http://localhost:${port}`)
    }
  )
})
