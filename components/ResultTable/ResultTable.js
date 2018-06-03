export default ({ players, set, matchWinner }) => {
  return (
    <table>
      <thead>
        <tr>
          {Array.apply(null, Array(set.bestOf + 1)).map((item, i) => (
            <th>{i === 0 ? '' : i}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {players
          .sort(p => !(p.id === matchWinner))
          .map((p, i) => (
            <PlayerRow player={p} games={set.games} setWinner={set.winner} />
          ))}
      </tbody>
    </table>
  )
}

const PlayerRow = ({ player, games, setWinner }) => {
  let rowData = []
  rowData.push(
    <td style={{ backgroundColor: setWinner === player.id ? 'aqua' : '' }}>{`${
      player.name
    }-${player.rank}`}</td>
  )
  games.forEach(game => {
    const wonGame = game.winner === player.id
    rowData.push(
      <td style={{ backgroundColor: wonGame ? 'aqua' : '' }}>
        {wonGame ? game.for : game.against}
      </td>
    )
  })
  return <tr>{rowData}</tr>
}
