import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const PLAYERS_PER_PAGE = 10

function PlayerList({
  data: { loading, error, allPlayers, _allPlayersMeta },
  loadMorePlayers
}) {
  if (error) return <div>Error loading players.</div>
  if (allPlayers && allPlayers.length) {
    const areMorePlayers = allPlayers.length < _allPlayersMeta.count
    return (
      <section>
        <ul>
          {allPlayers.map((player, index) => (
            <li key={player.id}>
              <div>
                <span>{index + 1}. </span>
                <div id={player.id}>
                  {player.firstName} {player.lastName}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {areMorePlayers ? (
          <button onClick={() => loadMorePlayers()}>
            {' '}
            {loading ? 'Loading...' : 'Show More'}{' '}
          </button>
        ) : (
          ''
        )}
        <style jsx>{`
          section {
            padding-bottom: 20px;
          }
          li {
            display: block;
            margin-bottom: 10px;
          }
          div {
            align-items: center;
            display: flex;
          }
          a {
            font-size: 14px;
            margin-right: 10px;
            text-decoration: none;
            padding-bottom: 0;
            border: 0;
          }
          span {
            font-size: 14px;
            margin-right: 5px;
          }
          ul {
            margin: 0;
            padding: 0;
          }
          button:before {
            align-self: center;
            border-style: solid;
            border-width: 6px 4px 0 4px;
            border-color: #ffffff transparent transparent transparent;
            content: '';
            height: 0;
            margin-right: 5px;
            width: 0;
          }
        `}</style>
      </section>
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
