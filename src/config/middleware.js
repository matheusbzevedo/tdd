const bodyParser = require('body-parser');
    // knexLogger = require('knex-logger');

module.exports = (app) => {
    app
    .use(bodyParser.json())
    // .use(knexLogger(app.db));
};