const express = require("express");
const router = express.Router();
const Horses = require("../models/horses.js");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));
const horsesSeed = require("../models/seed.js");

//seed the data

router.get("/seed", (req, res) => {
  Horses.collection.drop();
  Horses.create(horsesSeed, (err, data) => {
    if (err) console.log(err.message);
    console.log("added horse data");
  });
});

//Main Page
router.get("/", (req, res) => {
  console.log("in get");
  Horses.find({}, (error, allhorses) => {
    if (error) {
      res.send(error);
    } else {
      res.render("horses/index.ejs", {
        horses: allhorses
      });
    }
  });
});
// Index - daily feed schedule - route
router.get("/daily", (req, res) => {
  console.log("in get");
  Horses.find({}, (error, allhorses) => {
    if (error) {
      res.send(error);
    } else {
      res.render("horses/dailyIndex.ejs", {
        horses: allhorses
      });
    }
  });
});

//New route
router.get("/new", (req, res) => {
  res.render("horses/new.ejs", {});
});

//edit route
router.get("/:id/edit", (req, res) => {
  Horses.findById(req.params.id, (err, foundHorse) => {
    if (err) {
      console.log(err);
    } else {
      res.render("horses/edit.ejs", {
        horse: foundHorse
      });
    }
  });
});

//show route
router.get("/:id/", (req, res) => {
  Horses.findById(req.params.id, (err, foundHorse) => {
    res.render("horses/show.ejs", { horse: foundHorse });
  });
});

// New Post Route
router.post("/", (req, res) => {
  Horses.create(req.body, (error, createHorse) => {
    if (error) {
      res.send(error);
    } else {
      res.redirect("/horses");
    }
  });
});

// Edit put route
router.put("/:id", (req, res) => {
  let parmId = req.params.id;
  Horses.findByIdAndUpdate(req.params.id, req.body, (err, updatedHorse) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/horses/" + parmId);
    }
  });
});

// Delete route
router.delete("/:id", (req, res) => {
  Horses.findByIdAndRemove(req.params.id, (err, deletedHorse) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/horses");
    }
  });
});

module.exports = router;
