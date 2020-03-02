
exports.up = (knex) => {
    return knex.schema.createTable('users', t =>  {
        t.increments('id').primary();
        t.string('name').notNull();
        t.string('senha').notNull();
        t.string('email').notNull().unique();
    });
};

exports.down = (knex) => knex.schema.dropTable('users');
