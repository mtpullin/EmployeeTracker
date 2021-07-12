const mysql= require('mysql2');
const secret = require('hide-secrets')
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1darkness',
        database: 'employeedatabase'
    },
    console.log('Connected to the Employee database.')
)
module.exports = db;