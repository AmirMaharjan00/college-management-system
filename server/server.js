const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

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
        userQuery += "address VARCHAR(255) DEFAULT 'Nepal',"
        userQuery += "gender VARCHAR(255) DEFAULT 'male',"
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

/* Insert Query */
app.post('/insert', (req, res) => {
  const { name, email, password, contactNumber, address, gender } = req.body
  const insertQuery = 'INSERT INTO users (name, email, password, contact_number, address, gender) VALUES (?, ?, ?, ?, ?, ?)'
  con.query( insertQuery, [ name, email, password, contactNumber, address, gender ], ( error, result ) => {
    if ( error ) {
      console.error( "Error inserting data:", error );
      return res.status( 500 ).json({ error: "Database insertion failed" });
    }
    console.log( "Number of records inserted:", result.affectedRows );
    res.status( 200 ).json({ message: "Data inserted successfully!", id: result.insertId, success: true });
  })
});

/* Select Query */
app.post('/select', (req, res) => {
  const { username, password } = req.body
  const selectQuery = `SELECT * FROM users WHERE email='${username}' AND password='${password}'`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      console.error( "Error selecting data:", error );
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    console.log( "Number of records selected:", result );
    res.status( 200 ).json({ result, success: true });
  })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});