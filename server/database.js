import mysql from 'mysql2'

/**
 * MARK: Database
 */
export const con = mysql.createConnection({
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
          userQuery += "role VARCHAR(255) DEFAULT 'student', "
          userQuery += "view VARCHAR(255) DEFAULT 'light', "
          userQuery += "registered_date DATETIME DEFAULT CURRENT_TIMESTAMP "
          userQuery += ");"
        con.query( userQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Users Table created.' )
        });

        /**
         * Create Courses Table
         * MARK: Courses
         */
        let coursesQuery = "CREATE TABLE IF NOT EXISTS courses ("
          coursesQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,"
          coursesQuery += "name VARCHAR(255) NOT NULL,"
          coursesQuery += "registered_date DATETIME DEFAULT CURRENT_TIMESTAMP "
          coursesQuery += ");"
        con.query( coursesQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Courses Table created.' )
        });

        /**
         * Create Courses Table
         * MARK: Courses
         */
        let subjectsQuery = "CREATE TABLE IF NOT EXISTS subjects ("
          subjectsQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,"
          subjectsQuery += "name VARCHAR(255) NOT NULL,"
          subjectsQuery += "course_id INT(11) NOT NULL,"
          subjectsQuery += "registered_date DATETIME DEFAULT CURRENT_TIMESTAMP,"
          subjectsQuery += "FOREIGN KEY(course_id) REFERENCES courses(id) "
          subjectsQuery += ");"
        con.query( subjectsQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Subjects Table created.' )
        });
      }
    });
});
 
// module.exports = con