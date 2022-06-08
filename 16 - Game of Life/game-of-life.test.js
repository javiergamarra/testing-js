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
