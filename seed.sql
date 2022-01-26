USE employee_manager_db;


INSERT INTO department (department)
VALUES ('HR'), ('SALES'), ("OPERATIONS");

INSERT INTO role (title, salary, department_id)
VALUES 
("Manager", 60000, 1), 
("Engineer", 50000, 3),
("Intern", 30000, 2);


-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES 
-- ("Alistair", "Houghton", 1, null),
-- ("Joe", "Bloggs", 2, 1),
-- ("Jimmy", "Smith", 3, 1);

-- const addRole = () => {
--   inquirer.prompt({
--     name: "title",
--     type: "input",
--     message: "Enter your role",
--   },
--   {
--     name: "salary",
--     type: "input",
--     message: "Enter Salary",
--   },
--  )
--   .then((answer) => {
--     const query = connection.query(
--       "INSERT INTO role SET ?",
--       answer,

--       (err, res) => {
--         if (err) throw err;
--         console.log(`${answer.title} has been added`);
--         startQuery();
--       }
--     );
--   });
-- };
