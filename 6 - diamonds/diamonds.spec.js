async function mine(s) {}

test('we can mine diamonds', async () => {
  await expect(mine('')).resolves.toBe(0);
  await expect(mine('<>')).resolves.toEqual(1);
  await expect(mine('<<>>')).resolves.toEqual(2);
  await expect(mine('<><<>><<')).resolves.toEqual(3);
});
