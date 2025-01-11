const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const session = require('express-session');
const con = require( './database' )

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

/**
 * MARK: Session
 */
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  // cookie: { maxAge: 60000 } // session timeout of 60 seconds
}));

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

/**
 * MARK: Login
 */
app.post( '/login', ( request, res ) => {
  const { username, password } = request.body;
  const selectQuery = `SELECT * FROM users WHERE email='${username}' AND password='${password}'`
  con.query( selectQuery, ( error, result ) => {
    if ( error ) {
      console.error("Error selecting data:", error);
      res.send( false )
      // res.status( 200 ).json({ result, success: false });
    }
    request.session.name = result[0].name
    request.session.isLoggedIn = true
    res.send( true )
    // res.status( 200 ).json({ result, success: true });
  });
});

/**
 * MARK: Is logged In
 */
app.post( '/isLoggedIn', ( request, res ) => {
  const isLoggedIn = request.session.isLoggedIn;
  const username = request.session.name;
  console.log( request.session )
  if ( isLoggedIn ) {
    res.status( 200 ).json({ message: 'I am logged in.', success: true });
  } else {
    res.status( 200 ).json({ message: 'I am not logged in.', success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});