import express from 'express'
import session from 'express-session'
import bodyParser from "body-parser"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { con } from './database.js'
// import api from './api.js'

const app = express();
const port = process.env.PORT || 5000;

app.use( express.json() );
app.use( cookieParser() );
app.use( bodyParser.json() ); // for parsing application/json
app.use( cors({
  origin: 'http://localhost:3000', // Replace with your React app's URL
  methods: [ 'POST', 'GET' ],
  credentials: true // Allow credentials (cookies)
}) );

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

/**
 * MARK: User Insert Query
 */
app.post('/insert-user', (req, res) => {
  const { name, email, password, contact, address, gender, role, profile = null } = req.body
  const insertQuery = 'INSERT INTO users (name, email, password, contact, address, gender, role, profile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  con.query( insertQuery, [ name, email, password, contact, address, gender, role, profile ], ( error, result ) => {
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
      console.log( error, 'select error' )
      return res.status( 500 ).json({ isError: true, success: false, message: "Something went wrong. Please Try again." });
    }
    if( result.length <= 0 ) {
      con.query( insertQuery, [ userId, from, to, type, description ], ( error, result ) => {
        if ( error ) {
          console.log( error, 'insert error' )
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
* MARK: Users By API
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
  const { appliedOnDate } = req.body
  const selectQuery = `SELECT * FROM \`leave\` INNER JOIN \`users\` ON \`leave\`.userId=\`users\`.id WHERE DATE(appliedOn)=DATE(FROM_UNIXTIME(${ appliedOnDate / 1000 }))`
  console.log( selectQuery )
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
  })
});