const sum = (a, b) => a + b;

test('sum suma', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 2)).toBe(4);
  expect(sum(1, 2)).toBe(5);
});
