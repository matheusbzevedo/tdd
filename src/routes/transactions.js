const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router
    .get('/', (request, response, next) => {
        app.services.transactions.find(request.user.id)
        .then(result => response.status(200).json(result))
        .catch(error => next(error));
    })
    .post('/', (request, response, next) => {
        app.services.transactions.save(request.body)
        .then(result => response.status(201).json(result[0]))
        .catch(error => next(error));
    });

    return router;
};