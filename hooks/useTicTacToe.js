import { useState } from 'react'

import { TicTacToe } from '../lib/ticTacToe'

const game = new TicTacToe(10, 10)

const useTicTacToe = () => {
  const [, toggle] = useState(true)
  const handleToggle = () => toggle(val => !val)

  const handlePlay = (x, y) => {
    game.play(x, y)
    handleToggle()
  }
  const handleRestart = () => {
    game.restart()
    handleToggle()
  }
  const handleHasWinner = () => game.hasWinner()

  return {
    ...game,
    play: handlePlay,
    restart: handleRestart,
    hasWinner: handleHasWinner,
  }
}

export default useTicTacToe