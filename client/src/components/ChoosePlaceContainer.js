import { connect } from 'react-redux'
import { initData, turnModal, testStart } from '../actions/action'
import ChoosePlace from "./ChoosePlace";


let mapStateToProps = state => ({
  places: state.places,
  modale: state.modale
})

let mapDispatchToProps = dispatch => ({
  initData: (data) => dispatch(initData(data)),
  turnModal: (status, id) => dispatch(turnModal(status, id)),
  testStart: (socket) => dispatch(testStart(socket))
})

const ChoosePlaceContainer = connect(mapStateToProps, mapDispatchToProps)(ChoosePlace)

export default ChoosePlaceContainer