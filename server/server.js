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
 * MARK: Images Insert Query
 */
app.post('/insert-images', (req, res) => {
  const { userId, url } = req.body
  const insertQuery = 'INSERT INTO images (userId, url) VALUES (?, ?)'
  con.query( insertQuery, [ userId, url ], ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ message: "Failed ! Please Try again.", success: false, isError: true });
    }
    return res.status( 200 ).json({ message: "SuccessFully Added.", id: result.insertId, success: true });
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
  const selectQuery = `SELECT role, COUNT(id) AS total FROM users WHERE role IN ('student', 'teacher') GROUP BY role;`
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
  const selectQuery = `SELECT * FROM subjects`
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
  console.log( selectQuery )
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
  const selectQuery = `SELECT booksIssued.*, users.name FROM booksIssued JOIN users ON booksIssued.issuedBy = users.id WHERE booksIssued.status="issued";`
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
  const selectQuery = `SELECT MONTHNAME(dueDate) AS month, SUM(fineAmount) AS totalFines FROM booksIssued WHERE status="overdue" GROUP BY MONTH(dueDate) ORDER BY MONTH(dueDate);`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});