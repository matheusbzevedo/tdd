test('Principais assertivas do jest', () => {
    let number = null;

    expect(number).toBeNull();

    number = 10;

    expect(number).not.toBeNull();
    expect(number).toBe(10);
    expect(number).toEqual(10);
    expect(number).toBeGreaterThan(9);
    expect(number).toBeLessThan(11);
});

test('Objetos', () => {
    const obj = {
        name: 'matheus',
        email: 'matheusbzevedo@gmail.com'
    };
    
    expect(obj).toHaveProperty('name');
    expect(obj).toHaveProperty('name', 'matheus');
    expect(obj.name).toBe('matheus');

    const obj2 = {
        name: 'matheus',
        email: 'matheusbzevedo@gmail.com'
    };
    expect(obj2).toBe(obj2);
});