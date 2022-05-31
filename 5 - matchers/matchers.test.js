test('testing matchers', () => {
    expect(null).toBeNull();
    expect(null).toBeDefined();
    expect(undefined).toBeUndefined();
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();
    expect('a').toBeTruthy();
    expect('').toBeFalsy();
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();

    expect(3).toBeGreaterThan(1)
    expect(1).toBeLessThanOrEqual(3)
    expect(NaN).toBeNaN()

    expect([1, 2]).toContain(1)
    expect([1, 2]).toContainEqual(1)

    expect(1).toBe(1)
    expect(1).toEqual(1)

    expect({}).toEqual({})
    expect({}).not.toBe({})
    expect({a: '1'}).toEqual({a: '1'})
    expect({a: '1', b: undefined}).toEqual({a: '1'})
    expect({a: '1', b: undefined}).not.toStrictEqual({a: '1'})

    expect({a: '1'}).toHaveProperty('a')
    expect({a: '1'}).toHaveProperty('a', '1')

    expect(() => {
        throw new Error('fail');
    }).toThrow(new EvalError('fail'))
    expect(() => {
        throw new Error('fail');
    }).toThrowError(new Error('fail'))
    expect(() => {
        throw new Error('fail');
    }).not.toThrowError(new Error())

    expect(1).toEqual(expect.anything())
    expect(1).toEqual(expect.any(Number))
    expect(1).not.toEqual(expect.any(String))

    expect([1, 2, 3]).toEqual(expect.arrayContaining([1, 2]))
    expect('patata').toEqual(expect.stringContaining('tata'))
});