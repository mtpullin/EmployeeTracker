const mysql= require('mysql2');
const secret = require('hide-secrets')
require('dotenv').config()

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    },
    console.log('Connected to the Employee database.')
)
module.exports = db;