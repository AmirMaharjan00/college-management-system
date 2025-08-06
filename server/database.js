const mysql = require( 'mysql2' );

/**
 * MARK: Database
 */
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "college_management_system"
});

module.exports = { con };
  
con.connect(function(err) {
    if( err ) throw err
    console.log( "Database Connected!" );
    con.query("CREATE DATABASE IF NOT EXISTS college_management_system", function (err, result) {
      if( err ) {
        throw err;
      } else {
        /**
         * Create Courses Table
         * MARK: Courses
         */
        let coursesQuery = "CREATE TABLE IF NOT EXISTS courses ("
          coursesQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          coursesQuery += "name VARCHAR(255) NOT NULL, "
          coursesQuery += "abbreviation VARCHAR(255) NOT NULL, "
          coursesQuery += "duration INT(11) NOT NULL DEFAULT 4, "
          coursesQuery += "semester INT(11) NOT NULL DEFAULT 4, "
          coursesQuery += "cost INT(11) NOT NULL, "
          coursesQuery += "monthlyCost INT GENERATED ALWAYS AS( cost / ( duration * 12 ) ) STORED, "
          coursesQuery += "semesterCost INT GENERATED ALWAYS AS( cost / NULLIF( semester, 0 ) ) STORED, "
          coursesQuery += "registered_date DATETIME DEFAULT CURRENT_TIMESTAMP "
          coursesQuery += ");"
        con.query( coursesQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Courses Table created.' )
        });

         /**
         * Create Books Table
         * MARK: Books
         */
        let booksQuery = "CREATE TABLE IF NOT EXISTS `books` ("
          booksQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          booksQuery += "name VARCHAR(255) NOT NULL, "
          booksQuery += "author VARCHAR(255) NOT NULL, "
          booksQuery += "publication VARCHAR(255) NOT NULL, "
          booksQuery += "publishedYear DATETIME, "
          booksQuery += "language VARCHAR(255) NOT NULL "
          booksQuery += ");"
        con.query( booksQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Books Table created.' )
        });

        /**
         * Create Users Table
         * MARK: users
         */
        let userQuery = "CREATE TABLE IF NOT EXISTS users ("
          userQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          userQuery += "name VARCHAR(255) NOT NULL, "
          userQuery += "email VARCHAR(255) NOT NULL, "
          userQuery += "password VARCHAR(255) NOT NULL, "
          userQuery += "contact BIGINT NOT NULL, "
          userQuery += "address VARCHAR(255) DEFAULT 'Nepal', "
          userQuery += "gender VARCHAR(255) DEFAULT 'male', "
          userQuery += "role VARCHAR(255) DEFAULT 'student', "
          userQuery += "view VARCHAR(255) DEFAULT 'light', "
          userQuery += "courseId INT(11) DEFAULT 0, "
          userQuery += "semester INT(11) NOT NULL DEFAULT 0, "
          userQuery += "status VARCHAR(255) NOT NULL DEFAULT 'offline', "
          userQuery += "profile VARCHAR(500) NOT NULL DEFAULT '/images/user.jpg',"
          userQuery += "registered_date DATETIME DEFAULT CURRENT_TIMESTAMP, "
          userQuery += "FOREIGN KEY(courseId) REFERENCES courses(id) "
          userQuery += ");"
        con.query( userQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Users Table created.' )
        });

        /**
         * Create Subjects Table
         * MARK: Subjects
         */
        let subjectsQuery = "CREATE TABLE IF NOT EXISTS subjects ("
          subjectsQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          subjectsQuery += "name VARCHAR(255) NOT NULL, "
          subjectsQuery += "course_id INT(11), "
          subjectsQuery += "semester INT(11) NOT NULL, "
          subjectsQuery += "year INT(11) NOT NULL, "
          subjectsQuery += "code VARCHAR(255), "
          subjectsQuery += "registered_date DATETIME DEFAULT CURRENT_TIMESTAMP, "
          subjectsQuery += "FOREIGN KEY(course_id) REFERENCES courses(id) "
          subjectsQuery += ");"
        con.query( subjectsQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Subjects Table created.' )
        });

        /**
         * Create Notification Table
         * MARK: Notification
         */
        let notificationQuery = "CREATE TABLE IF NOT EXISTS notification ("
          notificationQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          notificationQuery += "title VARCHAR(255) NOT NULL, "
          notificationQuery += "excerpt LONGTEXT NOT NULL, "
          notificationQuery += "sender INT(11), "
          notificationQuery += "receiver VARCHAR(255) NOT NULL, "
          notificationQuery += "registered_date DATETIME DEFAULT CURRENT_TIMESTAMP, "
          notificationQuery += "FOREIGN KEY(sender) REFERENCES users(id) "
          notificationQuery += ");"
        con.query( notificationQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Notifications Table created.' )
        });

        /**
         * Create Account Table
         * MARK: Account
         */
        let accountQuery = "CREATE TABLE IF NOT EXISTS account ("
          accountQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          accountQuery += "userId INT(11), "
          accountQuery += "amount INT(11) NOT NULL, "
          accountQuery += "message LONGTEXT NOT NULL, "
          accountQuery += "type VARCHAR(255) NOT NULL DEFAULT 'expenses', "
          accountQuery += "purpose VARCHAR(255) NOT NULL DEFAULT 'payroll', "
          accountQuery += "date DATETIME DEFAULT CURRENT_TIMESTAMP, "
          accountQuery += "year INT GENERATED ALWAYS AS (YEAR(date)) STORED, "
          accountQuery += "month INT GENERATED ALWAYS AS (MONTH(date)) STORED, "
          accountQuery += "FOREIGN KEY(userId) REFERENCES users(id) "
          accountQuery += ");"
        con.query( accountQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Account Table created.' )
        });

        /**
         * Create Leave Table
         * MARK: Leave
         */
        let leaveQuery = "CREATE TABLE IF NOT EXISTS `leave` ("
          leaveQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          leaveQuery += "userId INT(11), "
          leaveQuery += "appliedOn DATETIME DEFAULT CURRENT_TIMESTAMP, "
          leaveQuery += "start DATETIME, "
          leaveQuery += "end DATETIME, "
          leaveQuery += "status VARCHAR(255) DEFAULT 'pending', "
          leaveQuery += "leaveType VARCHAR(255) DEFAULT 'casual', "
          leaveQuery += "description LONGTEXT NOT NULL, "
          leaveQuery += "FOREIGN KEY(userId) REFERENCES users(id) "
          leaveQuery += ");"
        con.query( leaveQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Leave Table created.' )
        });

        /**
         * Create Messages Table
         * MARK: Messages
         */
        let messageQuery = "CREATE TABLE IF NOT EXISTS `messages` ("
          messageQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          messageQuery += "sender INT(11), "
          messageQuery += "receiver INT(11), "
          messageQuery += "message LONGTEXT NOT NULL, "
          messageQuery += "messageType VARCHAR(255) DEFAULT 'text', "
          messageQuery += "sentOn DATETIME DEFAULT CURRENT_TIMESTAMP, "
          messageQuery += "FOREIGN KEY(sender) REFERENCES users(id), "
          messageQuery += "FOREIGN KEY(receiver) REFERENCES users(id) "
          messageQuery += ");"
        con.query( messageQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Message Table created.' )
        });

        /**
         * Create Books Issued Table
         * MARK: Books Issued
         */
        let booksIssuedQuery = "CREATE TABLE IF NOT EXISTS `booksIssued` ("
          booksIssuedQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          booksIssuedQuery += "bookId INT(11), "
          booksIssuedQuery += "userId INT(11), "
          booksIssuedQuery += "issuedDate DATETIME DEFAULT CURRENT_TIMESTAMP, "
          booksIssuedQuery += "dueDate DATETIME, "
          booksIssuedQuery += "returnDate DATETIME, "
          booksIssuedQuery += "status VARCHAR(255) NOT NULL DEFAULT 'issued', "
          booksIssuedQuery += "fineAmount INT(11) NOT NULL DEFAULT 0, "
          booksIssuedQuery += "issuedBy INT(11), "
          booksIssuedQuery += "fineStatus VARCHAR(255) NOT NULL DEFAULT 'N/A', "
          booksIssuedQuery += "FOREIGN KEY(bookId) REFERENCES books(id), "
          booksIssuedQuery += "FOREIGN KEY(userId) REFERENCES users(id), "
          booksIssuedQuery += "FOREIGN KEY(issuedBy) REFERENCES users(id) "
          booksIssuedQuery += ");"
        con.query( booksIssuedQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Books Issued Table created.' )
        });

        /**
         * Create Complaints Table
         * MARK: Complaints
         */
        let complaintsQuery = "CREATE TABLE IF NOT EXISTS `complaints` ("
          complaintsQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          complaintsQuery += "`by` INT(11), "
          complaintsQuery += "`against` INT(11), "
          complaintsQuery += "subject TEXT NOT NULL, "
          complaintsQuery += "message LONGTEXT NOT NULL, "
          complaintsQuery += "file TEXT, "
          complaintsQuery += "status ENUM('pending', 'closed', 'rejected', 'progress') DEFAULT 'pending', "
          complaintsQuery += "date DATETIME DEFAULT CURRENT_TIMESTAMP, "
          complaintsQuery += "FOREIGN KEY(`by`) REFERENCES users(id), "
          complaintsQuery += "FOREIGN KEY(`against`) REFERENCES users(id) "
          complaintsQuery += ");"
        con.query( complaintsQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Complaints Table created.' )
        });
      }
    });
});
 
// module.exports = con