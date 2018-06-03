const { MockList } = require('graphql-yoga')
const casual = require('casual')
const cuid = require('cuid')

const mocks = {
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

module.exports = mocks
