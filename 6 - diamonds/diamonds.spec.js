async function mine(s) {
  const promises = [];

  while (s.includes('<>')) {
    s = s.replace('<>', '');
    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 100);
      }),
    );
  }

  return (await Promise.all(promises)).length;
}

test('we can mine diamonds', async () => {
  await expect(mine('')).resolves.toBe(0);
  await expect(mine('<>')).resolves.toEqual(1);
  await expect(mine('<<>>')).resolves.toEqual(2);
  await expect(mine('<><<>><<')).resolves.toEqual(3);
});
