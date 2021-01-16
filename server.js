const express = require('express');
const app = express();
const apiRoutes = require('./Server/routes/api.routes');
const mailerRoute = require('./Server/routes/mailer.route');
const passport = require("passport");
const logger = require("morgan");
const User = require("./Server/models/User");
const LocalStrategy = require("passport-local").Strategy;
const cors = require('cors');
require('./Server/config/db')();

const PORT = process.env.PORT || 5000;

// parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));

app.use(logger('dev'));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//serialize and deserialize users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//authenticate users
passport.use(new LocalStrategy(User.authenticate()));

app.use(cors())

app.use(apiRoutes);
app.use(mailerRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
  });
}

app.listen(PORT, () => {
  console.log('app running on PORT: ' + PORT);
});