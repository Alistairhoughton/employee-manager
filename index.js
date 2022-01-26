require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");

//connect to the database

const connection = mysql.createConnection({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 3306,
});

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
        "view role",
        "view employee",
        "view department",
        //add employee
        "add role",
        "add employee",
        "add department",
        //update data
        "update employee",
        //exit
        "exit",
      ],
    })
    .then((userChoice) => {
      switch (userChoice.options) {
        case "view role":
          viewRole();
          break;

        case "view employee":
          viewEmployee();
          break;

        case "view department":
          viewDepartment();
          break;

        case "add role":
          addRole();
          break;

        case "add employee":
          addEmployee();
          break;

        case "add department":
          addDepartment();
          break;

          case "update employee":
          updateEmployee();
          break;

        case "exit":
          console.log("Successfully logged out of the  application");
          connection.end();
          break;
      }
    });
};

//================================== add department

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

const addEmployee = () => {
  inquirer.prompt({
    name: "first_name",
    type: "input",
    message: "Enter first name",
  },
  {
    name: "last_name",
    type: "input",
    message: "Enter surname name",
  },
 )
  .then((answer) => {
    const query = connection.query(
      "INSERT INTO employee SET ?",
      answer,

      (err, res) => {
        if (err) throw err;
        console.log(`${answer.first_name} has been added`);
        startQuery();
      }
    );
  });
};

(async () => {
  await startQuery();
})();
