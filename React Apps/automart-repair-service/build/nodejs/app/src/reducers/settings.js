const settings = (state = {
  firstname: '',
  lastname: '',
  email: '',
  mobile: '',
  text: '',
  file: '',
  imagePreviewUrl: '',
  default: true
}, action) => {
  switch (action.type) {
    case 'INPUTSET' :
      state = {
        ...state,
        firstname: action.Fpayload,
        lastname: action.Lpayload,
        email: action.Epayload,
        mobile: action.Mpayload,
        text: action.payload
      }
      break
    case 'GETSETTING' :
      state = {
        ...state,
        firstname: action.Fpayload,
        lastname: action.Lpayload,
        email: action.Epayload,
        mobile: action.Mpayload,
        text: action.payload
      }
      break
    case 'GETSETFAIL' :
      state = {
        ...state,
        text: action.payload
      }
      break
    case 'SETFAIL' :
      state = {
        ...state,
        text: action.payload
      }
      break
    case 'SETIMAGE' :
      state = {
        ...state,
        file: action.Fpayload,
        default: action.default,
        imagePreviewUrl: action.Rpayload
      }
      break
    case 'LOADIMAGE' :
      state = {
        ...state,
        imagePreviewUrl: action.Rpayload
      }
      break
    case 'SENDSETTING':
      state = {
        ...state,
        text: action.payload
      }
      break
    case 'SETTING ':
      state = {
        ...state,
        text: action.payload
      }
      break
    default :
      break
  }
  return state
}
export default settings
