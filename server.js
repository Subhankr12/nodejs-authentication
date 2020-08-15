const express = require("express");
const app = express();
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");

//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();
const port = process.env.PORT;

// middleware
app.use(express.urlencoded());
app.use(expressLayouts);

//extract styles and scripts from sub pages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in db
app.use(
  session({
    name: "nodejs-authentication",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      (err) => {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

// for passport session
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) console.log(`Error running the server: ${err}`);

  console.log(`Server is up and running on port: ${port}`);
});
