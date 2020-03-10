const ValidationError = require('./../errors/ValidationError');

module.exports = (app) => {
    const save = async (account) => {
        if (!account.name) throw new ValidationError('Nome é um atributo obrigatório');

        const accDb = await find({ name: account.name, user_id: account.user_id});
        if (accDb) throw new ValidationError('Já existe uma conta com esse nome');

        return app.db('accounts').insert(account, '*');
    };

    const findAll = (user_id) => app.db('accounts').where({ user_id });

    const find = (filter = {}) => app.db('accounts').where(filter).first();

    const update = (id, account) => app.db('accounts').where({ id }).update(account, '*');

    const remove = (id) => app.db('accounts').where({ id }).del();

    return { save, findAll, find, update, remove };
};