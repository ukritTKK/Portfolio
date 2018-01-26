const header = (state = {
  appText: '',
  time: '',
  userStatus: '',
  fabButtonString: '',
  isOfferedQuot: false,
  isResetPosClick: false,
  CallerID: ''

}, action) => {
  switch (action.type) {
    case 'HEADERACTION': {
      state = {
        ...state,
        text: action.payload,
        appText: action.payload2
        // time: (new Date).getTime()
      }
    }
      break
    case 'CHECKPATH': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'SETUSERSTATUS': {
      state = {
        ...state,
        text: action.payload,
        userStatus: action.payload2
      }
    }
      break
    case 'SETQUOTOFFEREDBOOL': {
      state = {
        ...state,
        text: action.payload,
        isOfferedQuot: action.payload2
      }
    }
      break
    // case 'RESETPOSCLICK': {
    //   state = {
    //     ...state,
    //     text: action.payload,
    //     isResetPosClick: action.payload2
    //   }
    // }
    //   break
    case 'SETFABSTRING': {
      state = {
        ...state,
        text: action.payload,
        fabButtonString: action.payload2
      }
    }
      break
    case 'USERCLICKCANCEL': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'USERRESETPOSITIONCLICK': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'MECHRESETPOSITIONCLICK': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'LOGOUTCLICK': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'USERVIEWQUOTCLICK': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'SETCALLERID': {
      state = {
        ...state,
        text: action.payload,
        CallerID: action.payload2
      }
    }
      break
    case 'MECHCREATEQUOTCLICK': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'MECHEDITQUOTCLICK': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'NOTDROPDOWNCONTENTCLICK': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'DROPDOWNCLICK': {
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

export default header
