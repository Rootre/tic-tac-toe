import Head from 'next/head'

import useTicTacToe from '../hooks/useTicTacToe'

import Board from '../components/Board'

export default function Home() {
  const { hasWinner, play, playBoard, restart } = useTicTacToe()

  const winner = hasWinner()

  return (
    <div>
      <Head>
        <title>Tic tac toe | Board</title>
      </Head>

      <button onClick={restart}>restart</button>
      <Board board={playBoard.getBoard()} play={play}/>
      {winner && <p><strong>winner:</strong> {winner.nickname}</p>}
    </div>
  )
}
