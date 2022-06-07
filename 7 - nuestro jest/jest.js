const expect = (value) => ({
  toBe(expected) {
    if (expected !== value) {
      throw new Error(`expected ${expected} is not the same as ${value}`);
    }
  },
});

const test = (title, fun) => {
  try {
    fun();
    console.log('fine!');
  } catch (e) {
    console.log(e);
    console.log('error!');
  }
};

const sum = (a, b) => a + b;

test('sum suma', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(1, 2)).toBe(4);
  expect(sum(1, 2)).toBe(5);
});
