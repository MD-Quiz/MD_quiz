const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');
const DB = new Sequelize('postgres://BBSCorp:lakers24~@mymdquizdb.cwyegj8iv25h.us-west-1.rds.amazonaws.com/MD_Quiz_DB');
const loginCheck = require('./controllers/loginCheck.js');
const UserResponseController = require('./controllers/userResponseController');
// Verifying our DB connection
DB.authenticate()
  .then(function (err) {
    console.log('Connection to DB has been established');
  })
  .catch(function (err) {
    console.log('Unable to connect to DB ', err);
  });
//require middleware which checks database to see if user was inputted
//var checkUser = require('./src/middleware.js')

// Constants
const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../')));

// The root route serves the main html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'main.html'));
});

// Post requests to the login route validates email and password
// DB should return:
// 1) If Admin flag
// 2) 3 questions
// 3) Error if doesn't match
// 4) First login flag
app.post('/login', function (req, res) {
  res.statusCode = 200;
  res.send(JSON.stringify({results: {isAdmin: false, firstLogin: false, dailyQuestions: [{questionid: 5,
  question: "what is brendan's favorite food?",
  a: 'A) cat',
  b: 'B) dog',
  c: 'C) pazookie',
  d: 'D) fish',
  e: 'E) pizza',
  answer: 'A',
  reason: 'Brendan is what he eats ;)',
},
  { questionid: 8,
  question: 'How Savage is Sandra?',
  a: 'A)More than Rhianna',
  b: 'B)More then Brendan',
  c: 'C)More Than Will',
  d: 'D)All of the Above',
  e: 'null',
  answer: 'D',
  reason: 'Sandra is the most savage of them all' },
  { questionid: 10,
  question: 'Who is the gingerbread man?',
  a: 'A)Alex Patch',
  b: 'B)Will Sentance',
  c: 'C)Brendan',
  d: 'D)Bryan',
  e: 'E)Alex Petch',
  answer: 'A',
  reason: 'Because he is a ginger' }], email: 'sandra@hi.com' } }));
//   app.post('/login',
//   loginCheck.validUser,
//   loginCheck.isAdmin,
//   loginCheck.firstLogin,
//   loginCheck.getQuestions,
// function(req, res) {
// // expecting email and password in req.body
// // will run this through middleware once db is setup
// // res.send({'email':'test@email.com','password':'admin'});
//   res.send(JSON.stringify(req.results));
});

// Post requests to change password changes user's pw in the db
app.post('/changePassword', function (req, res) {
// client needs to send user's email to find their entry in the db
// find entry in the db and update pw
});

// Get requests to results will return user or admin data
app.get('/results', function (req, res) {

});

app.post('/userResponse', UserResponseController.addResults , function(req, res) {
  res.send('Successful post request!');
});

// For all other requests, serve main html page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/', 'main.html'));
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

module.exports = app;

// OLD BOILER PLATE FOR WEBPACK IMPROVEMENTS

// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const config = require('../webpack.config');

// app.get('/app.js', (req, res) => {
//   if (process.env.PRODUCTION) {
//     res.sendFile(__dirname + '/build/build.js');
//   } else {
//     res.redirect('//localhost:9090/build/build.js');
//   }
// });

// Serve aggregate stylesheet depending on environment
// NEED TO UPDATE WHEN WE HAVE STYLES
// app.get('/style.css', (req, res) => {
//   if (process.env.PRODUCTION) {
//     res.sendFile(__dirname + '/client/style.css');
//   } else {
//     res.redirect('//localhost:9090/client/style.css');
//   }
// });

// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   noInfo: true,
//   historyApiFallback: true,
// }).listen(9090, 'localhost', (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('webpack i think');
// });
