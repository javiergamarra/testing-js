describe('matchers', () => {
  it('snapshot testing', () => {
    const user = {
      name: 'LeBron James1',
    };

    expect(user).toMatchSnapshot();
  });
});
