// DEPENDENCIES
const express = require("express");
const app = express();
const port = 3000;
//Middleware section
//include the method-override package
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const horsesController = require("./controllers/horses.js");
app.use("/horses", horsesController);
const userController = require("./controllers/users.js");
app.use("/users", userController);
const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);
const session = require("express-session");

const mongoose = require("mongoose");
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: "Finnegan",
    resave: false,
    saveUninitialized: false
  })
);

app.listen(PORT, () => console.log("Listening on port:", PORT));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

///session data
app.use(
  session({
    secret: "finnegan", //some random string
    resave: false,
    saveUninitialized: false
  })
);
//check mongo connection
// mongoose.connect("mongodb://localhost:27017/frazierfarmhorses", {
//   useNewUrlParser: true
// });
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/frazierfarmhorses";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
  console.log("connected to mongo database");
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
