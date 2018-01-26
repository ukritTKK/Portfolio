// import {
//   GET_MECHANICS,
//   GET_MECHANICS_FAIL,
//   EDIT_MECHANIC,
//   EDIT_MECHANIC_SUCCESS,
//   EDIT_MECHANIC_FAIL,
//   GET_MECHANICS_ID,
//   SEARCH,
//   BANNED_USER
// } from '../actions/Types'

// const initialState = {
//   data: [],
//   mechanic: {},
//   value: '',
//   mechanics: [],
//   success: false
// }

// const mechanic = (state = initialState, action) => {
//   let nextState = Object.assign({}, state)
//   switch (action.type) {
//     case GET_MECHANICS:
//       nextState.data = action.payload
//       nextState.mechanic = {}
//       nextState.banstatus = 1
//       nextState.success = false
//       return nextState
//     case GET_MECHANICS_ID:
//       return {...state, mechanic: action.payload}
//     case EDIT_MECHANIC_SUCCESS:
//       return {...state, success: true}
//     case SEARCH:
//       let value = action.payload
//       const mechanics = state.data.filter((data) => {
//         if (value === '') {
//           return state.data
//         } else {
//           return data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
//         }
//       })
//       return {...state, mechanics, value}
//     case EDIT_MECHANIC:
//     case BANNED_USER:
//       return state
//     case EDIT_MECHANIC_FAIL:
//     case GET_MECHANICS_FAIL:
//       console.error(action.payload)
//       return state
//     case 'REGISMECH' : {
//       state = {
//         ...state,
//         text: action.payload
//       }
//     }
//       break
//     default:
//       return state
//   }
// }

// export default mechanic
const mechanic = (state = {
  showModal: false,
  isMatched: false,
  userFirstName: '',
  userLastName: '',
  mobileNum: '',
  text: '',
  userOrder: '',
  matchedPickupLat: 0,
  matchedPickupLng: 0,
  mechStatus: '',
  orderName: '',
  orderQty: 0,
  contentList: [],
  catalogue: [],
  firebaseCatalogue: [],
  sumPrice: 0,
  offeredQuot: false,
  customerPhotoURL: '',
  isResetPositionClick: false

}, action) => {
  switch (action.type) {
    case 'REGISMECH' : {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'LOGINMECH' : {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'MECHACCEPT' : {
      state = {
        ...state,
        text: action.payload,
        showModal: false,
        isMatched: action.Spayload,
        userFirstName: action.payload_user_fn,
        userLastName: action.payload_user_ln,
        mobileNum: action.payload_user_mn
      }
    }
      break
    case 'MECHCANCEL' : {
      state = {
        ...state,
        text: action.payload,
        showModal: false,
        isMatched: false
      }
    }
      break
    case 'MECHMODAL' : {
      state = {
        ...state,
        text: action.payload,
        showModal: true
      }
    }
      break
    case 'OPENMODAL' : {
      state = {
        ...state,
        text: action.payload,
        showModal: action.Spayload
      }
    }
      break
    case 'CLOSEMODAL' : {
      state = {
        ...state,
        text: action.payload,
        showModal: action.Spayload
      }
    }
      break
    case 'MECHPOSITION' : {
      state = {
        ...state,
        text: action.payload,
        MechLat: action.payload,
        MechLng: action.payload2
      }
    }
      break
    case 'MECHGETPICKUP' : {
      state = {
        ...state,
        text: action.payload,
        matchedPickupLat: action.payload_lat,
        matchedPickupLng: action.payload_lng
      }
    }
      break
    case 'MECHSETACTIVE' : {
      state = {
        ...state,
        text: action.payload,
        mechStatus: action.payload_status
      }
    }
      break
    case 'INPUTCHANGED': {
      state = {
        ...state,
        text: action.payload,
        orderName: action.payload_orderName,
        orderQty: action.payload_orderQty
      }
    }
      break
    case 'ADDITEMTOLIST': {
      state = {
        ...state,
        text: action.payload,
        contentList: action.payload_list,
        sumPrice: action.payload_sumPrice
      }
    }
      break
    case 'REMOVEITEMFROMLIST': {
      state = {
        ...state,
        text: action.payload,
        contentList: action.payload_list,
        sumPrice: action.payload_sumPrice
      }
    }
      break
    case 'SETCATALOGUECOMPONENT': {
      state = {
        ...state,
        text: action.payload,
        catalogue: action.payload_arr
      }
    }
      break
    case 'GETUSERORDER': {
      state = {
        ...state,
        text: action.payload,
        userOrder: action.payload_order
      }
    }
      break
    case 'OFFERCLICK': {
      state = {
        ...state,
        text: action.payload,
        offeredQuot: action.payload_offered
      }
    }
      break
    case 'GETCATFROMFIREBASE': {
      state = {
        ...state,
        text: action.payload,
        firebaseCatalogue: action.payload_fb_cata
      }
    }
      break
    case 'CHECKQUOT': {
      state = {
        ...state,
        text: action.payload,
        offeredQuot: action.payload_bool
      }
    }
      break
    case 'GETCUSTOMERPHOTO': {
      state = {
        ...state,
        text: action.payload,
        customerPhotoURL: action.payload2
      }
    }
      break
    case 'RESETORDERNAME': {
      state = {
        ...state,
        text: action.payload,
        orderName: action.payload2
      }
    }
      break
    case 'MECHSETCURRENTLATLNGTOFIREBASE': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'RESETPOSCLICK': {
      state = {
        ...state,
        text: action.payload,
        isResetPositionClick: action.payload2
      }
    }
      break
    case 'RESETFINDPOSBTN': {
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
export default mechanic
