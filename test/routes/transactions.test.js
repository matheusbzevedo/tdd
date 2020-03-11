const request = require('supertest'),
    app = require('./../../src/app'),
    jwt = require('jwt-simple'),
    MAIN_ROUTE = `${process.env.version}/transactions`

let user, user2, accUser, accUser2;

beforeAll(async () => {
    await app.db('transactions').del();
    await app.db('accounts').del();
    await app.db('users').del();

    [user, user2] = await app.db('users').insert([
        { name: 'User 1', email: 'user1@mail.com', senha: '$2a$10$r9EybImpOGebkDzGveuQweJJ.XBwDyhqcbVU.GynxqWa22Z1Qu/9i' },
        { name: 'User 2', email: 'user2@mail.com', senha: '$2a$10$4ao5gemMu83f.rBb1FMepecXeIo6OhrJ6Epq1vTS3F.4rYW/8Ko1e' },
    ], '*');

    delete user.senha;
    user.token = jwt.encode(user, 'Segredo!');

    [accUser, accUser2] = await app.db('accounts').insert([
        { name: 'ACC 1', user_id: user.id },
        { name: 'ACC 2', user_id: user2.id }
    ], '*');

});

test('Deve listar apenas as transações do usuário', () => {
    return app.db('transactions').insert([
        { description: 'T1', data: new Date(), ammount: 100, type: 'I', acc_id: accUser.id },
        { description: 'T2', data: new Date(), ammount: 200, type: 'O', acc_id: accUser2.id }
    ])
    .then(() => {
        return request(app).get(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
            expect(response.body.description).toBe('T1');
        });
    });
});