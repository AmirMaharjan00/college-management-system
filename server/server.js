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
 * MARK: Insert Query
 */
app.post('/insert', (req, res) => {
  const { name, email, password, contactNumber, address, gender } = req.body
  const insertQuery = 'INSERT INTO users (name, email, password, contact_number, address, gender) VALUES (?, ?, ?, ?, ?, ?)'
  con.query( insertQuery, [ name, email, password, contactNumber, address, gender ], ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database insertion failed" });
    }
    return res.status( 200 ).json({ message: "Data inserted successfully!", id: result.insertId, success: true });
  })
});

/**
* MARK: Select Query
*/
app.post('/select', (req, res) => {
  const { username, password } = req.body
  const selectQuery = `SELECT * FROM users WHERE email='${username}' AND password='${password}'`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
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
      request.session.name = result[ 0 ].name
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
  const { isLoggedIn, name } = request.session;
  return res.json({ isLoggedIn, name })
});

/**
* MARK: Users API
*/
app.post( '/users', ( request, res ) => { 
  const selectQuery = `SELECT * FROM users`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      return res.status( 500 ).json({ error: "Database selection failed" });
    }
    return res.status( 200 ).json({ result, success: true });
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