const chalk = require('chalk');

console.log();
console.log(chalk.green.bold("================================================================="));
console.log(chalk.green.bold("===================        Nodejs Start        =================="));
console.log(chalk.green.bold("==============                                      ============="));
console.log(chalk.green.bold("================================================================="));
console.log();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const logger = require('morgan');
const cors = require('cors');
/////////Initialize Firebase/////////
const firebase = require('./configs/fb');
const fire = firebase();
/////////////////////////////////////
// add this to render react pages
// for path join and view rendering
const path = require('path');
const pug = require('pug');
// end of add this to render react pages

const config = require(__dirname+'/./configs/env');

const routes = require(__dirname+'/./routes/index');
const admin = require(__dirname+'/./routes/admin');

const apiAdmin = require(__dirname+'/./routes/apiAdmin');
const apiGarage = require(__dirname+'/./routes/apiGarage');
const apiMechanic = require(__dirname+'/./routes/apiMechanic');
const apiUser = require(__dirname+'/./routes/apiUser');
const apiTest = require(__dirname+'/./routes/apiTest');
const apiOmise = require(__dirname+'/./routes/apiOmise');

const User = require('./models/user');




app.use(cors());

// add body-parser package to receive variable from POST with req.body
// set up our express application
app.use(logger('dev')); // log every request to the console
app.use(bodyParser.json()); // add this to get data from json form
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true })); // get information from html forms (url-encoded)
app.use(cookieParser());

// add this to render react pages
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
// end of add this to render react pages

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

//use this code before any route definitions
app.use(passport.initialize());
app.use(passport.session());

let sessionStore = new session.MemoryStore;

/*
app.get('/hello', function (req, res) {
  res.send('Hello World!');
});


//*/
app.use('/', routes);
app.use('/test', apiTest);
app.use('/api', admin);
app.use('/api/admins', apiAdmin);
app.use('/api/garages', apiGarage);
app.use('/api/mechanics', apiMechanic);
app.use('/api/users', apiUser);
app.use('/api/omise', apiOmise);

// add this to render react pages
app.all('*', function(req, res, next) {
  // res.send('hello world!');
  res.render('index');
});



// end of add this to render react pages
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    //res.status(err.status || 500);
    /*res.render('error', {
      message: err.message,
      error: err
    }); //*/
    let obj = {err:err};
    res.status(err.status || 500).json({obj});
  });
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findOne(
        {_id: id},
        '-password',
        function(err, user) {
            done(err, user);
        }
    );
});

app.post('/api/omise', function (req, res) {
  console.log(JSON.stringify(req.body))

  console.log('req.body.name', req.body['name'])
})

let port = 3001;

app.listen(port, function () {
    console.log(chalk.green.bold('Example app listening on port '+port+'!'));
    console.log(chalk.green.bold('================================================================='));
});
