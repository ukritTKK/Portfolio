const userReducer = (state = {
  username: '',
  password: '',
  repassword: '',
  mobile: '',
  email: '',
  canlog: false,
  text: '',
  payment: false,
  loading: true
}, action) => {
  switch (action.type) {
    case 'INPUTLOGIN':
      state = {
        ...state,
        username: action.Upayload,
        password: action.Ppayload,
        text: action.payload
      }
      break
    case 'INPUTREGIS':
      state = {
        ...state,
        username: action.Upayload,
        password: action.Ppayload,
        repassword: action.RPpayload,
        mobile: action.Mpayload
      }
      break
    case 'GOOGLELOGIN':
      state = {
        ...state,
        text: action.payload
      }
      break
    case 'FACELOGIN':
      state = {
        ...state,
        text: action.payload
      }
      break
    case 'TWITTERLOGIN':
      state = {
        ...state,
        text: action.payload
      }
      break
    case 'FIRELOGIN':
      state = {
        ...state,
        text: action.payload
      }
      break
    case 'FIREREGIS':
      state = {
        ...state,
        text: action.payload
      }
      break
    case 'CANLOG': {
      state = {
        ...state,
        username: action.Upayload,
        loading: action.Lpayload
      }
    }
      break
    case 'CANNOTLOG':
      state = {
        ...state,
        username: action.Upayload,
        loading: action.payload
      }
      break
    case 'CANREG':
      state = {
        ...state,
        username: action.Upayload,
        text: action.payload
      }
      break
    case 'LOGOUT':
      state = {
        ...state,
        text: action.payload
      }
      break
    case 'PAYMENT': {
      state = {
        ...state,
        payment: action.Ppayload,
        text: action.payload
      }
    }
      break
    default :
      break
  }
  return state
}
export default userReducer
