const mongoose = require("mongoose");

const horseschema = new mongoose.Schema({
  name: { type: String, required: true },
  nickname: { type: String },
  ownername: { type: String },
  ownernickname: { type: String },
  gender: { type: String },
  age: { type: String },
  breed: { type: String },
  color: { type: String },
  height: { type: String },
  img: { type: String },
  supplements: { type: String },
  forSale: { type: Boolean },
  price: { type: Number }
});

const horses = mongoose.model("horses", horseschema);

module.exports = horses;
