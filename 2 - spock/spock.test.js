const spock = require('./spock');

test('papel gana a piedra', () => {
  expect(spock('papel', 'piedra')).toBe('papel');
});

test('papel contra papel devuelve empate', () => {
  expect(spock('papel', 'papel')).toBe('empate');
});

test('papel contra tijeras pierde', () => {
  expect(spock('papel', 'tijeras')).toBe('tijeras');
});

test('piedra contra tijeras gana', () => {
  expect(spock('piedra', 'tijeras')).toBe('piedra');
});

test('spock contra tijeras gana', () => {
  expect(spock('spock', 'tijeras')).toBe('spock');
});

test('spock contra piedra gana', () => {
  expect(spock('spock', 'piedra')).toBe('spock');
});

test('papel contra lagarto pierde', () => {
  expect(spock('papel', 'lagarto')).toBe('lagarto');
});

test('spock contra lagarto pierde', () => {
  expect(spock('spock', 'lagarto')).toEqual('lagarto');
});
