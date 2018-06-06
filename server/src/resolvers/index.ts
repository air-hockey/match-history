import matchQueries from './Query/matches'
import playerQueries, { allPlayersCount } from './Query/players'
import matchMutations from './Mutation/matches'
import playerMutations from './Mutation/players'

export const resolvers = {
  Query: {
    ...matchQueries,
    ...playerQueries
  },
  Mutation: {
    ...matchMutations,
    ...playerMutations
  },
  AllPlayersMeta: { count: allPlayersCount }
}
