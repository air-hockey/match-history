import { MockList } from 'graphql-yoga'
import * as casual from 'casual'
import * as cuid from 'cuid'

export const mocks = {
  ID: () => cuid(),
  DateTime: () => casual.moment,
  Player: () => ({
    firstName: casual.first_name,
    lastName: casual.last_name,
    email: casual.email,
    facebookId: casual.array_of_digits(17).join(''),
    matches: () => new MockList([10, 100]),
    wins: casual.integer(10, 100),
    losses: casual.integer(0, 80)
  }),
  AllPlayersMeta: () => ({ count: casual.integer(10, 50) }),
  Query: () => ({
    allPlayers: (root, { first, skip }) => new MockList(first || [10, 50]),
    matches: () => new MockList([10, 50])
  })
}
