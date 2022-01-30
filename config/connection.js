const mysql = require('mysql2');

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
  
  module.exports = connection;