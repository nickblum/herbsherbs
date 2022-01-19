module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: __dirname+process.env.SQLITE_PATH
        },
        migrations: {
            directory: __dirname+'/migrations',
        },
        seeds: {
            directory: __dirname+'/seeds',
        }
    }, 
    test: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: __dirname+process.env.SQLITE_PATH
        }
    }
};