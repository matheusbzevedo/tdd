const request = require('supertest'),
    app = require('../../src/app.js'),
    email = `${Date.now()}@mail.com`,
    MAIN_ROUTE = '/users';

test('Deve listar todos os usuários', () => {
    return request(app).get(MAIN_ROUTE).then(response => {
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir um usuário com sucesso', () => {
    return request(app).post(MAIN_ROUTE).send({ name: 'Walter White', email, senha: '123456'}).then(response => {
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Walter White');
    })
});

test('Deve não deixar inserir um usuário sem nome', () => {
    return request(app).post(MAIN_ROUTE).send({ email: 'walter@mail.com', senha: '123456' }).then(response => {
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Deve não deixar inserir um usuário sem email', async () => {
    const result = await request(app).post(MAIN_ROUTE).send({ name: 'Walter White', senha: '123456' });
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Email é um atributo obrigatório');
});

test('Deve não deixar inserir um usuário sem senha ', done => {
    request(app).post(MAIN_ROUTE).send({ name: 'Walter White', email: 'walterwhite@mail.com' }).then(response => {
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Senha é um atributo obrigatório');
        done();
    })
    .catch(err => done.fail(err));
});

test('Deve não deixar inserir um usuário com email existente', () => {
    return request(app).post(MAIN_ROUTE).send({ name: 'Walter White', email, senha: '123456'}).then(response => {
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Já existe um usuário com esse email');
    })
});