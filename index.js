const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http')
const socketServer = require('socket.io')
const app = express();
const Place = require('./models/palaces')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/usersdb')

var db = mongoose.connection
db.on('error', () => { console.log('---Gethyl FAILED to connect to mongoose') })
db.once('open', () => {
  console.log('+++Gethyl connected to mongoose')
})

var serve = http.createServer(app);
var io = socketServer(serve);
serve.listen(7000, () => { console.log("+++Gethyl Express Server with Socket Running!!!") })

const connections = [];
io.on('connection', function (socket) {
  console.log("Connected to Socket!!" + socket.id)
  connections.push(socket)
  socket.on('disconnect', function () {
    console.log('Disconnected - ' + socket.id);
  });

  Place.find({}, (err, places) => {
    if (err) {
      console.log("---Gethyl GET failed!!")
    }
    else {
      let copy = []
      copy = places.map((el, i) => {
        let copy = {}
        copy[el.id] = el.status
        return copy
      })
      socket.emit('initialList', copy)
      console.log("+++Gethyl GET worked!!")
    }
  })
  socket.on('select place', async (addData) => {

    const findingPlacee = await Place.findById(addData.selectedPlace, (err, findingPlace) => {
      return findingPlace.status
    });

    if (findingPlacee.status == 'false') {
      socket.emit('selected place', "to late");
    } else {
      const place = new Place({
        _id: addData.selectedPlace,
        userName: addData.name,
        userEmail: addData.email,
        status: 'false'
      });
      Place.updateOne({ _id: addData.selectedPlace }, place, (err, result) => {
        if (err) { console.log("---UPDATE failed!! " + err) }
        else {
          io.emit('selected place', addData.selectedPlace)
          console.log({ message: "+++UPDATE COMPLETE worked!!" })
        }
      })
    }
  })
});



// const place = new Place({

//   status: 'true'
// });
// Place.updateMany({ status: 'false' }, place, (err, result) => {
//   if (err) { console.log("---UPDATE failed!! " + err) }
//   else {
//     console.log({ message: "+++UPDATE COMPLETE worked!!" })
//   }
// }
// )
