// node --inspect-brk ./../node_modules/.bin/jest --runInBand
// chrome://inspect/#devices

function sum(a, b) {
  // debugger
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  // debugger
  expect(sum(1, 2)).toBe(3);
});
