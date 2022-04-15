const mysql = require('mysql2');
const inquirer = require("inquirer");

require("console.table");

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '',
      database: 'employeesDatabase'
    },
    console.log('Connected to the employeesDatabase.')
  );

  module.exports = db;
