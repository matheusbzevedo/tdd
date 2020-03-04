module.exports = (app) => {
    const findAll = (request, response, next) => {
        app.services.users.findAll()
        .then(users => response.status(200).json(users))
        .catch(error => next(error));
    },
    create = (request, response, next) => {
        app.services.users.save(request.body)
        .then(result => response.status(201).json(result[0]))
        .catch(error => next(error));
    };

    return { findAll, create };
};