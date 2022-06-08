class Board {
  board = [];

  length;

  constructor(length) {
    this.length = length;
    this.board = Array.from({ length }).map(() => Array.from({ length }).map(() => false));
  }

  static newFromArray(board) {
    const board1 = new Board();
    board1.board = board;
    board1.length = board.length;
    return board1;
  }

  validPos(x) {
    return x >= 0 && x < this.length;
  }

  getNeighbours(i, j) {
    const pos = [-1, 0, 1];
    let alive = 0;

    for (let k = 0; k < pos.length; k += 1) {
      for (let l = 0; l < pos.length; l += 1) {
        if (this.validPos(i + pos[k]) && this.validPos(j + pos[l]) && !(pos[k] === 0 && pos[l] === 0)) {
          if (this.board[i + pos[k]][j + pos[l]]) {
            alive += 1;
          }
        }
      }
    }

    return alive;
  }

  tick() {
    const newBoard = new Board(this.length);
    for (let i = 0; i < this.length; i += 1) {
      for (let j = 0; j < this.length; j += 1) {
        const n = this.getNeighbours(i, j);
        if (n < 2 || n > 3) {
          newBoard.board[i][j] = false;
        } else if (n === 3) {
          newBoard.board[i][j] = true;
        } else {
          newBoard.board[i][j] = this.board[i][j];
        }
      }
    }
    this.board = newBoard.board;
  }
}

describe("board", () => {
  test("new board", () => {
    const board = new Board(3);
    expect(board.length).toEqual(3);
    expect(board.board).toEqual([
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ]);
  });

  test("new from board", () => {
    const board = Board.newFromArray([
      [false, false, false],
      [false, true, false],
      [false, false, false]
    ]);
    expect(board.length).toEqual(3);
    expect(board.board).toEqual([
      [false, false, false],
      [false, true, false],
      [false, false, false]
    ]);
  });

  test("tick when 1 alive", () => {
    const board = Board.newFromArray([
      [false, false, false],
      [false, true, false],
      [false, false, false]
    ]);
    board.tick();
    expect(board.board).toEqual([
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ]);
  });

  test("tick when 3 alive", () => {
    const board = Board.newFromArray([
      [false, true, false],
      [true, true, false],
      [false, false, false]
    ]);
    board.tick();
    expect(board.board).toEqual([
      [true, true, false],
      [true, true, false],
      [false, false, false]
    ]);
  });

  test("tick when complex board", () => {
    const board = Board.newFromArray([
      [false, false, true, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, true, false, true]
    ]);
    board.tick();
    expect(board.board).toEqual([
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, true, false]
    ]);
    board.tick();
    expect(board.board).toEqual([
      [false, false, false, false],
      [false, true, true, false],
      [false, false, false, true],
      [false, true, true, false]
    ]);
    board.tick();
    expect(board.board).toEqual([
      [false, false, false, false],
      [false, false, true, false],
      [false, false, false, true],
      [false, false, true, false]
    ]);
    board.tick();
    expect(board.board).toEqual([
      [false, false, false, false],
      [false, false, false, false],
      [false, false, true, true],
      [false, false, false, false]
    ]);
    board.tick();
    expect(board.board).toEqual([
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ]);
  });
});
