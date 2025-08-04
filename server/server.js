const express = require( 'express' ),
  session = require( 'express-session' ),
  bodyParser = require( 'body-parser' ),
  cors = require( 'cors' ),
  cookieParser = require( 'cookie-parser' ),
  { con } = require( './database.js' ),
  http = require( 'http' ),
  { Server } = require( 'socket.io' ),
  multer = require( 'multer' ),
  path = require( 'path' ),
  fs = require( 'fs' );

const folderPath = path.join( __dirname, 'uploads' )
fs.mkdir(folderPath, (err) => {
  if (err) return console.error('Error creating folder:', err);
  console.log('Folder created successfully!');
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage }); // Directory to save uploaded files
const app = express();
const port = process.env.PORT || 5000;

app.use('/uploads', express.static('uploads'));
app.use('/images', express.static('images'));

app.use( express.json() );
app.use( cookieParser() );
app.use( bodyParser.json() ); // for parsing application/json
app.use( cors({
  origin: 'http://localhost:3000', // Replace with your React app's URL
  methods: [ 'POST', 'GET' ],
  credentials: true // Allow credentials (cookies)
}) );

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',  // frontend origin
    methods: ["GET", "POST"]
  }
});

/**
 * MARK: Session
 */
app.use(session({
  secret: 'hello-secret-key',
  resave: false,
  saveUninitialized: false, /* Will generate a new session id every time we make a request */
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // session timeout of 1 day
}));

app.use((req, res, next) => {
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

io.listen(4000);
io.on('connection', (socket) => {
  console.log(`User connected: ${ socket.id }`);

  socket.on('join', ({ senderId, receiverId }) => {
    socket.join( senderId )
    socket.join( receiverId )
  });

  socket.on('sendMessage', ( data ) => {
    socket.broadcast.emit( 'receiveMessage', data )
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

/**
 * MARK: User Insert Query
 */
app.post('/insert-user', (req, res) => {
  const { name, email, password, contact, address, gender, role } = req.body
  const insertQuery = 'INSERT INTO users (name, email, password, contact, address, gender, role) VALUES (?, ?, ?, ?, ?, ?, ?)'
  con.query( insertQuery, [ name, email, password, contact, address, gender, role ], ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database insertion failed" });
    }
    return res.status( 200 ).json({ message: "Data inserted successfully!", id: result.insertId, success: true });
  })
});

/**
 * MARK: Course Insert Query
 */
app.post('/insert-course', (req, res) => {
  const { name, abbreviation, duration, cost, semester } = req.body
  const selectQuery = `SELECT * FROM courses WHERE name="${ name }" AND abbreviation="${ abbreviation }"`
  const insertQuery = 'INSERT INTO courses (name, abbreviation, duration, cost, semester) VALUES (?, ?, ?, ?, ?)'
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ isError: true, success: false, message: "Something went wrong. Please Try again." });
    }
    if( result.length <= 0 ) {
      con.query( insertQuery, [ name, abbreviation, duration, cost, semester ], ( error, result ) => {
        if ( error ) {
          return res.status( 500 ).json({ message: "Failed ! Please Try again.", success: false, isError: true });
        }
        return res.status( 200 ).json({ message: "SuccessFully Registered.", id: result.insertId, success: true });
      })
    } else {
      return res.status( 200 ).json({ message: "Course already Exists.", success: false, isExists: true });
    }
  })
});

/**
 * MARK: Subject Insert Query
 */
app.post('/insert-subject', (req, res) => {
  const { name, semester, duration, course } = req.body
  const selectQuery = `SELECT * FROM subjects WHERE name="${ name }" AND semester="${ semester }" AND year="${ duration }" AND course_id="${ course }"`
  const insertQuery = 'INSERT INTO subjects (name, semester, year, course_id) VALUES (?, ?, ?, ?)'
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ isError: true, success: false, message: "Something went wrong. Please Try again." });
    }
    if( result.length <= 0 ) {
      con.query( insertQuery, [ name, semester, duration, course ], ( error, result ) => {
        if ( error ) {
          return res.status( 500 ).json({ message: "Failed ! Please Try again.", success: false, isError: true });
        }
        return res.status( 200 ).json({ message: "SuccessFully Registered.", id: result.insertId, success: true });
      })
    } else {
      return res.status( 200 ).json({ message: "Subject already Exists.", success: false, isExists: true });
    }
  })
});

/**
 * MARK: Notification Insert Query
 */
app.post('/insert-notification', (req, res) => {
  const { title, details, sendTo, id } = req.body
  const selectQuery = `SELECT * FROM notification WHERE title="${ title }" AND excerpt="${ details }" AND sender="${ id }" AND receiver="${ sendTo }"`
  const insertQuery = 'INSERT INTO notification (title, excerpt, sender, receiver) VALUES (?, ?, ?, ?)'
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ isError: true, success: false, message: "Something went wrong. Please Try again." });
    }
    if( result.length <= 0 ) {
      con.query( insertQuery, [ title, details, id, sendTo ], ( error, result ) => {
        if ( error ) {
          return res.status( 500 ).json({ message: "Failed ! Please Try again.", success: false, isError: true });
        }
        return res.status( 200 ).json({ message: "SuccessFully Added.", id: result.insertId, success: true });
      })
    } else {
      return res.status( 200 ).json({ message: "Notification already Exists.", success: false, isExists: true });
    }
  })
});

/**
 * MARK: Leave Insert Query
 */
app.post('/insert-leave', ( request, res ) => {
  const { from, to, description, type } = request.body
  const { user } = request.session;
  const { id: userId } = user
  const selectQuery = `SELECT * FROM \`leave\` WHERE userId="${ userId }" AND start="${ from }" AND end="${ to }"`
  const insertQuery = 'INSERT INTO \`leave\` (userId, start, end, leaveType, description) VALUES (?, ?, ?, ?, ?)'
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ isError: true, success: false, message: "Something went wrong. Please Try again." });
    }
    if( result.length <= 0 ) {
      con.query( insertQuery, [ userId, from, to, type, description ], ( error, result ) => {
        if ( error ) {
          return res.status( 500 ).json({ message: "Failed ! Please Try again.", success: false, isError: true });
        }
        return res.status( 200 ).json({ message: "SuccessFully Added.", id: result.insertId, success: true });
      })
    } else {
      return res.status( 200 ).json({ message: "Already applied for leave on these dates.", success: false, isExists: true });
    }
  })
});

/**
* MARK: Login
*/
app.post( '/login', ( request, res ) => {
  const { username, password } = request.body;
  const selectQuery = `SELECT * FROM users WHERE email='${username}' AND password='${password}'`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.json({ message: 'Error Inside Server.', login: false })
    } else {
      request.session.isLoggedIn = true
      request.session.user = result[ 0 ]
      return res.json({ message: 'Success', login: true })
    }
  });
});

/**
* MARK: Log out
*/
app.post( '/logout', ( request, res ) => {
  request.session.destroy(( error ) => {
    if( error ) {
      return res.json({ message: 'Failed', logout: false })
    } else {
      return res.json({ message: 'Success', logout: true })
    }
  })
});

/**
* MARK: Is logged In
*/
app.post( '/isLoggedIn', ( request, res ) => { 
  const { isLoggedIn, user } = request.session;
  return res.json({ isLoggedIn, user })
});

/**
* MARK: Users Student and Teacher API
*/
app.post( '/users-student-teacher', ( request, res ) => { 
  const selectQuery = `SELECT role, COUNT(id) AS total FROM users WHERE role IN ('student', 'teacher', 'staff') GROUP BY role;`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
* MARK: Users API
*/
app.post( '/Users', ( request, res ) => { 
  const selectQuery = `SELECT * FROM users`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
* MARK: Users By id
*/
app.post( '/user-by-id', ( request, res ) => { 
  const { id } = request.body;
  const selectQuery = `SELECT * FROM users WHERE id="${ id }"`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result: result[0], success: true });
  })
});

/**
* MARK: Courses API
*/
app.post( '/courses', ( request, res ) => { 
  const selectQuery = `SELECT * FROM courses`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
* MARK: Subjects API
*/
app.post( '/subjects', ( request, res ) => { 
  const selectQuery = `SELECT subjects.*, courses.name AS courseName, courses.abbreviation FROM subjects JOIN courses ON subjects.course_id = courses.id ORDER BY subjects.id DESC`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
* MARK: Notification API
*/
app.post( '/notification', ( request, res ) => { 
  const selectQuery = `SELECT * FROM notification`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
* MARK: Notification API by Id
*/
app.post( '/notification-by-id', ( request, res ) => { 
  const { id } = request.body;
  const selectQuery = `SELECT * FROM notification WHERE id="${ id }"`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result: result[ 0 ], success: true });
  })
});

/**
* MARK: Dark Mode API
*/
app.post( '/dark-mode', ( request, res ) => {
  const selectQuery = `SELECT view FROM users WHERE id="${ request.body.id }" `
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ view: result[0].view, success: true });
  })
});

/**
* MARK: Set Dark Mode API
*/
app.post( '/set-dark-mode', ( request, res ) => {
  const { view, id } = request.body
  const selectQuery = `UPDATE users SET view="${ view }" WHERE id=${ id }`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ success: false, error: "Database selection failed" });
    }
    return res.status( 200 ).json({ success: true, view });
  })
});

/**
* MARK: Set Dark Mode API
*/
app.post( '/update-profile', ( request, res ) => {
  const { name, email, contact, address, gender, role, profile } = request.body
  const { user } = request.session;
  request.session.user = { ...user, ...request.body }
  const updateQuery = `UPDATE users SET name="${ name }", email="${ email }", contact="${ contact }", address="${ address }", gender="${ gender }", role="${ role }", profile="${ profile }" WHERE id=${ user.id }`
  con.query( updateQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ success: false, error: "Database Update failed" });
    }
    return res.status( 200 ).json({ success: true, profile });
  })
});

/**
* MARK: Select Query
*/
app.post('/select', (req, res) => {
  const { table } = req.body
  const selectQuery = `SELECT * FROM \`${ table }\``
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
* MARK: Select leave via date
*/
app.post('/select-leave-via-date', (req, res) => {
  const { dateDuration } = req.body
  let selectQuery = `SELECT \`leave\`.*, \`users\`.name, \`users\`.profile, \`users\`.role FROM \`leave\` INNER JOIN \`users\` ON \`leave\`.userId=\`users\`.id WHERE `
  switch( dateDuration ){
    case 'this-week':
      selectQuery += `YEAR( appliedOn ) = YEAR( CURDATE() ) AND WEEK( appliedOn, 1 ) = WEEK( CURDATE(), 1 )`
      break;
    case 'last-week':
      selectQuery += `YEAR( appliedOn ) = YEAR( CURDATE() ) AND WEEK( appliedOn, 1) = WEEK( CURDATE(), 1 ) - 1`
      break;
    case 'this-month':
      selectQuery += `YEAR( appliedOn ) = YEAR( CURDATE() ) AND MONTH( appliedOn ) = MONTH( CURDATE() )`
      break;
    default: 
      selectQuery += `DATE(appliedOn)=CURDATE()`
      break;
  }
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
* MARK: Update leave status
*/
app.post( '/update-leave-status', ( request, res ) => {
  const { status, id } = request.body
  const updateQuery = `UPDATE \`leave\` SET status="${ status }" WHERE id=${ id }`
  con.query( updateQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ success: false, error: "Database Update failed" });
    }
    const selectQuery = `SELECT * FROM \`leave\``
    con.query( selectQuery, ( error, result ) => {
      if ( error ) {
        return res.status( 500 ).json({ error: "Database selection failed" });
      }
      return res.status( 200 ).json({ result, success: true });
    })
  })
});

/**
* MARK: Insert Message
*/
app.post( '/message', ( request, res ) => {
  const { sender, receiver, message, messageType = 'text' } = request.body
  const insertQuery = 'INSERT INTO messages (sender, receiver, message, messageType) VALUES (?, ?, ?, ?)'
  con.query( insertQuery, [ sender, receiver, message, messageType ], ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ message: "Failed ! Please Try again.", success: false, isError: true });
    }
    return res.status( 200 ).json({ message: "SuccessFully Added.", id: result.insertId, success: true });
  })
});

/**
* MARK: Get Message
*/
app.post( '/get-message', ( request, res ) => {
  const { sender, receiver } = request.body
  const selectQuery = `SELECT * FROM messages WHERE (sender="${ sender }" AND receiver="${ receiver }") OR ( sender="${ receiver }" AND receiver="${ sender }" ) ORDER BY sentOn ASC;`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: Upload
 */
app.post('/upload', upload.single('image'), (req, res) => {
  const path = `/uploads/${req.file.originalname}`

  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send({
    message: 'Image uploaded successfully!',
    imageUrl: path
  });
});

/**
 * MARK: Users via role
 */
app.post( '/all-users-via-role', ( request, res ) => { 
  let { sortBy = 'asc', role = 'student' } = request.body
  const selectQuery = `SELECT users.*, courses.abbreviation FROM users JOIN courses ON users.courseId = courses.id WHERE role="${ role }" ORDER BY users.id ${ sortBy };`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: Users via role
 */
app.post( '/payment-gateway', async ( request, res ) => { 
  try {
    const response = await fetch('https://dev.khalti.com/api/v2/epayment/initiate/', {
      method: 'POST',
      headers: {
        'Authorization': 'Key YOUR_KHALTI_SECRET_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Khalti request failed' });
  }
});

/**
 * MARK: Books
 */
app.post( '/all-books', ( request, res ) => { 
  const selectQuery = `SELECT * from books`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: Books Issued
 */
app.post( '/all-books-issued', ( request, res ) => { 
  const selectQuery = `SELECT booksIssued.*, issuer.name AS issuerName, issuer.profile AS issuerProfile, borrower.name AS borrowerName, borrower.profile AS borrowerProfile, books.name AS bookName FROM booksIssued JOIN users AS issuer ON booksIssued.issuedBy = issuer.id JOIN users AS borrower ON booksIssued.userId = borrower.id JOIN books ON booksIssued.bookId = books.id;`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: Books Returned
 */
app.post( '/books-returned', ( request, res ) => { 
  const selectQuery = `SELECT booksIssued.*, users.name FROM booksIssued JOIN users ON booksIssued.userId = users.id WHERE booksIssued.status="returned";`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: Books Fined
 */
app.post( '/books-fined', ( request, res ) => { 
  const selectQuery = `SELECT * from booksIssued WHERE status="overdue"`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: Books Fined
 */
app.post( '/library-fines-monthwise', ( request, res ) => { 
  const selectQuery = `SELECT MONTHNAME(dueDate) AS month, SUM(fineAmount) AS total FROM booksIssued WHERE status="overdue" GROUP BY MONTH(dueDate) ORDER BY MONTH(dueDate);`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: Delete Books
 */
app.post( '/delete-book', ( request, res ) => { 
  const { id } = request.body
    deleteQuery = `DELETE FROM books WHERE id="${ id }"`
  con.query( deleteQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ success: false, error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result: true, success: true });
  })
});

/**
 * MARK: Book Insert Query
 */
app.post('/add-book', (req, res) => {
  const { name, author, publication, publishedYear, language } = req.body
  const insertQuery = 'INSERT INTO books (name, author, publication, publishedYear, language) VALUES (?, ?, ?, ?, ?)'
  con.query( insertQuery, [ name, author, publication, publishedYear, language ], ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database insertion failed" });
    }
    return res.status( 200 ).json({ message: "Data inserted successfully!", id: result.insertId, success: true });
  })
});


/**
* MARK: update book
*/
app.post( '/edit-book', ( request, res ) => {
  const { id, name, author, publication, publishedYear, language } = request.body,
    updateQuery = `UPDATE books SET name="${ name }", author="${ author }", publication="${ publication }", publishedYear="${ publishedYear }", language="${ language }" WHERE id=${ id };`
  con.query( updateQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ success: false, error: "Database Update failed" });
    }
    return res.status( 200 ).json({ success: true, result });
  })
});

/**
 * MARK: Issue new book
 */
app.post('/issue-new-book', (req, res) => {
  const { bookId, userId, dueDate } = req.body,
    { user } = req.session,
    { id: currentUserId } = user,
    insertQuery = 'INSERT INTO booksIssued (bookId, userId, dueDate, issuedBy) VALUES (?, ?, ?, ?)'
  con.query( insertQuery, [ bookId, userId, dueDate, currentUserId ], ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database insertion failed" });
    }
    return res.status( 200 ).json({ message: "Data inserted successfully!", id: result.insertId, success: true });
  })
});

/**
* MARK: edit issued book
*/
app.post( '/edit-issued-book', ( request, res ) => {
  const { id, bookId, userId, dueDate } = request.body,
    { user } = request.session,
    { id: currentUserId } = user,
    updateQuery = `UPDATE booksIssued SET bookId="${ bookId }", userId="${ userId }", dueDate="${ dueDate }", issuedBy="${ currentUserId }" WHERE id=${ id };`
  con.query( updateQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ success: false, error: "Database Update failed" });
    }
    return res.status( 200 ).json({ success: true, result });
  })
});

/**
 * MARK: Delete issued Book
 */
app.post( '/delete-issued-book', ( request, res ) => { 
  const { id } = request.body
    deleteQuery = `DELETE FROM booksissued WHERE id="${ id }"`
  con.query( deleteQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ success: false, error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result: true, success: true });
  })
});

/**
 * MARK: Collect fine
 */
app.post( '/overdue-and-unpaid', ( request, res ) => { 
  const selectQuery = `SELECT booksIssued.*, users.name FROM booksIssued JOIN users ON booksIssued.userId = users.id WHERE booksIssued.status="overdue" AND booksIssued.fineStatus="unpaid"`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ success: false, error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: paid fines
 */
app.post( '/paid-fines', ( request, res ) => { 
  const selectQuery = `SELECT booksIssued.*, users.name, users.profile, books.name AS bookName from booksIssued JOIN users ON booksIssued.userId = users.id JOIN books ON booksIssued.bookId = books.id WHERE fineStatus="paid";`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ success: false, error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
* MARK: update fine
*/
app.post( '/update-fine', ( request, res ) => {
  const { id } = request.body,
    updateQuery = `UPDATE booksIssued SET fineStatus="paid" WHERE id=${ id };`
  con.query( updateQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ success: false, error: "Database Update failed" });
    }
    return res.status( 200 ).json({ success: true, result });
  })
});

/**
* MARK: update book return
*/
app.post( '/update-book-return', ( request, res ) => {
  const { id, returnDate } = request.body,
    updateQuery = `UPDATE booksIssued SET returnDate="${ returnDate }", status="returned" WHERE id="${ id }";`
  con.query( updateQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ success: false, error: "Database Update failed" });
    }
    return res.status( 200 ).json({ success: true, result });
  })
});

/**
 * MARK: STUDENTS ONLY
 */
app.post( '/students-only', ( request, res ) => { 
  const selectQuery = `SELECT * FROM users WHERE role="student"`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: TEACHERS ONLY
 */
app.post( '/teachers-only', ( request, res ) => { 
  const selectQuery = `SELECT * FROM users WHERE role="teacher"`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: STAFF ONLY
 */
app.post( '/staffs-only', ( request, res ) => { 
  const selectQuery = `SELECT * FROM users WHERE role="staff"`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: STAFF & TEACHER
 */
app.post( '/teachers-and-staffs', ( request, res ) => { 
  const selectQuery = `SELECT * FROM users WHERE role IN ('teacher', 'staff');`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) return res.status( 500 ).json({ error: "Database selection failed" });
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: PAYROLL
 */
app.post('/add-payroll', (req, res) => {
  const { userId, amount, message } = req.body
  const insertQuery = `INSERT INTO account (userId, amount, message) SELECT ${ userId }, ${ amount }, "${ message }" WHERE NOT EXISTS ( SELECT 1 FROM account WHERE userId = ${ userId } AND year = YEAR(NOW()) AND month = MONTH(NOW()));`
  con.query( insertQuery, [ userId, amount, message ], ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database insertion failed" });
    }
    return res.status( 200 ).json({ message: "Data inserted successfully!", id: result.insertId, success: true });
  })
});

/**
 * MARK: ADD FINE
 */
app.post('/add-fine', (req, res) => {
  const { userId, amount, message } = req.body
  const insertQuery = `INSERT INTO account (userId, amount, message, type, purpose) VALUES (${ userId }, ${ amount }, "${ message }", "income", "fine");`
  con.query( insertQuery, [ userId, amount, message ], ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database insertion failed" });
    }
    return res.status( 200 ).json({ message: "Data inserted successfully!", id: result.insertId, success: true });
  })
});

/**
 * MARK: EXPENSES ONLY
 */
app.post( '/expenses', ( request, res ) => { 
  const selectQuery = `SELECT account.*, users.name, users.profile FROM account JOIN users ON account.userId = users.id WHERE type="expenses";`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) return res.status( 500 ).json({ error: "Database selection failed" });
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: INCOME ONLY
 */
app.post( '/income', ( request, res ) => { 
  const selectQuery = `SELECT account.*, users.name, users.profile FROM account JOIN users ON account.userId = users.id  WHERE type="income";`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) return res.status( 500 ).json({ error: "Database selection failed" });
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: YEAR EXPENSE
 */
app.post( '/year-expenses', ( request, res ) => { 
  const selectQuery = `SELECT MONTHNAME(date) AS month, SUM(amount) AS total FROM account WHERE type="expenses" GROUP BY MONTH(date) ORDER BY MONTH(date);`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: YEAR INCOME
 */
app.post( '/year-income', ( request, res ) => { 
  const selectQuery = `SELECT MONTHNAME(date) AS month, SUM(amount) AS total FROM account WHERE type="income" GROUP BY MONTH(date) ORDER BY MONTH(date);`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
 * MARK: YEAR INCOME
 */
app.post( '/paid-fees', ( request, res ) => { 
  const selectQuery = `SELECT SUM(CASE WHEN COALESCE(p.totalPaid, 0) >= c.cost THEN 1 ELSE 0 END) AS paidFull, SUM(CASE WHEN COALESCE(p.totalPaid, 0) < c.cost THEN 1 ELSE 0 END) AS unpaid FROM users u JOIN courses c ON u.courseId = c.id LEFT JOIN ( SELECT userId, SUM(amount) AS totalPaid FROM account WHERE type = 'income' GROUP BY userId ) p ON u.id = p.userId WHERE u.role = 'student'`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result: result[0], success: true });
  })
});

/**
* MARK: Users Student and Teacher API
*/
app.post( '/expenses-income', ( request, res ) => { 
  const selectQuery = `SELECT type, SUM(amount) AS total FROM account WHERE type IN ('expenses', 'income') AND YEAR(date) = YEAR(CURDATE()) GROUP BY type;`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
* MARK: MONTHLY PAYROLL
*/
app.post( '/monthly-payroll', ( request, res ) => { 
  const selectQuery = `SELECT COUNT(*) as total FROM users u LEFT JOIN ( SELECT DISTINCT userId FROM account WHERE purpose = 'payroll' AND YEAR(date) = YEAR(CURDATE()) AND MONTH(date) = MONTH(CURDATE()) ) a ON u.id = a.userId WHERE u.role IN ('teacher', 'staff') AND a.userId IS NULL;`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result: result[ 0 ], success: true });
  })
});

/**
* MARK: TODAY EXPENSE
*/
app.post( '/today-expense', ( request, res ) => { 
  const selectQuery = `SELECT IFNULL( SUM(amount), 0 ) AS total FROM account WHERE type="expenses" AND DATE(date) = CURDATE();`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) return res.status( 500 ).json({ error: "Database selection failed" });
    return res.status( 200 ).json({ result: result[ 0 ], success: true });
  })
});

/**
* MARK: TODAY INCOME
*/
app.post( '/today-income', ( request, res ) => { 
  const selectQuery = `SELECT IFNULL( SUM(amount), 0 ) AS total FROM account WHERE type="income" AND DATE(date) = CURDATE();`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) return res.status( 500 ).json({ error: "Database selection failed" });
    return res.status( 200 ).json({ result: result[ 0 ], success: true });
  })
});

/**
* MARK: ALL ACCOUNTS
*/
app.post( '/accounts', ( request, res ) => { 
  const selectQuery = `SELECT account.*, users.name, users.profile from account JOIN users ON account.userId = users.id ORDER BY account.date DESC;`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) return res.status( 500 ).json({ error: "Database selection failed" });
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
* MARK: ALL PAYROLLS
*/
app.post( '/all-payrolls', ( request, res ) => { 
  const selectQuery = `SELECT account.*, users.name, users.profile FROM account JOIN users ON account.userId = users.id WHERE type="expenses" AND purpose="payroll" ORDER BY account.date DESC;`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) return res.status( 500 ).json({ error: "Database selection failed" });
    return res.status( 200 ).json({ result, success: true });
  })
});

/**
* MARK: ALL FEES
*/
app.post( '/all-fees', ( request, res ) => { 
  const selectQuery = `SELECT account.*, users.name, users.profile FROM account JOIN users ON account.userId = users.id WHERE type="income" AND purpose="fees" ORDER BY account.date DESC;`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) return res.status( 500 ).json({ error: "Database selection failed" });
    return res.status( 200 ).json({ result, success: true });
  })
});