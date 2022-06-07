function gift(n, h = Math.ceil(n / 2)) {
  if (!n || n < 3 || n % 2 === 0) {
    return null;
  }

  let str = Array.from({ length: h }, (_, i) => `${' '.repeat(h - i - 1) + '*'.repeat(2 * i + 1)}\n`);
  return str.concat(str.slice(0, -1).reverse()).join('');
}

module.exports = gift;
