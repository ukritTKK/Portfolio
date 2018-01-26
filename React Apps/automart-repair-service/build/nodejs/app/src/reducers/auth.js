import { AUTH_USER } from '../actions/Types'

const initialState = {
  authenticated: false,
  user_id: ''
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: true}
    default:
      return state
  }
}

export default auth
