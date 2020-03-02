module.exports = (app) => {
    const save = async (account) => {
        return app.db('accounts').insert(account, '*');
    };

    return { save };
};