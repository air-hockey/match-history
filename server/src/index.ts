import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from 'prisma-binding'

import { resolvers } from './resolvers'
import { mocks } from './mocks'

const { MOCKS, PRISMA_ENDPOINT, PRISMA_SECRET, NODE_ENV } = process.env

export function createGraphQLServer(options = {}) {
  const server = new GraphQLServer({
    typeDefs: MOCKS
      ? 'server/src/mocks/schema.mock.graphql'
      : 'server/src/schema.graphql',
    mocks: MOCKS && mocks,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({
      ...req,
      db: new Prisma({
        typeDefs: 'server/src/generated/prisma.graphql',
        endpoint: PRISMA_ENDPOINT,
        secret: PRISMA_SECRET,
        debug: NODE_ENV !== 'production'
      })
    })
  })

  server.createHttpServer(options)

  return server.express
}
