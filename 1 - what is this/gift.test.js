const gift = require('./gift');

test('gift con valores pares no devuelven nada', () => {
  expect(gift(0)).toBe(null);
  expect(gift(1)).toBe(null);
  expect(gift(2)).toBe(null);
  expect(gift(4)).toBe(null);
  expect(gift(6)).toBe(null);
});

test('con valor 3 devuelve un rombo de 3 lineas', () => {
  expect(gift(3)).toBe(` *
***
 *
`);
});

test('con valor 5 devuelve un rombo de 5 lineas', () => {
  expect(gift(5)).toBe(`  *
 ***
*****
 ***
  *
`);
});

test('con valor 7 devuelve un rombo de 7 lineas', () => {
  expect(gift(7)).toBe(`   *
  ***
 *****
*******
 *****
  ***
   *
`);
});
