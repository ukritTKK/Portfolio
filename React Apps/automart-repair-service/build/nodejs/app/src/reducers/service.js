import {
  GET_SERVICE,
  GET_SERVICE_BY_ID_SUCCESS,
  GET_SERVICE_FAIL,
  SEARCH
} from '../actions/Types'

const intialState = {
  data: [],
  service: {},
  value: '',
  services: []
}

const service = (state = intialState, action) => {
  let nextState = Object.assign({}, state)
  switch (action.type) {
    case GET_SERVICE:
      return {...state, data: action.payload}
    case SEARCH:
      const value = action.payload
      const services = state.data.filter((data) => {
        if (value === '') {
          return state.data
        } else {
          return data._id.toLowerCase().indexOf(value.toLowerCase()) !== -1
        }
      })
      return {...state, services, value}
    case GET_SERVICE_BY_ID_SUCCESS:
      nextState.service = action.payload
      return nextState
    case GET_SERVICE_FAIL:
      console.error(action.payload)
      return state
    default:
      return state
  }
}

export default service
