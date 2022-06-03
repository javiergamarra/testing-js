class Persona {
  decirHola() {
    return 'hola!';
  }
}

test('juan puede decir hola', () => {
  const juan = new Persona();

  expect(juan.decirHola()).toEqual('hola!');
});
