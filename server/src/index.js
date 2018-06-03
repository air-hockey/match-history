const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { AllPlayersMeta } = require('./types/all-players-meta')

const resolvers = {
  Query: {
    matches: (_, { winner }, context, info) =>
      context.db.query.matches(
        {
          where: {
            winner: {
              name: winner
            }
          }
        },
        info
      ),
    player: (_, { id }, context, info) =>
      context.db.query.player(
        {
          where: { id }
        },
        info
      ),
    allPlayers: (_, { first, skip }, context, info) =>
      context.db.query.players(
        {
          first,
          skip
        },
        info
      ),
    _allPlayersMeta: () => ({})
  },
  AllPlayersMeta,
  Mutation: {
    createMatch: (_, { winnerId, loserId }, context, info) =>
      context.db.mutation.createMatch(
        {
          data: {
            date: new Date(),
            winner: {
              connect: {
                id: winnerId
              }
            },
            loser: {
              connect: {
                id: loserId
              }
            }
          }
        },
        info
      ),
    deleteMatch: (_, { id }, context, info) =>
      context.db.mutation.deleteMatch(
        {
          where: { id }
        },
        info
      ),
    createPlayer: (_, { name }, context, info) =>
      context.db.mutation.createPlayer(
        {
          data: { name }
        },
        info
      )
  }
}

const server = new GraphQLServer({
  typeDefs: 'server/src/schema.graphql',
  mocks: process.env.MOCKS && require('./mocks'),
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'server/src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466'
    })
  })
})

module.exports = server
