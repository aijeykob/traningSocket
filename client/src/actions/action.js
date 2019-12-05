export const INIT_DATA = "INIT_DATA";
export const TURN_MODAL = "TURN_MODAL";
export const WRITE_TEXT = "WRITE_TEXT";
export const INITIAL_ITEMS = "INITIAL_ITEMS";
export const PLACE_CHANGED = "PLACE_CHANGED";

export const initialItems = (res) => ({
  type: INITIAL_ITEMS,
  payload: res
})
export const loadInitialDataSocket = (socket) => dispatch => {
  socket.on('initialList', (res) => {
    dispatch(initialItems(res))
  })
}
export const choosePlace = (socket, email, name, selectedPlace) => dispatch => {
  let postData = {
    email,
    name,
    selectedPlace
  }
  socket.emit('select place', postData)
}

export const placeChanged = (id) => ({
  type: PLACE_CHANGED,
  payload: id
});

export const turnModal = (status, id) => ({
  type: TURN_MODAL,
  payload: { status, id }
});

export const writingText = (text, field) => ({
  type: WRITE_TEXT,
  payload: text, field
});
