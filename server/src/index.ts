import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from 'prisma-binding'

import { resolvers } from './resolvers'
import { mocks } from './mocks'

export function createGraphQLServer(options = {}) {
  const server = new GraphQLServer({
    typeDefs: 'server/src/schema.graphql',
    mocks: process.env.MOCKS && mocks,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({
      ...req,
      db: new Prisma({
        typeDefs: 'server/src/generated/prisma.graphql',
        endpoint: process.env.PRISMA_ENDPOINT,
        secret: process.env.PRISMA_SECRET,
        debug: process.env.NODE_ENV === 'development'
      })
    })
  })

  server.createHttpServer(options)

  return server.express
}
