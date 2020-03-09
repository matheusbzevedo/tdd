const express = require('express'),
    jwt = require('jwt-simple'),
    bcrypt = require('bcrypt-nodejs'),
    ValidationError = require('./../errors/ValidationError');

module.exports = (app) => {
    const router = express.Router();

    router
    .post('/signin', (request, response, next) => {
        app.services.users.findOne({ email: request.body.email })
        .then(user => {
            if (!user) throw new ValidationError('Usuário ou senha inválido');

            if (bcrypt.compareSync(request.body.senha, user.senha)) {
                const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    };

                const token = jwt.encode(payload, 'secret');

                response.status(200).json({ token });
            } else throw new ValidationError('Usuário ou senha inválido');
        })
        .catch(error => next(error));
    })
    .post('/signup', (request, response, next) => {
        app.services.users.save(request.body)
        .then(result => response.status(201).json(result[0]))
        .catch(error => next(error));
    });

    return router;
};