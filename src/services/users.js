const ValidationError = require('./../errors/ValidationError'),
    bcrypt = require('bcrypt-nodejs');

module.exports = (app) => {
    const findAll = () => app.db('users').select(['id', 'name', 'email']);

    const findOne = (filter = {}) => app.db('users').where(filter).first();

    const getPasswordHash = (password) => {
        const salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(password, salt);
    };

    const save = async (user) => {
        if (!user.name) throw new ValidationError('Nome é um atributo obrigatório');
        if (!user.email) throw new ValidationError('Email é um atributo obrigatório');
        if (!user.senha) throw new ValidationError('Senha é um atributo obrigatório');

        const userDb = await findOne({ email: user.email });
        if (userDb) throw new ValidationError('Já existe um usuário com esse email');

        const newUser = { ...user };
        newUser.senha = getPasswordHash(user.senha);

        return app.db('users').insert(newUser, ['id', 'name', 'email']);
    };

    return { findAll, save, findOne };
};