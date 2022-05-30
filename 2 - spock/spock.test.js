const spock = require('./spock');

test('papel gana a piedra', () => {
    expect(spock('papel', 'piedra')).toBe('papel');
});