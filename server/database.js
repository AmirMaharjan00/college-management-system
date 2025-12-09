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
          booksQuery += "courseId INT(11) DEFAULT 0, "
          booksQuery += "semester INT(11) DEFAULT 1, "
          booksQuery += "name VARCHAR(255) NOT NULL, "
          booksQuery += "author VARCHAR(255) NOT NULL, "
          booksQuery += "publication VARCHAR(255) NOT NULL, "
          booksQuery += "copies INT(11) NOT NULL DEFAULT 1, "
          booksQuery += "publishedYear DATETIME, "
          booksQuery += "language VARCHAR(255) NOT NULL, "
          booksQuery += "FOREIGN KEY(courseId) REFERENCES courses(id) "
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
          subjectsQuery += "teacherId INT(255), "
          subjectsQuery += "completion INT(255) NOT NULL DEFAULT 0, "
          subjectsQuery += "registered_date DATETIME DEFAULT CURRENT_TIMESTAMP, "
          subjectsQuery += "file VARCHAR(500),"
          subjectsQuery += "notes LONGTEXT,"
          subjectsQuery += "FOREIGN KEY(course_id) REFERENCES courses(id),"
          subjectsQuery += "FOREIGN KEY(teacherId) REFERENCES users(id) "
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

        /**
         * Create Examinations Table
         * MARK: Examinations
         */
        let examsQuery = "CREATE TABLE IF NOT EXISTS `exams` ("
          examsQuery += "id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          examsQuery += "title LONGTEXT NOT NULL, " 
          examsQuery += "type ENUM('first', 'second', 'third', 'pre-board', 'practical') DEFAULT 'first', " 
          examsQuery += "data LONGTEXT NOT NULL, "  // { date: '', subject: '' }
          examsQuery += "start DATETIME, "
          examsQuery += "end DATETIME, "
          examsQuery += "courseId INT(11) DEFAULT 0, "
          examsQuery += "semester INT(11) DEFAULT 1, "
          examsQuery += "notice LONGTEXT, "
          examsQuery += "FOREIGN KEY(courseId) REFERENCES courses(id) "
          examsQuery += ");"
        con.query( examsQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Exams Table created.' )
        });

        /**
         * Create User Meta Table
         * MARK: User Meta
         */
        let userMetaQuery = "CREATE TABLE IF NOT EXISTS `usermeta` ("
          userMetaQuery += "metaId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          userMetaQuery += "userId INT(11) NOT NULL, " 
          userMetaQuery += "dob DATE, "
          userMetaQuery += "secondaryContact VARCHAR(15), "
          userMetaQuery += "motherName VARCHAR(255), "
          userMetaQuery += "fatherName VARCHAR(255), "
          userMetaQuery += "motherEmail VARCHAR(255), "
          userMetaQuery += "fatherEmail VARCHAR(255), "
          userMetaQuery += "motherProfile VARCHAR(255), "
          userMetaQuery += "fatherProfile VARCHAR(255), "
          userMetaQuery += "motherContact VARCHAR(15), "
          userMetaQuery += "fatherContact VARCHAR(15), "
          userMetaQuery += "documents LONGTEXT, "
          userMetaQuery += "motherTongue VARCHAR(255) NOT NULL DEFAULT 'Nepali', "
          userMetaQuery += "language VARCHAR(255) NOT NULL DEFAULT 'Nepali', "
          userMetaQuery += "UNIQUE(userId), "
          userMetaQuery += "FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE "
          userMetaQuery += ");"
        con.query( userMetaQuery, function (err, result) {
          if( err ) throw err
          console.log( 'User Meta Table created.' )
        });

        /**
         * Create Assignments Table
         * MARK: Assignments
         */
        let assignmentQuery = "CREATE TABLE IF NOT EXISTS `assignments` ("
          assignmentQuery += "assignmentId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          assignmentQuery += "title TEXT NOT NULL, " 
          assignmentQuery += "assignedBy INT(11) NOT NULL, " 
          assignmentQuery += "assignedTo INT(11) NOT NULL, "
          assignmentQuery += "subjectId INT(11) NOT NULL, "
          assignmentQuery += "semester INT(11) NOT NULL DEFAULT 1, "
          assignmentQuery += "startDate DATETIME, "
          assignmentQuery += "endDate DATETIME, "
          assignmentQuery += "status ENUM('pending', 'closed') DEFAULT 'pending', "
          assignmentQuery += "file LONGTEXT, "
          assignmentQuery += "FOREIGN KEY(assignedBy) REFERENCES users(id), "
          assignmentQuery += "FOREIGN KEY(subjectId) REFERENCES subjects(id), "
          assignmentQuery += "FOREIGN KEY(assignedTo) REFERENCES courses(id) "
          assignmentQuery += ");"
        con.query( assignmentQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Assignments Table created.' )
        });

        /** 
         * Create Assignments Meta Table
         * MARK: Assignments Meta
         */
        let assignmentMetaQuery = "CREATE TABLE IF NOT EXISTS `assignmentsMeta` ("
          assignmentMetaQuery += "metaId INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, "
          assignmentMetaQuery += "assignmentId INT(11) NOT NULL, " 
          assignmentMetaQuery += "studentId INT(11) NOT NULL, "
          assignmentMetaQuery += "message LONGTEXT, "
          assignmentMetaQuery += "file LONGTEXT, "
          assignmentMetaQuery += "UNIQUE KEY unique_assignment_student(assignmentId, studentId), "
          assignmentMetaQuery += "FOREIGN KEY(assignmentId) REFERENCES assignments(assignmentId), "
          assignmentMetaQuery += "FOREIGN KEY(studentId) REFERENCES users(id) "
          assignmentMetaQuery += ");"
        con.query( assignmentMetaQuery, function (err, result) {
          if( err ) throw err
          console.log( 'Assignments Meta Table created.' )
        });
      }
    });
});
 
// module.exports = con