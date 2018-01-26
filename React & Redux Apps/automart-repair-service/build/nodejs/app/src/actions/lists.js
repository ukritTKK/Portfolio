import {
  SEARCH
} from './Types'

export const search = (val) => {
  return function (dispatch) {
    dispatch({
      type: SEARCH,
      payload: val
    })
  }
}
