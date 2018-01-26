import ajax from './ajax'

import {
  ADD_GARAGE,
  EDIT_GARAGE,
  EDIT_GARAGE_SUCCESS,
  EDIT_GARAGE_FAIL,
  EDIT_GARAGE_PROFILE,
  EDIT_GARAGE_PROFILE_SUCCESS,
  EDIT_GARAGE_IMAGE_SUCCESS,
  DELETE_GARAGE,
  GET_GARAGE,
  GET_GARAGE_PROFILE,
  GET_GARAGE_PROFILE_SUCCESS,
  GET_GARAGE_ID
} from './Types'

export const getGarage = (token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: GET_GARAGE,
      failure: ''
    }

    ajax.get('/api/admins/garage', token, state, dispatch)
  }
}

export const addGarage = (formData, token) => {
  return function (dispatch) {
    let state = {
      request: ADD_GARAGE,
      success: EDIT_GARAGE_SUCCESS,
      failure: EDIT_GARAGE_FAIL
    }

    ajax.post('/api/admins/garage', token, formData, state, dispatch)
  }
}

export const getOnceGarage = (id, token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: GET_GARAGE_ID,
      failure: ''
    }

    ajax.get('/api/admins/garage/' + id, token, state, dispatch)
  }
}

export const editGarage = (id, name, tel, rating, address, lat, lng, mechniclist, partlist, token) => {
  return function (dispatch) {
    let state = {
      request: EDIT_GARAGE,
      success: EDIT_GARAGE_SUCCESS,
      failure: EDIT_GARAGE_FAIL
    }

    let data = {
      name: name,
      tel: tel,
      rating: rating,
      address: address,
      address_lat: lat,
      address_lng: lng,
      'mechanic_id_list': mechniclist.filter((mechanic) => mechanic),
      'part_id_list': partlist
    }

    ajax.put('/api/admins/garage/' + id, token, data, state, dispatch)
  }
}

export const editGarageProfile = (formData, token) => {
  return function (dispatch) {
    let state = {
      request: EDIT_GARAGE_PROFILE,
      success: EDIT_GARAGE_PROFILE_SUCCESS,
      failure: ''
    }
    ajax.put('/api/garages/garage/', token, formData, state, dispatch)
  }
}

export const getGarageProfile = (token) => {
  return function (dispatch) {
    let state = {
      request: GET_GARAGE_PROFILE,
      success: GET_GARAGE_PROFILE_SUCCESS,
      failure: ''
    }
    ajax.get('/api/garages/garage', token, state, dispatch)
  }
}

export const editGarageProfileImage = (data, token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: EDIT_GARAGE_IMAGE_SUCCESS,
      failure: ''
    }
    ajax.putImage('/api/garages/garageImg', token, data, state, dispatch)
  }
}

export const editGarageImage = (data, token) => {
  return function (dispatch) {
    let id = data.get('id')

    let state = {
      request: '',
      success: EDIT_GARAGE,
      failure: ''
    }

    ajax.putImage('/api/garageImg/' + id, token, data, state, dispatch)
  }
}

export const deleteGarage = (id, token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: DELETE_GARAGE,
      failure: ''
    }
    ajax.delete('/api/garage/' + id, token, state, dispatch)
  }
}
