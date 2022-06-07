async function mine(s) {
  let diamonds = 0;

  while (s.includes('<>')) {
    await new Promise((resolve) => {
      setTimeout(() => {
        diamonds += 1;
        s = s.replace('<>', '');
        resolve();
      }, 100);
    });
  }

  return diamonds;
}

test('we can mine diamonds', async () => {
  await expect(mine('')).resolves.toBe(0);
  await expect(mine('<>')).resolves.toEqual(1);
  await expect(mine('<<>>')).resolves.toEqual(2);
  await expect(mine('<><<>><<')).resolves.toEqual(3);
});
