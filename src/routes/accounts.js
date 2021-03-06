const express = require('express'),
    RecursoIndevidoError = require('./../errors/RecursoIndevidoError');

module.exports = (app) => {
    const router = express.Router();

    router
    .param('id', (request, response, next) => {
        app.services.accounts.find({ id: request.params.id })
        .then(acc => {
            if (acc.user_id != request.user.id) throw new RecursoIndevidoError();
            else next();
        })
        .catch(error => next(error));
    })
    .get('/', (request, response, next) => {
        app.services.accounts.findAll(request.user.id)
        .then(accounts => response.status(200).json(accounts))
        .catch(error => next(error));
    })
    .post('/', (request, response, next) => {
        app.services.accounts.save({ ...request.body, user_id: request.user.id })
        .then(result => response.status(201).json(result[0]))
        .catch(error => next(error));
    })
    .get('/:id',  (request, response, next) => {
        app.services.accounts.find({ id: request.params.id})
        .then(result => response.status(200).json(result))
        .catch(error => next(error));
    })
    .put('/:id', (request, response, next) => {
        app.services.accounts.update(request.params.id, request.body)
        .then(result => response.status(200).json(result[0]))
        .catch(error => next(error));
    })
    .delete('/:id', (request, response, next) => {
        app.services.accounts.remove(request.params.id)
        .then(() => response.status(204).send())
        .catch(error => next(error));
    });

    return router;
};