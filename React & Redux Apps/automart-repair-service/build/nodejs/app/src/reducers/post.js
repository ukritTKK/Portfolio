import {
  ADD_GARAGE
} from '../actions/Types'

const initialState = {}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GARAGE:
      return {}
    default:
      return state
  }
}

export default posts
