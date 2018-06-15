import matchQueries from './Query/matches'
import playerQueries, { allPlayersCount } from './Query/players'
import auth from './Mutation/auth'
import matchMutations from './Mutation/matches'
import playerMutations from './Mutation/players'

export const resolvers = {
  Query: {
    ...matchQueries,
    ...playerQueries
  },
  Mutation: {
    ...auth,
    ...matchMutations,
    ...playerMutations
  },
  AllPlayersMeta: { count: allPlayersCount }
}
