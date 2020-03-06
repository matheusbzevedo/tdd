module.exports = (app) => {
    const findAll = (request, response, next) => {
        app.services.accounts.findAll()
        .then(accounts => response.status(200).json(accounts))
        .catch(error => next(error));
    },
    create = (request, response, next) => {
        app.services.accounts.save(request.body)
        .then(result => response.status(201).json(result[0]))
        .catch(error => next(error));
    },
    get = (request, response, next) => {
        app.services.accounts.find({ id: request.params.id})
        .then(result => response.status(200).json(result))
        .catch(error => next(error));
    },
    update = (request, response, next) => {
        app.services.accounts.update(request.params.id, request.body)
        .then(result => response.status(200).json(result[0]))
        .catch(error => next(error));
    },
    remove = (request, response, next) => {
        app.services.accounts.remove(request.params.id)
        .then(() => response.status(204).send())
        .catch(error => next(error));
    };

    return { findAll, create, get, update, remove };
};