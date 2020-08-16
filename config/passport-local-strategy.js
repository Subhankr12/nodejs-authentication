const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");

//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      // find a user and establish the identity
      User.findOne({ email: email }, async (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user || !(await bcrypt.compare(password, user.password))) {
          req.flash("error", "Invalid Email/Password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserializing the user from the key in cookies
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("Error in finding user ---> Passport");
      return done(err);
    }

    return done(null, user);
  });
});

// check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  // if the user is logged in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/login");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in user from the session cookie and we are sending this to the locals for the view
    // console.log(req.user);
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
