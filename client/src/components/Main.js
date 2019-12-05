import React from "react";
import { connect } from 'react-redux'
import { loadInitialDataSocket, turnModal, choosePlace, placeChanged } from '../actions/action'
import io from "socket.io-client"
import Home from "./Modal";
let socket;
let mapStateToProps = state => ({
  places: state.places,
  modale: state.modale,
  items: state.items
})
export class Main extends React.Component {
  constructor(props) {
    super(props)

    const { dispatch } = this.props;
    socket = io.connect("http://localhost:7000")
    dispatch(loadInitialDataSocket(socket))

    socket.on('selected place', (res) => {
      if (res == 'to late') {
        alert('Tooooo late')
      }
      dispatch(placeChanged(res))
    })
  }
  test = (email, name, selectedPlace) => {
    const { dispatch } = this.props;

    dispatch(choosePlace(socket, email, name, selectedPlace))
    dispatch(turnModal(false))
  };
  componentWillUnmount() {
    socket.disconnect()
    alert("Disconnecting Socket as component will unmount")
  }
  render() {
    const { dispatch, items } = this.props;
    return (
      <div>
        {
          items.map((el, i) => {
            return (
              (el[i + 1] == "true") ? <button key={i} id={i + 1} onClick={(e) => dispatch(turnModal(true, e.target.id))}>{i + 1}</button>
                :
                <button key={this.date} id={i + 1} disabled >{i + 1}</button>
            )
          })
        }
        <Home test={this.test} />
      </div>
    );
  }
}
export default connect(mapStateToProps)(Main)
