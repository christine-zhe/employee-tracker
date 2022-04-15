// const express = require('express');
// const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');
// const mysql = require('mysql2');
const inquirer = require("inquirer");

const cTable = require('console.table');


const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

function firstPrompt() {
  return inquirer.prompt([
      {
      type: 'list',
      name: 'firstPrompt',
      message: 'Select from the following option',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
      }
  ]).then(data => {
      console.log('==============================');
     switch(data.firstPrompt) {
         case 'View All Departments':
          viewAllDepartments();
          break;
         case 'View All Roles':
          viewAllRoles();
          break;
         case 'View All Employees':
          viewAllEmployees();
          break;     
         case 'Add All Department':
          addAllDepartment();
          break;
         case 'Add All Role':
          addaRole();
          break;
         case 'Add An Employee':
          addEmployee();
          break;
         case 'Update All Employee Role':
          updateRole();
          break;    
     }
 
      
  });    
};

function viewAllDepartments() { 
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
  if(err) {
    console.log(err.message)
    return;
  };
  console.table(rows);
  firstPrompt();
});
};

function viewAllRoles() { 
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, rows) => {
    if(err) {
      console.log(err.message)
      return;
    };
    console.table(rows);
    firstPrompt();

});
};

function viewAllEmployees() { 
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, rows) => {
    if(err) {
      console.log(err.message)
      return;
    };
    console.table(rows);
    firstPrompt();

});
};

function addEmployee() {
  return inquirer.prompt([
    {
    type: 'input',
    name: 'firstName',
    message: 'Enter first name',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter last name'
    }
])
}

firstPrompt();


