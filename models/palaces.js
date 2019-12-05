const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeScheme = new Schema(
  { _id: String, userName: String, userEmail: String, status: String }
);
module.exports = mongoose.model("Place", placeScheme);



// const place = new Place({
//   _id: "5",
//   userName: "pel",
//   userEmail: 'dfdsf@gmail.com',
//   status: 'false'
// });

// Place.updateOne({ _id: place._id }, place, function (err, place) {
//   if (err) return console.log(err);
//   console.log('succes' + place)
// });