import { Person } from '../hello';

test('juan can say hello', () => {
  const juan = new Person();

  expect(juan.sayHi()).toEqual('hello!');
});
