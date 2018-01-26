import ajax from './ajax'

import {
  GET_CARS,
  GET_CAR_ID,
  ADD_CAR,
  EDIT_CAR,
  EDIT_CAR_SUCCESS,
  DELETE_CAR
} from './Types'

export const getCars = (token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: GET_CARS,
      failure: ''
    }
    ajax.get('/api/car', token, state, dispatch)
  }
}

export const getOnceCar = (id, token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: GET_CAR_ID,
      failure: ''
    }
    ajax.get('/api/car/' + id, token, state, dispatch)
  }
}

export const addCar = (formData, token) => {
  return function (dispatch) {
    let state = {
      request: ADD_CAR,
      success: EDIT_CAR_SUCCESS,
      failure: ''
    }

    ajax.post('/api/car', token, formData, state, dispatch)
  }
}

export const editCar = (id, carbrand, carmodel, caryear, userid, token) => {
  return function (dispatch) {
    let state = {
      request: EDIT_CAR,
      success: EDIT_CAR_SUCCESS,
      failure: ''
    }

    let data = {
      car_brand: carbrand,
      car_model: carmodel,
      car_year: caryear
    }
    ajax.put('/api/admins/car/' + id, token, data, state, dispatch)
  }
}

export const editCarImage = (data, token) => {
  return function (dispatch) {
    let id = data.get('id')

    let state = {
      request: '',
      success: EDIT_CAR,
      failure: ''
    }
    ajax.put('/api/carImg/' + id, token, data, state, dispatch)
  }
}

export const deleteCar = (id, token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: DELETE_CAR,
      failure: ''
    }

    ajax.delete('/api/car/' + id, token, state, dispatch)
  }
}
