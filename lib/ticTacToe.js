export const noughtsSymbol = Symbol('noughts')
export const crossesSymbol = Symbol('crosses')

function PlayerDynamics(player1, player2) {
  this.player1 = player1
  this.player2 = player2
  this.activePlayer = player1
}

PlayerDynamics.prototype.changePlayers = function () {
  this.activePlayer = this.activePlayer.id === this.player1.id ? this.player2 : this.player1
}
PlayerDynamics.prototype.getActivePlayer = function () {
  return this.activePlayer
}

export function TicTacToe(rows, cols) {
  this.rows = rows
  this.cols = cols
  this.playBoard = new Board(rows, cols)
  this.players = new PlayerDynamics(
    new Player('Player 1', crossesSymbol),
    new Player('Player 2', noughtsSymbol),
  )
  this.finished = false
}

TicTacToe.prototype.play = function (x, y) {
  const currentPlayer = this.players.getActivePlayer()

  if (this.finished || !this.playBoard.play(x, y, currentPlayer)) {
    return
  }

  if (this.playBoard.checkBoardForWin()) {
    this.finished = true
  } else {
    this.players.changePlayers()
  }
}
TicTacToe.prototype.restart = function () {
  this.playBoard = new Board(this.rows, this.cols)
  this.finished = false
}
TicTacToe.prototype.hasWinner = function () {
  if (!this.finished) {
    return false
  }

  return this.players.activePlayer
}

export function Player(nickname, symbol) {
  const Symbols = {
    [noughtsSymbol]: 'O',
    [crossesSymbol]: 'X',
  }

  if (!Symbols.hasOwnProperty(symbol)) {
    throw new Error(`Symbol '${symbol.toString()}' is not recognized`)
  }

  return {
    id: Symbol(nickname),
    nickname,
    symbol,
    symbolValue: Symbols[symbol],
  }
}

function Board(cols, rows, win = 5) {
  // TODO: arguments check
  this.board = Array.from({ length: rows }, () => Array.from({ length: cols }))
  this.win = win
}

Board.prototype.get = function (x, y) {
  if (!this.board.hasOwnProperty(y) || !this.board[y].hasOwnProperty(x)) {
    return false
  }

  return this.board[y][x]
}
Board.prototype.play = function (x, y, player) {
  const coordsValue = this.get(x, y)

  if (coordsValue === false || typeof coordsValue !== 'undefined') {
    return false
  }

  this.board[y][x] = player

  return true
}
Board.prototype.getBoard = function () {
  return this.board
}
Board.prototype.checkBoardForWin = function () {
  for (let y = 0; y < this.board.length; y++) {
    for (let x = 0; x < this.board[y].length; x++) {
      if (typeof this.board[y][x] === 'undefined') {
        continue
      }

      if (this.checkR(x, y, this.board[y][x])) {
        return true
      }
      if (this.checkB(x, y, this.board[y][x])) {
        return true
      }
      if (this.checkBL(x, y, this.board[y][x])) {
        return true
      }
      if (this.checkBR(x, y, this.board[y][x])) {
        return true
      }
    }
  }

  return false
}
Board.prototype.checkR = function (x, y, player, depth = 0) {
  if (depth >= this.win - 1) {
    return true
  }

  const coordsValue = this.get(x + 1, y)

  if (coordsValue && coordsValue.id === player.id) {
    return this.checkR(x + 1, y, player, depth + 1)
  } else {
    return false
  }
}
Board.prototype.checkB = function (x, y, player, depth = 0) {
  if (depth >= this.win - 1) {
    return true
  }

  const coordsValue = this.get(x, y + 1)

  if (coordsValue && coordsValue.id === player.id) {
    return this.checkB(x, y + 1, player, depth + 1)
  } else {
    return false
  }
}
Board.prototype.checkBR = function (x, y, player, depth = 0) {
  if (depth >= this.win - 1) {
    return true
  }

  const coordsValue = this.get(x + 1, y + 1)

  if (coordsValue && coordsValue.id === player.id) {
    return this.checkBR(x + 1, y + 1, player, depth + 1)
  } else {
    return false
  }
}
Board.prototype.checkBL = function (x, y, player, depth = 0) {
  if (depth >= this.win - 1) {
    return true
  }

  const coordsValue = this.get(x - 1, y + 1)

  if (coordsValue && coordsValue.id === player.id) {
    return this.checkBL(x - 1, y + 1, player, depth + 1)
  } else {
    return false
  }
}
