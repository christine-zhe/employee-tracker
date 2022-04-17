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
    switch (data.firstPrompt) {
      case 'View All Departments':
        viewAllDepartments();
        break;
      case 'View All Roles':
        viewAllRoles();
        break;
      case 'View All Employees':
        viewAllEmployees();
        break;
      case 'Add A Department':
        addDepartment();
        break;
      case 'Add A Role':
        addaRole();
        break;
      case 'Add An Employee':
        addEmployee();
        break;
      case 'Update An Employee Role':
        updateRole();
        break;
    }


  });
};

function viewAllDepartments() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
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
    if (err) {
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
    if (err) {
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
      name: 'first_name',
      message: 'Enter first name',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter last name'
    }
    ,
    {
      type: 'number',
      name: 'role_id',
      message: 'What is the role ID?'
    }
    ,
    {
      type: 'number',
      name: 'manager_id',
      message: 'What is the manager ID?'
    }
  ]).then(data => {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`;
      const params =[data.first_name, data.last_name, data.role_id, data.manager_id];
  
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err.message)
          return;
        }
        console.table(result);
        console.log("Captured!")
        firstPrompt();
      });
    })
  }

function addDepartment() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter Department name',
    }
  ]).then(data => {
    const params = data.departmentName;
    const sql = `INSERT INTO department (name)
    VALUES(?)`;

    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("ERROR!")
        return;
      }
      console.table(result);
      console.log("Captured!")
      firstPrompt();
    });
  })
}

function addDepartment() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter Department name',
    }
  ]).then(data => {
    const params = data.departmentName;
    const sql = `INSERT INTO department (name)
    VALUES(?)`;

    db.query(sql, params, (err, result) => {
      if (err) {
        console.log("ERROR!")
        return;
      }
      console.table(result);
      console.log("Captured!")
      firstPrompt();
    });
  })
}



function addaRole() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the current role?',
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter the Salary',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'What is the department role?',
    }
  ]).then(data => {
    const sql = `INSERT INTO role (title, salary, department_id) SELECT ?,?, department.id FROM department where department.name = ?`;
    const params =[data.title, data.salary, data.department_id];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err.message)
        return;
      }
      console.table(result);
      console.log("Captured!")
      firstPrompt();
    });
  })
}

function updateRole() {
  return inquirer.prompt([
    {
      type: 'number',
      name: 'employee_id',
      message: 'Which employee would you like to update?'
    },
    {
      type: 'number',
      name: 'role_id',
      message: 'What role would you like to change it to?'
    }
    
  ]).then(data => {
    const sql = `UPDATE employee SET employee.role_id =? WHERE employee.id =?`;
    const params =[data.role_id, data.employee_id];

    db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err.message)
        return;
      }
      console.table(result);
      console.log("Captured!")
      firstPrompt();
    });
  })
}

//Starting the prompt

firstPrompt();


