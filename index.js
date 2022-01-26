require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");

//connect to the database

const connection = mysql.createConnection(
  {
    database: process.env.DATABASE,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: "localhost",
    port: 3306,
  }
);

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id: ${connection.threadId}`);
});

//start our query

const startQuery = () => {
  inquirer
    .prompt({
      type: "list",
      name: "options",
      message: "select an option",
      choices: [
        //view employee data
        "view employee",
        "view role",
        //add employee
        "add role",
        "add department",
        //update data
        "exit",
      ],
    })
    .then((userChoice) => {
      switch (userChoice.options) {
        case "view employee":
          viewEmployee();
          break;

        case "add department":
          addDepartment();
          break;

        case "exit":
          console.log("Successfully logged out of the  application");
          connection.end();
          break;
      }
    });
};

//==================================

const addDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "add department",
    })
    .then((answer) => {
      const query = connection.query(
        "INSERT INTO department SET ?",
        answer,

        (err, res) => {
          if (err) throw err;
          console.log(`${answer.department} has been added`);
          startQuery();
        }
      );
    });
};

(async () => {
  await startQuery();
})();
