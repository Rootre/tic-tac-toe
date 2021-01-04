import React from 'react'

const tableStyle = {
  cursor: 'pointer',
  textAlign: 'center',
}
const tdStyle = {
  height: 20,
  width: 20,
}

const Board = ({ board, play }) => {
  return (
    <table cellSpacing={0} border={1} style={tableStyle}>
      <tbody>
      {board.map((cols, j) => (
        <tr key={j}>
          {cols.map((player, i) => (
            <td onClick={() => play && play(i, j)} style={tdStyle} key={i}>
              {player && player.symbolValue}
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default Board