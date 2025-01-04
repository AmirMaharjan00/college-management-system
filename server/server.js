const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// app.use(express.json()); // Middleware to parse JSON bodies

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "college_management_system"
});

con.connect(function(err) {
  if( err ) throw err
  console.log( "Database Connected!" );
  con.query("CREATE DATABASE IF NOT EXISTS college_management_system", function (err, result) {
    if( err ) {
      throw err;
    } else {
      /**
       * Create Users Table
       * MARK: users
       */
      let userQuery = "CREATE TABLE IF NOT EXISTS users ("
        userQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,"
        userQuery += "name VARCHAR(255) NOT NULL,"
        userQuery += "email VARCHAR(255) NOT NULL,"
        userQuery += "password VARCHAR(255) NOT NULL,"
        userQuery += "contact_number BIGINT NOT NULL,"
        userQuery += "role VARCHAR(255) DEFAULT 'subscriber', "
        userQuery += "registered_date DATETIME DEFAULT CURRENT_TIMESTAMP "
        userQuery += ");"
      con.query( userQuery, function (err, result) {
        if( err ) throw err
        console.log( 'Users Table created.' )
      });
    }
  });
});

app.get('/api', (req, res) => {
  const data = { message: 'Hello from the server!' };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});