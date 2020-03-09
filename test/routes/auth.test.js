const request = require('supertest'),
    app = require('../../src/app.js'),
    MAIN_ROUTE = `/auth`;

test('Deve criar usuário via signup', () => {
    return request(app).post(`${MAIN_ROUTE}/signup`).send({ name: 'Walter', email: `${Date.now()}@mail.com`, senha: '123456' })
    .then(response => {
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Walter');
        expect(response.body).toHaveProperty('email');
        expect(response.body).not.toHaveProperty('senha');
    })
});

test('Deve receber token ao logar', () => {
    const email = `${Date.now()}@mail.com`;

    return app.services.users.save({ name: 'Thezus', email, senha: '123456' })
    .then(() => {
        return request(app).post(`${MAIN_ROUTE}/signin`).send({ email, senha: '123456'})
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });
    });
});

test('Deve não autenticar usuário com senha errada', () => {
    const email = `${Date.now()}@mail.com`;

    return app.services.users.save({ name: 'Thezus', email, senha: '123456' })
    .then(() => {
        return request(app).post(`${MAIN_ROUTE}/signin`).send({ email, senha: '654321'})
        .then(response => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Usuário ou senha inválido');
        });
    });
});

test('Deve não autenticar usuário não existente', () => {
    return request(app).post(`${MAIN_ROUTE}/signin`).send({ email: 'teste@gmail.com', senha: '654321'})
    .then(response => {
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Usuário ou senha inválido');
    });
});

test('Deve não acessar uma rota protegida sem token', () => {
    return request(app).get('/v1/users').then(response => {
        expect(response.status).toBe(401);
    });
});