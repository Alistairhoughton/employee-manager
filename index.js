require("dotenv").config();
const mysql = require("mysql2");
const inquirer = require("inquirer");
const connection = require("./config/connection");

//======================================================================== start our query and show list in inquirer to start our functions.

const startQuery = () => {
  inquirer
  .prompt({
    type: "list",
    name: "options",
    message: "select an option",
    choices: [
      "view role",
      "view employee",
      "view department",
      "add role",
      "add employee",
      "add department",
      "update employee",
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
                
                //================================== add department function
                
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

//================================== add employee function

const addEmployee = () => {
  inquirer
  .prompt([
    {
      name: "first_name",
      type: "input",
      message: "Enter first name",
    },
    {
      name: "last_name",
      type: "input",
      message: "Enter surname name",
    },
  ])
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

  //================================== add role function
  
  const addRole = () => {
    inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter title",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter salary",
      },
    ])
    .then((answer) => {
      const query = connection.query(
        "INSERT INTO role SET ?",
        answer,
        
        (err, res) => {
          if (err) throw err;
          console.log(`${answer.title} has been added`);
          startQuery();
        }
        );
      });
    };
    
    //================================== view department function
    
    const viewDepartment = () => {
      const query = connection.query(
        "SELECT department FROM employee_manager_db.department",
        function (err, result) {
          if (err) throw err;
          console.log(result);
        }
        );
        startQuery();
      };
      
      //================================== view role function
      
      const viewRole = () => {
        const query = connection.query(
          "SELECT title FROM employee_manager_db.role",
          function (err, result) {
            if (err) throw err;
            console.log(result);
          }
          );
          startQuery();
        };
        
        //================================== view employee function
       
       
        const viewEmployee = () => {
            const query = connection.query(
                "SELECT * FROM employee_manager_db.employee",
                function (err, result) {
                    if (err) throw err;
                    console.log(result);
                  }
                );
                startQuery();
              };
              
              //============================================= update function
              
              const updateEmployee = () => {
                return connection.query(
                  "SELECT Employee.first_name, Employee.last_name, employee.id, role.title, role.id FROM Employee LEFT JOIN Role ON EMployee.id = Role.id",

    (err, res) => {
      inquirer.prompt([
        {
          name: "employee",
          type: "list",
          choices() {
            console.log("response console log",res);
            return res.map(( {first_name, last_name, id}) => {
              return { name: first_name + " " + last_name, value: id };
            });
          },
          message: "select employee to update ",
        },
        {
          name: "role",
          type: "list",
          choices() {
            return res.map(({ id, title }) => {
              return {name: title, value: id}
            });
          },
          message: "select new role"
        },
      ]).then((answer) => {
        connection.query(
          "UPDATE  employee SET ? WHERE ?",
          [{
            role_id: answer.role,
          },
        {
          id: answer.employee
        }],
          function (err, res){
            if (err) throw err;
            console.log(`the ${answer.employee} role has been updated`)
            startQuery();
          }
        )
      })
    }
  );
};

// ========================================= async await

(async () => {
  await startQuery();
})();

