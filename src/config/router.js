const express = require('express');

module.exports = (app) => {
    app.use('/auth', app.routes.auth);

    const protectedRouter = express.Router();

    protectedRouter.use('/users', app.routes.users)
    protectedRouter.use('/accounts', app.routes.accounts);

    app.use(`${process.env.version}`, app.config.passport.authenticate(), protectedRouter);
};