const express = require("express");
const app = express();
const port = 3000;
//Middleware section
//include the method-override package
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
const productsController = require("./controllers/products.js");
app.use("/mongoose_store", productsController);
const mongoose = require("mongoose");
const db = mongoose.connection;
// const session = require("express-session");

app.listen(3000, () => {
  console.log("I am listening");
});

// app.use(
//   session({
//     secret: "feedmeseymour", //a random string do not copy this value or your stuff will get hacked
//     resave: false,
//     saveUninitialized: false
//   })
// );
//check mongo connection with crud connection
mongoose.connect("mongodb://localhost:27017/basiccrud", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});
