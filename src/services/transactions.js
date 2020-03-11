module.exports = (app) => {
    const find = (user_id, filter = {}) => {
        return app.db('transactions')
        .join('accounts', 'accounts.id', 'acc_id')
        .where(filter)
        .andWhere('accounts.user_id', '=', user_id)
        .select();
    };

    const save = (transaction) => {
        return app.db('transactions').insert(transaction, '*');
    };

    return { find, save };
};