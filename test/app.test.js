const request = require('supertest'),
    app = require('./../src/app.js');

test('Deve responder na raiz', () => {
    return  request(app).get('/').then(response => expect(response.status).toBe(200))
});