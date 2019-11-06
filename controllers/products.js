const express = require("express");
const router = express.Router();
// const CaptainsLog = require("../models/logs.js");
const Products = require("../models/products.js");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));
const productsSeed = require("../models/seed.js");

// Products.collection.drop();
// Products.create(productsSeed, (err, data) => {
//   if (err) console.log(err.message);
//   console.log("added product data");
// });

//Index
router.get("/", (req, res) => {
  Products.find({}, (error, allProducts) => {
    if (error) {
      res.send(error);
    } else {
      res.render("index.ejs", {
        products: allProducts
      });
    }
  });
});

//New
router.get("/new", (req, res) => {
  res.render("new.ejs", {});
});

//   //edit
router.get("/:id/edit", (req, res) => {
  Products.findById(req.params.id, (err, foundProduct) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit.ejs", {
        product: foundProduct
      });
    }
  });
});

//show
router.get("/:id/", (req, res) => {
  Products.findById(req.params.id, (err, foundProduct) => {
    res.render("show.ejs", { product: foundProduct });
  });
});

router.post("/", (req, res) => {
  Products.create(req.body, (error, createProduct) => {
    if (error) {
      res.send(error);
    } else {
      res.redirect("/mongoose_store");
    }
  });
});

router.put("/:id", (req, res) => {
  let parmId = req.params.id;
  Products.findByIdAndUpdate(req.params.id, req.body, (err, updatedProduct) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/mongoose_store/" + parmId);
    }
  });
});

router.put("/:id/buy", (req, res) => {
  let qty = req.body.qty;
  qty -= 1;
  req.body.qty = qty;
  let parmId = req.params.id;
  Products.findByIdAndUpdate(req.params.id, req.body, (err, updatedProduct) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/mongoose_store/" + parmId);
    }
  });
});

router.delete("/:id", (req, res) => {
  Products.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/mongoose_store");
    }
  });
});

module.exports = router;
