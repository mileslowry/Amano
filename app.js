const createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  expressSession = require("express-session"),
  connectFlash = require("connect-flash"),
  passport = require("passport"),
  methodOverride = require("method-override");
  passportLocalMongoose = require("passport-local-mongoose"),
  logger = require('morgan'),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  User = require("./models/User"),
  Routes = require("./routes/index");

mongoose.connect(
  "mongodb+srv://mileslowry:testpassword@ml-cluster1.hks6n.mongodb.net/amano?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
);


const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

app.use(cookieParser("dev_code"));
app.use(
  expressSession({
    secret: "dev_code",
    cookie: {
      maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
//res.locals.flashMessages = req.flash();
  next();
});

app.use('/', Routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
