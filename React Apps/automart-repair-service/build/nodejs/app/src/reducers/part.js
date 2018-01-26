import {
  GET_PARTS,
  SEARCH,
  GET_PARTS_ID,
  EDIT_PART_SUCCESS,
  DELETE_PART,
  ADD_PART_TO_GARAGE_SUCCESS,
  DELETE_PART_FROM_GARAGE_SUCCESS,
  GET_PART_FAIL
} from '../actions/Types'

const initialState = {
  data: [],
  value: '',
  parts: [],
  part: {},
  deleted: false,
  success: false
}

const parts = (state = initialState, action) => {
  switch (action.type) {
    case GET_PARTS:
      return {...state, data: action.payload, deleted: false, success: false}
    case GET_PARTS_ID:
      return {...state, part: action.payload}
    case EDIT_PART_SUCCESS:
      return {...state, success: true}
    case DELETE_PART:
      return {...state, deleted: true}
    case GET_PART_FAIL:
      console.error(action.payload)
      return state
    case ADD_PART_TO_GARAGE_SUCCESS:
    case DELETE_PART_FROM_GARAGE_SUCCESS:
      return {...state, deleted: true}
    case SEARCH:
      const value = action.payload
      const parts = state.data.filter((data) => {
        if (value === '') {
          return state.data
        } else {
          return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
      })
      return {...state, parts, value}
    default:
      return state
  }
}

export default parts
