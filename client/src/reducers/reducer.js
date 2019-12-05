import {
  TURN_MODAL,
  WRITE_TEXT,
  INITIAL_ITEMS,
  PLACE_CHANGED
} from '../actions/action';

const initState = {
  modale: false,
  selectedPlace: null,
  email: '',
  name: '',
  items: []
};
const reducer = (state = initState, { type, payload, field }) => {
  switch (type) {
    case INITIAL_ITEMS:
      return {
        ...state,
        items: payload
      }
    case PLACE_CHANGED:
      return {
        ...state,
        items: state.items.map(item => {
          if (item[payload]) {
            return item[payload] = false
          } else return item
        })
      }
    case TURN_MODAL:
      return {
        ...state,
        modale: payload.status,
        selectedPlace: payload.id
      }

    case WRITE_TEXT:
      return {
        ...state,
        [field]: payload
      };

    default:
      return state
  }
};

export default reducer