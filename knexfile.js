module.exports = {
    test: {
        client: 'pg',
        version: '9.6',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: 'protheus1',
            database: 'teste'
        },
        migrations: {
            directory: 'src/migrations'
        },
    }
};