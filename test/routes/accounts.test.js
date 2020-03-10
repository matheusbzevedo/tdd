const request = require('supertest'),
    app = require('../../src/app.js'),
    jwt = require('jwt-simple'),
    MAIN_ROUTE = `${process.env.version}/accounts`;

let user, user2;

beforeEach(async () => {
    const response = await app.services.users.save({ name: 'User Account', email: `${Date.now()}@mail.com`, senha: '123456'});
    user = { ...response[0] };
    user.token = jwt.encode(user, 'Segredo!');

    const response2 = await app.services.users.save({ name: 'User Account #2', email: `${Date.now()}@mail.com`, senha: '123456'});
    user2 = { ...response2[0] };
});

test('Deve inserir uma conta com sucesso', () => {
    return request(app).post(MAIN_ROUTE).send({ name: '#ACC1' })
    .set('authorization', `bearer ${user.token}`)
    .then(response => {
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('#ACC1');
    });
});

test('Deve não deixar inserir uma conta sem nome', () => {
    return request(app).post(MAIN_ROUTE).send({ })
    .set('authorization', `bearer ${user.token}`)
    .then(response => {
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Deve não inserir uma conta de nome duplicado para o mesmo usuário', () => {
    return app.db('accounts').insert({ name: 'ACC duplicada', user_id: user.id })
    .then(() => {
        return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({ name: 'ACC duplicada' })
        .then(response => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Já existe uma conta com esse nome');
        });
    });
});

test('Deve listar apenas as contas do usuário', () => {
    return app.db('accounts').insert([
        { name: 'Acc User 1', user_id: user.id },
        { name: 'Acc User 2', user_id: user2.id }
    ])
    .then(() => {
        return request(app).get(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].name).toBe('Acc User 1');
        });
    });
});

test('Deve retornar uma conta por ID', () => {
    return app.db('accounts').insert({ name: 'ACC BY ID', user_id: user.id }, ['id']).then(acc => {
        return request(app).get(`${MAIN_ROUTE}/${acc[0].id}`)
        .set('authorization', `bearer ${user.token}`)
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('ACC BY ID');
            expect(response.body.user_id).toBe(user.id);
        });
    });
});

test('Deve não retornar uma conta de outro usuário ', () => {
    return app.db('accounts').insert({ name: 'Acc User 2', user_id: user2.id }, ['id']).then(acc => {
        return request(app).get(`${MAIN_ROUTE}/${acc[0].id}`)
        .set('authorization', `bearer ${user.token}`)
        .then(response => {
            expect(response.status).toBe(403);
            expect(response.body.error).toBe('Este recurso não pertence ao usuário');
        });
    });
});

test('Deve alterar uma conta', () => {
    return app.db('accounts').insert({ name: 'ACC TO UPDATE', user_id: user.id }, ['id']).then(acc => {
        return request(app).put(`${MAIN_ROUTE}/${acc[0].id}`).send({ name: 'Acc updated' })
        .set('authorization', `bearer ${user.token}`)
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Acc updated');
        });
    });
});

test('Deve não alterar uma conta de outro usuário ', () => {
    return app.db('accounts').insert({ name: 'Acc User 2', user_id: user2.id }, ['id']).then(acc => {
        return request(app).put(`${MAIN_ROUTE}/${acc[0].id}`).send({ name: 'Acc update' })
        .set('authorization', `bearer ${user.token}`)
        .then(response => {
            expect(response.status).toBe(403);
            expect(response.body.error).toBe('Este recurso não pertence ao usuário');
        });
    });
});

test('Deve remover uma conta', () => {
    return app.db('accounts').insert({ name: 'ACC TO REMOVE', user_id: user.id }, ['id']).then(acc => {
        return request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`)
        .set('authorization', `bearer ${user.token}`)
        .then(response => {
            expect(response.status).toBe(204);
        });
    });
});

test('Deve não remover uma conta de outro usuário ', () => {
    return app.db('accounts').insert({ name: 'Acc User 2', user_id: user2.id }, ['id']).then(acc => {
        return request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`)
        .set('authorization', `bearer ${user.token}`)
        .then(response => {
            expect(response.status).toBe(403);
            expect(response.body.error).toBe('Este recurso não pertence ao usuário');
        });
    });
});