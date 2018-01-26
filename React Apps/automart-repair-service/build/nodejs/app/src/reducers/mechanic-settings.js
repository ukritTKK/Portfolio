const mechanicSettings = (state = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  file: '',
  imageFileName: 'No image chosen',
  imagePreviewUrl: '',
  default: true
}, action) => {
  switch (action.type) {
    case 'SETIMAGEFILENAME': {
      state = {
        ...state,
        text: action.payload,
        imageFileName: action.payload2
      }
    }
      break
    case 'GETMECHSETTINGS': {
      state = {
        ...state,
        text: action.payload,
        firstName: action.payload2,
        lastName: action.payload3,
        email: action.payload4,
        mobile: action.payload5
      }
    }
      break
    case 'LOADMECHPREVIEWIMAGE': {
      state = {
        ...state,
        text: action.payload,
        imagePreviewUrl: action.payload2
      }
    }
      break
    case 'SETMECHIMAGE': {
      state = {
        ...state,
        text: action.payload,
        file: action.payload2,
        imagePreviewUrl: action.payload3,
        default: action.default
      }
    }
      break
    case 'EDITMECHSETTINGS': {
      state = {
        ...state,
        text: action.payload,
        firstName: action.payload2,
        lastName: action.payload3,
        email: action.payload4,
        mobile: action.payload5
      }
    }
      break
    case 'SUBMITMECHSETTINGS': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'UPLOADMECHIMAGE': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break

    default :
      break
  }
  return state
}
export default mechanicSettings
