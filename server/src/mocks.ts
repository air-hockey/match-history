import { MockList } from 'graphql-yoga'
import * as casual from 'casual'
import * as cuid from 'cuid'

export const mocks = {
  ID: () => cuid(),
  DateTime: () => casual.moment,
  Player: () => ({
    name: casual.full_name,
    record: {
      wins: casual.integer(10,100),
      losses: casual.integer(0,80),
    },
  }),
  AllPlayersMeta: () => ({
    count: casual.integer(10, 50)
  }),
  Query: () => ({
    allPlayers: (root, { first, skip }) => new MockList(first || [10, 50]),
    matches: () => new MockList([10, 50])
  })
}
