import {
  LOGIN,
  REGISTER,
  LOGOUT,
  FAIL_LOGIN,
  GET_MECHANIC_PROFILE_SUCCESS,
  EDIT_MECHANIC_PROFILE_SUCCESS,
  EDIT_GARAGE_PROFILE_SUCCESS,
  GET_GARAGE_PROFILE_SUCCESS,
  BAN_LOGIN
} from '../actions/Types'

const initialState = {
  type: '',
  error: '',
  profile: {}
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, type: action.payload}
    case FAIL_LOGIN:
      return {...state, error: 'User is Unauthorized'}
    case BAN_LOGIN:
      return {...state, error: 'Banned by admin'}
    case GET_MECHANIC_PROFILE_SUCCESS:
    case GET_GARAGE_PROFILE_SUCCESS:
      return {...state, profile: action.payload[0]}
    case EDIT_MECHANIC_PROFILE_SUCCESS:
    case EDIT_GARAGE_PROFILE_SUCCESS:
      alert('Edit Profile Success')
      return state
    case REGISTER:
      return {}
    case LOGOUT:
      return {...state, authenticated: false}
    default:
      return state
  }
}

export default users
