import {
  DELETE_GARAGE
} from '../actions/Types'

const initialState = {deleted: false}

const deleted = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_GARAGE:
      return {...state, deleted: true}
    default:
      return state
  }
}

export default deleted
