const express = require("express");
const users = express.Router();
const User = require("../models/users.js");

users.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

users.post("/", (req, res) => {
  console.log("in create user");
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    }
    console.log(createdUser);
    res.redirect("/");
  });
});

module.exports = users;
