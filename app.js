const express = require('express')
const PORT = process.env.PORT || 3001;
const db = require('./db/Connection')
const inq = require('inquirer');
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
    }).then(function({options}){
        switch (options) {
            case "view all departments":
                db.query(`SELECT * FROM department`,(err,results)=> {
                    if(err){
                        console.log(err);
                    }
                    console.table(results);
                }).then(prompt())
                break;
            case "view all roles":
                db.query(`SELECT * FROM role`, (err, results)=> {
                    if(err){
                        console.log(err);
                    }
                    console.table(results)
                }).then(prompt())
                break;
            case "view all employees":
                db.query(`SELECT * FROM employee`, (err, results)=> {
                    if(err){
                        console.log(err)
                    }
                    console.table(results)
                }).then(prompt())
                break;
            case "add a department":
                inq.prompt({
                    type: 'input',
                    name: 'department_name',
                    message: 'Enter new department name'
                }).then(
                    db.query(`INSERT INTO department (department_name)`),
                    console.log('Department added')
                ).then(prompt())
                break;
            case "add a role":
                inq.prompt({
                    type: 'input',
                    name: 'role',
                    message: 'Name of new role'
                },
                {
                    type: 'list',
                    name: 'role_location',
                    message: 'Select which department new role belongs to',
                    choices: ['Finance','Sales','Legal','Management']
                }).then(
                    db.query(`INSERT INTO roles (role)`),
                    console.log('New role added')
                ).then(prompt())
                break;
            case "add an employee":
                inq.prompt({
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter employee first name'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter employee last name'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Choose employee role',
                    choices: [
                        'Financial Advisor',
                        'Sales Representitive',
                        'Lawyer',
                        'Manager'
                    ]
                }).then(
                    db.query(`INSERT INTO employee (first_name, last_name, role)`),
                    console.log('Employee added')
                ).then(prompt())
                
                break;
            case "update employee role":
               const params = [req.body.role_id, req.params.id];
                db.query(`UPDATE employee SET role_id =? WHERE id=?`,params,(err,results)=>{
                    if(err) {
                        console.log(err)
                    }
                    console.table(results)
                })
                break;
            case "end":
                connection.end();
                break
        }
    }
    )}

prompt();