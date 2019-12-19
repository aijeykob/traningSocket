const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeScheme = new Schema(
  { _id: String, userName: String, userEmail: String, status: String }
);
module.exports = mongoose.model("Place", placeScheme);