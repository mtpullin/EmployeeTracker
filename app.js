const express = require('express')
const PORT = provess.env.PORT || 3001;
const routes = require('./routes')
const db = require('./db/connection')
const inq = require('inquirer')

const prompt = () => {
    return inq.prompt ({
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update employee role'
        ]
    })
}