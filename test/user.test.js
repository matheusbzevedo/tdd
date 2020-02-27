const request = require('supertest'),
    app = require('./../src/app.js');

test('Deve listar todos os usuários', () => {
    return request(app).get('/users').then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('name', 'João');
    });
});

test('Deve inserir um usuário com sucesso', () => {
    return request(app).post('/users').send({ name: 'Walter White', mail: 'ww@gmail.com' }).then(response => {
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Walter White');
    })
});