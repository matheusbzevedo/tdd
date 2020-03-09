const passport = require('passport'),
    passportJwt = require('passport-jwt'),
    { Strategy, ExtractJwt } = passportJwt,
    secret = 'Segredo!';

module.exports = (app) => {
    const params = {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    strategy = new Strategy(params, (payload, done) => {
        app.services.users.findOne({ id: payload.id })
        .then(user => {
            if (user) done(null, { ...payload })
            else done(null, false);
        })
        .catch(err => done(err, false));
    });

    passport.use(strategy);

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    };
};