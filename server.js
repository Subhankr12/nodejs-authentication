const express = require("express");
const port = 5500;
const app = express();
const mongoose = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);
//extract styles and scripts from sub pages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// use express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) console.log(`Error running the server: ${err}`);

  console.log(`Server is up and running on port: ${port}`);
});
