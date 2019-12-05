import React, { useEffect } from 'react';
import openSocket from 'socket.io-client';
import { Home } from './Modal';


const ChoosePlace = (props) => {
  const socket = openSocket('http://localhost:7000');

  props.testStart(socket)

  // socket.emit('first conn', 'Jhon')
  // socket.on('first conn', function (msg) {
  //   props.getDb(msg)
  //   console.log(msg)
  // })
  //   props.initData(initData)

  //   socket.emit('chose place', function (msg) {


  //     console.log(msg)
  //   })


  // })
  socket.on('first conn', function (msg) {
    props.getDb(msg)
    console.log(msg)
  })

  const choosePlace = (e) => {
    props.turnModal(true, e.target.id)
  }

  const test = (email, name, selectedPlace) => {
    socket.emit('chose place', { email, name, selectedPlace })

    socket.on('chose place', function (msg) {
      props.getDb(msg)
      console.log(msg)
    })
    props.turnModal(false)
  };


  return (
    <div>
      <div className="App">
        <p className="App-intro">
          hi
      </p>

        {
          props.places.map((el, i) => {
            // {el[i + 1]}
            console.log(el[i + 1] + 'el')
            return (

              (el[i + 1] == "true") ? <button id={i + 1} onClick={(e) => choosePlace(e)}>{i + 1}</button>
                :
                <button id={i + 1} onClick={(e) => choosePlace(e)} disabled >{i + 1}</button>
            )
          })
        }
        <Home test={test} />
      </div>
    </div>
  )
};

export default ChoosePlace

