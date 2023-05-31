const mariadb = require('mariadb');

const pool = mariadb.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'postr'
    });


module.exports = pool;