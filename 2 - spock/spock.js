const rules = {
  spock: ['tijeras', 'piedra'],
  papel: ['piedra', 'spock'],
  piedra: ['tijeras', 'lagarto'],
  tijeras: ['papel', 'lagarto'],
  lagarto: ['papel', 'spock'],
};

function spock(primero, segundo) {
  return primero === segundo ? 'empate' : rules[primero].includes(segundo) ? primero : segundo;
}

module.exports = spock;
