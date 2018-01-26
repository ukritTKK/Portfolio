const map = (state = {
  lat: 0,
  lng: 0,
  ShowModal: false,
  distance: [],
  text: '',
  output: '',
  isMatched: false,
  mechName: '',
  mechPerks: '',
  mechRating: '',
  mechCarModel: '',
  mechPlateNum: '',
  mechGarageName: '',
  mechGarageOpen: '',
  mechGarageClose: '',
  showServiceSelectModal: false,
  serviceType: '',
  offeredQuot: false,
  catalogue: [],
  firebaseCatalogue: [],
  cards: [],
  firebaseCards: [],
  paymentProcess: false,
  paymentComplete: false,
  givenRating: 0,
  isResetPosClick: false,
  acceptQuotClick: false,
  mechanicPhotoURL: '',
  selectedCardID: '',
  isResetPositionClick: false

}, action) => {
  switch (action.type) {
    case 'SETLOCATION' :
      state = {
        ...state,
        lat: action.paylat,
        lng: action.paylng
      }
      break
    case 'OPENMODAL' :
      state = {
        ...state,
        ShowModal: action.Spayload,
        text: action.payload
      }
      break
    case 'CLOSEMODAL' : {
      state = {
        ...state,
        ShowModal: action.Spayload,
        showServiceSelectModal: action.Mpayload,
        text: action.payload
      }
    }
      break
    case 'GETMECHANIC' : {
      state = {
        ...state,
        distance: action.Dpayload,
        text: action.payload
      }
    }
      break
    case 'MECHAVA' : {
      state = {
        ...state,
        output: action.Opayload,
        mechid: action.Mpayload,
        isMatched: true,
        text: action.payload
      }
    }
      break
    case 'LOADING' : {
      state = {
        ...state,
        output: action.Opayload,
        isMatched: false,
        text: action.payload
      }
    }
      break
    case 'NOMECHAVA' : {
      state = {
        ...state,
        output: action.Opayload,
        isMatched: false,
        text: action.payload
      }
    }
      break
    case 'LOADMECH' : {
      state = {
        ...state,
        number: action.Npayload,
        mechid: action.Mpayload,
        mechName: action.payload3,
        mechRating: action.payload4,
        mechCarModel: action.payload5,
        mechPlateNum: action.payload6,
        mechPerks: action.payload7,
        mechGarageName: action.payload8,
        mechGarageOpen: action.payload9,
        mechGarageClose: action.payload10,
        isMatched: true,
        text: action.payload
      }
    }
      break
    case 'MECHACCEPT': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'OPENSERVICESELECTMODAL': {
      state = {
        ...state,
        text: action.payload,
        ShowModal: action.payload3,
        showServiceSelectModal: action.payload_bool
      }
    }
      break
    case 'CLOSESERVICESELECTMODAL': {
      state = {
        ...state,
        text: action.payload,
        ShowModal: action.payload3,
        showServiceSelectModal: action.payload_bool
      }
    }
      break
    case 'SETSERVICETYPE': {
      state = {
        ...state,
        text: action.payload,
        serviceType: action.payload2
      }
    }
      break
    case 'CHECKCHOSENSERVICE': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'CHECKOFFERED': {
      state = {
        ...state,
        text: action.payload,
        offeredQuot: action.payload_bool
      }
    }
      break
    case 'GETCATFROMFIREBASE': {
      state = {
        ...state,
        text: action.payload,
        firebaseCatalogue: action.payload_firebaseCatalogue
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
    case 'USERACCEPTQUOTCLICK': {
      state = {
        ...state,
        text: action.payload,
        acceptQuotClick: action.payload2
      }
    }
      break
    case 'BACKCLICK': {
      state = {
        ...state,
        text: action.payload,
        acceptQuotClick: action.payload2,
        selectedCardID: action.payload3
      }
    }
      break
    case 'PAYMENTCLICK': {
      state = {
        ...state,
        text: action.payload,
        paymentProcess: action.payload_paymentProcess
      }
    }
      break
    case 'NEXTCLICK': {
      state = {
        ...state,
        text: action.payload,
        paymentComplete: action.payload_completePayment,
        paymentProcess: action.payload_paymentProcess
      }
    }
      break
    case 'GIVENRATING': {
      state = {
        ...state,
        text: action.payload,
        givenRating: action.payload_rating
      }
    }
      break
    case 'FINISHCLICK': {
      state = {
        ...state,
        text: action.payload
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
    case 'RESETVIEWQUOTBTN': {
      state = {
        ...state,
        text: action.payload
      }
    }
      break
    case 'GETMECHANICPHOTO': {
      state = {
        ...state,
        text: action.payload,
        mechanicPhotoURL: action.payload2
      }
    }
      break
    case 'GETCARDSFROMFIREBASE': {
      state = {
        ...state,
        text: action.payload,
        firebaseCards: action.payload2
      }
    }
      break
    case 'SETCARDSCOMPONENT': {
      state = {
        ...state,
        text: action.payload,
        cards: action.payload2
      }
    }
      break
    case 'SELECTCARDCLICK': {
      state = {
        ...state,
        text: action.payload,
        selectedCardID: action.payload2
      }
    }
      break
    case 'SETCURRENTLATLNGTOFIREBASE': {
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

    default :
      break
  }
  return state
}
export default map
