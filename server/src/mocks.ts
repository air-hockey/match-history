import { MockList } from 'graphql-yoga'
import * as casual from 'casual'
import * as cuid from 'cuid'

export const mocks = {
  ID: () => cuid(),
  DateTime: () => casual.moment,
  Player: () => ({
    name: casual.full_name
  }),
  AllPlayersMeta: () => ({
    count: casual.integer(10, 50)
  }),
  Query: () => ({
    allPlayers: (root, { first, skip }) => new MockList(first || [10, 50]),
    matches: () => new MockList([10, 50])
  })
}
