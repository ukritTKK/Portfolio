const history = (state = {
  ShowModal: false,
  value: '',
  histories: []

}, action) => {
  switch (action.type) {
    case 'REDUCERTEMPLATE' :
      state = {
        ...state,
        text: action.payload
      }
      break

    case 'TESTST' :
      state = {
        ...state,
        text: action.payload,
        value: action.payload2
      }
      break

    case 'SETHISTORY' :
      state = {
        ...state,
        text: action.payload,
        histories: action.payload2
      }
      break

    default :
      break
  }
  return state
}
export default history
