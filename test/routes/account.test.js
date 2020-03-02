const request = require('supertest'),
    app = require('../../src/app.js'),
    MAIN_ROUTE = '/accounts';

let user;

beforeAll(async () => {
    const response = await app.services.users.save({ name: 'User Account', email: `${Date.now()}@mail.com`, senha: '123456'});
    user = { ...response[0] };
});

test('Deve inserir uma conta com sucesso', () => {
    return request(app).post(MAIN_ROUTE).send({ name: '#ACC1', user_id: user.id }).then(response => {
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('#ACC1');
    });
});