const payment = (state = {
  name: '',
  num: '',
  expM: '',
  expY: '',
  cvv: '',
  data: [],
  text: ''

}, action) => {
  switch (action.type) {
    case 'PAYMENT' :
      state = {
        ...state,
        data: action.Dpayload,
        text: action.payload
      }
      break
    case 'INPUTPAYMENT' : {
      state = {
        ...state,
        name: action.NApayload,
        num: action.NUpayload,
        expM: action.Mpayload,
        expY: action.Ypayload,
        cvv: action.Cpayload,
        text: action.payload
      }
    }
      break
    case 'GETPAYMENT' :
      state = {
        ...state,
        data: action.Dpayload,
        text: action.payload
      }
      break
    case 'DELETEPAYMENT' :
      state = {
        ...state,
        data: action.Dpayload,
        text: action.payload
      }
      break

    default :
      break
  }
  return state
}
export default payment
