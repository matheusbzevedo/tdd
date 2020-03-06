const request = require('supertest'),
    app = require('./../../src/app');

test('Deve receber token ao logar', () => {
    const email = `${Date.now()}@e.com`;

    return app.services.users.save({ name: 'WW', email, senha: '123456' })
    .then(() => {
        request(app).post('/auth/signin').send({ email, senha: '123456' })
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });
    });
});