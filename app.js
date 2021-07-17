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
                db.promise().query(`SELECT * FROM department`).then(([rows,fields])=> {
                    console.table(rows)
                })
                .catch(console.log).then(prompt())
                break;
            case "view all roles":
                db.promise().query(`SELECT * FROM role`).then(([rows, fields])=> {
                    console.table(rows)
                }) 
                .catch(console.log).then(prompt())
                break;
            case "view all employees":
                db.promise().query(`SELECT * FROM employee`).then(([rows, fields])=> {
                    console.table(rows)
                })
                .catch(console.log).then(prompt()) 
                break;
            case "add a department":
                inq.prompt({
                    type: 'input',
                    name: 'department_name',
                    message: 'Enter new department name'
                }).then(({department_name})=> {
                    db.promise().query(`INSERT INTO department SET ?`,{name: department_name}).then( ([rows,fields])=>{
                        console.log(rows)
                    })
                    .catch(console.log).then(prompt())
                    
                })
                break;
            case "add a role":
                inq.prompt([
                    {
                    type: 'input',
                    name: 'role',
                    message: 'Name of new role'
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'input salary'
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select which department new role belongs to',
                    choices: [1, 2, 3, 4]
                }]).then(({role, salary, department_id})=> {
                    db.promise().query(`INSERT INTO role SET ?`,{title:role, salary:Number(salary), department_id: department_id}).then( ([rows,fields])=>{
                        console.log(rows)
                    })
                    .catch(console.log).then(prompt())
                })
                break;
            case "add an employee":
                inq.prompt([{
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
                    choices: [1,2,3,4]
                    

                    
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'choose manager',
                    choices: ['jimmy page']
                }
            ]).then(({first_name, last_name, role, manager})=> {
                    db.promise().query(`INSERT INTO department SET ?`,{first_name: first_name, last_name: last_name, role: role, manager: manager }).then( ([rows,fields])=>{
                        console.log(rows)
                    })
                    .catch(console.log).then(prompt())
                })
                 break;
            case "update employee role":
                inq.prompt([{
                    type: 'list',
                    name: 'id',
                    message: 'please selesct employee to update their role',
                    choices: [1,2,3,4,]
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Choose new role',
                    choices: [1,2,3,4]
                }]).then(({id ,role_id })=> {
                    db.promise().query(`UPDATE employee SET ?`,{ id: id, role_id: role_id}).then(([rows,fields])=>{
                        console.log(rows)
                    })
                    .catch(console.log).then(prompt())
                })
                break;
            case "end":
                onnection.end();
                break
        }
    }
    )}

prompt();