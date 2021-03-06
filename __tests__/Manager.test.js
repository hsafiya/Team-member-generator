  
const { test } = require('@jest/globals');
const Manager = require('../lib/Manager');

test('creates managers object', () => {
    const manager = new Manager('name', 23, 'email', 'Manager','512');

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(String));
});


test('gets managers role', () => {
    const manager = new Manager('name', 23, 'email', 'Manager', '512');
    expect(manager.getRole()).toBe('Manager');
});