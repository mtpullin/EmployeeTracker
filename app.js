const express = require('express')
const PORT = process.env.PORT || 3001;
const departmentRoutes = require('./routes/departmentRoutes')
const db = require('./db/connection')
const inq = require('inquirer');
const { allowedNodeEnvironmentFlags } = require('process');
const Connection = require('mysql2/typings/mysql/lib/Connection');

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
            'update employee role',
            'end'
        ]
    }).then(function(option){
        switch (option) {
            case "view all departments":
                viewDepartments();
                break;
            case "view all roles":
                viewroles();
                break;
            case "view all employees":
                viewEmployees();
                break;
            case "add a department":
                addDepartment();
                break;
            case "add a role":
                addrole();
                break;
            case "add an employee":
                addEmployee();
                break;
            case "update employee role":
                updateRole();
                break;
            case "end":
                connection.end();
                break
        }
    }
    )}

prompt();