const express = require('express')
const PORT = process.env.PORT || 3001;
const db = require('./db/Connection')
const inq = require('inquirer');
const { allowedNodeEnvironmentFlags } = require('process');
const Connection = require('./db/Connection');
const router = require('./routes/employeeRoutes');
require("console.table");
router.use(express.urlencoded({extended:false}))
router.use(express.json());

router.use(require('./routes/departmentRoutes'))
router.use(require('./routes/employeeRoutes'))
router.use(require('./routes/roleRoutes'))

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
                db.query(`SELECT * FROM department`,(err,results)=> {
                    if(err){
                        console.log(err);
                    }
                    console.log(results);
                })
                prompt();
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