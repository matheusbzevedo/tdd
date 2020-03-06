const jwt = require('jwt-simple'),
    bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
    const signin = (request, response, next) => {
        app.services.users.findOne({ email: request.body.email })
        .then(user => {
            if (bcrypt.compareSync(request.body.senha, user.senha)) {
                const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    };

                const token = jwt.encode(payload, 'secret');

                response.status(200).json({ token });
            }
        })
        .catch(error => next(error));
    };

    return { signin };
};