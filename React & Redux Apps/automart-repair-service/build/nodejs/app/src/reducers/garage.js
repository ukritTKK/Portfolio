import {
  GET_GARAGE,
  GET_GARAGE_PROFILE_SUCCESS,
  GET_GARAGE_ID,
  DELETE_GARAGE,
  SEARCH,
  EDIT_GARAGE,
  EDIT_GARAGE_SUCCESS,
  EDIT_GARAGE_FAIL
} from '../actions/Types'

const initialState = {
  data: [],
  garage: {},
  garages: [],
  deleted: false,
  success: false,
  value: ''
}

const garage = (state = initialState, action) => {
  switch (action.type) {
    case GET_GARAGE:
      return {...state, data: action.payload, deleted: false, success: false, garage: {}}
    case GET_GARAGE_ID:
      return {...state, garage: action.payload}
    case DELETE_GARAGE:
      return {...state, deleted: true}
    case EDIT_GARAGE:
      return {...state}
    case EDIT_GARAGE_SUCCESS:
      return {...state, success: true}
    case SEARCH:
      let value = action.payload
      const garages = state.data.filter((data) => {
        if (value === '') {
          return state.data
        } else {
          return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
      })
      return {...state, garages, value}
    case EDIT_GARAGE_FAIL:
      console.error(action.payload)
      return state
    case GET_GARAGE_PROFILE_SUCCESS:
      console.log(action.payload)
      return state
    default:
      return state
  }
}

export default garage
