import { graphql } from 'react-apollo'
import { Table, TableCell } from 'semantic-ui-react'
import gql from 'graphql-tag'

const PLAYERS_PER_PAGE = 50

function PlayerList({
  data: { loading, error, allPlayers, _allPlayersMeta },
  loadMorePlayers
}) {
  if (error) return <div>Error loading players.</div>
  if (allPlayers && allPlayers.length) {
    const areMorePlayers = allPlayers.length < _allPlayersMeta.count
    return (
      <Table celled inverted selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Rank</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Record</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allPlayers.map((player, index) => (
            <Table.Row key={index + 1}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{player.name}</Table.Cell>
              <Table.Cell>{player.wins}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell>
              {areMorePlayers ? (
                <button onClick={() => loadMorePlayers()}>
                  {' '}
                  {loading ? 'Loading...' : 'Show More'}{' '}
                </button>
              ) : (
                ''
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
  return <div>Loading</div>
}

export const allPlayers = gql`
  query allPlayers($first: Int!, $skip: Int!) {
    allPlayers(first: $first, skip: $skip) {
      id
      firstName
      lastName
    }
    _allPlayersMeta {
      count
    }
  }
`
export const allPlayersQueryVars = {
  skip: 0,
  first: PLAYERS_PER_PAGE
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PlayerList)
export default graphql(allPlayers, {
  options: {
    variables: allPlayersQueryVars
  },
  props: ({ data }) => {
    return {
      data,
      loadMorePlayers: () => {
        return data.fetchMore({
          variables: {
            skip: data.allPlayers.length
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return Object.assign({}, previousResult, {
              // Append the new players results to the old one
              allPlayers: [
                ...previousResult.allPlayers,
                ...fetchMoreResult.allPlayers
              ]
            })
          }
        })
      }
    }
  }
})(PlayerList)
