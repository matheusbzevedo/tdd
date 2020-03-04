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

test('Deve não deixar inserir uma conta sem nome', () => {
    return request(app).post(MAIN_ROUTE).send({ user_id: user.id }).then(response => {
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Nome é um atributo obrigatório');
    })
});

test.skip('Deve não inserir uma conta de nome duplicado para o mesmo usuário', () => {
    
});

test('Deve listar todas as contas', () => {
    return app.db('accounts').insert({name: 'ACC LIST', user_id: user.id }).then(() => {
        request(app).get(MAIN_ROUTE).then(response => {
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });
});

test.skip('Deve listar apenas as contas do usuário', () => {

});

test('Deve retornar uma conta por ID', () => {
    return app.db('accounts').insert({name: 'ACC BY ID', user_id: user.id }, ['id']).then(acc => {
        request(app).get(`${MAIN_ROUTE}/${acc[0].id}`).then(response => {
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('ACC BY ID');
            expect(response.body.user_id).toBe(user.id);
        });
    });
});

test.skip('Deve não retornar uma conta de outro usuário ', () => {
    
});

test('Deve alterar uma conta', () => {
    return app.db('accounts').insert({name: 'ACC TO UPDATE', user_id: user.id }, ['id']).then(acc => {
        request(app).put(`${MAIN_ROUTE}/${acc[0].id}`).send({ name: 'Acc updated' }).then(response => {
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('Acc updated');
        })
    });
});

test.skip('Deve não alterar uma conta de outro usuário ', () => {
    
});

test('Deve remover uma conta', () => {
    return app.db('accounts').insert({name: 'ACC TO REMOVE', user_id: user.id }, ['id']).then(acc => {
        request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`).then(response => {
            expect(response.status).toBe(204);
        });
    });
});

test.skip('Deve não remover uma conta de outro usuário ', () => {
    
});