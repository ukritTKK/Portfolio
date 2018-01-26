import {
  GET_CARS,
  GET_CAR_ID,
  DELETE_CAR,
  EDIT_CAR_SUCCESS,
  SEARCH
} from '../actions/Types'

const initialState = {
  data: [],
  car: {},
  cars: [],
  deleted: false,
  success: false,
  value: ''
}

const cars = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARS:
      return {...state, data: action.payload, car: {}, deleted: false, success: false}
    case GET_CAR_ID:
      return {...state, car: action.payload}
    case DELETE_CAR:
      return {...state, deleted: true}
    case EDIT_CAR_SUCCESS:
      return {...state, success: true}
    case SEARCH:
      const value = action.payload
      const cars = state.data.filter((data) => {
        if (value === '') {
          return state.data
        } else {
          return data.car_model.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
      })
      return {...state, cars, value}
    default:
      return state
  }
}

export default cars
