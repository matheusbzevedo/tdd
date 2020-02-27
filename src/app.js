const app = require('express')(),
    bodyParser = require('body-parser');


app
.use(bodyParser.json())
.get('/', (request, response) => response.status(200).send())
.get('/users', (request, response) => {
    let users = [
        {
            name: 'João',
            mail: 'joao@gmail.com'
        }
    ];
    response.status(200).json(users);
})
.post('/users', (request, response) => response.status(201).json(request.body));

module.exports = app;