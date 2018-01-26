import ajax from './ajax'

import {
  ADD_PART,
  EDIT_PART,
  EDIT_PART_SUCCESS,
  DELETE_PART,
  GET_PARTS,
  GET_PARTS_ID,
  GET_PART_FAIL,
  ADD_PART_TO_GARAGE,
  ADD_PART_TO_GARAGE_SUCCESS,
  DELETE_PART_FROM_GARAGE,
  DELETE_PART_FROM_GARAGE_SUCCESS
} from './Types'

export const getParts = (token, userRank) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: GET_PARTS,
      failure: GET_PART_FAIL
    }

    if (userRank === '2') ajax.get('/api/garages/part/listExist', token, state, dispatch)
    else ajax.get('/api/part', token, state, dispatch)
  }
}

export const addPart = (formData, token) => {
  return function (dispatch) {
    let state = {
      request: ADD_PART,
      success: EDIT_PART_SUCCESS,
      failure: ''
    }

    ajax.post('/api/admins/part', token, formData, state, dispatch)
  }
}

export const addPartToGarage = (partId, token) => {
  return function (dispatch) {
    let state = {
      request: ADD_PART_TO_GARAGE,
      success: ADD_PART_TO_GARAGE_SUCCESS,
      failure: ''
    }
    ajax.put('/api/garages/part/' + partId, token, {}, state, dispatch)
  }
}

export const deletePartToGarage = (partId, token) => {
  return function (dispatch) {
    let state = {
      request: DELETE_PART_FROM_GARAGE,
      success: DELETE_PART_FROM_GARAGE_SUCCESS,
      failure: ''
    }
    ajax.delete('/api/garages/part/' + partId, token, state, dispatch)
  }
}

export const getOncePart = (id, token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: GET_PARTS_ID,
      failure: ''
    }

    ajax.get('/api/part/' + id, token, state, dispatch)
  }
}

export const editPart = (id, partnumber, name, price, amount, token) => {
  return function (dispatch) {
    let state = {
      request: EDIT_PART,
      success: EDIT_PART_SUCCESS,
      failure: ''
    }

    let data = {
      part_number: partnumber,
      name: name,
      price: price,
      amount: amount
    }

    ajax.put('/api/admins/part/' + id, token, data, state, dispatch)
  }
}

export const editPartImage = (data, token) => {
  return function (dispatch) {
    let id = data.get('id')

    let state = {
      request: '',
      success: '',
      failure: ''
    }

    ajax.putImage('/api/partImg/' + id, token, data, state, dispatch)
  }
}

export const deletePart = (id, token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: DELETE_PART,
      failure: ''
    }

    ajax.delete('/api/admins/part/' + id, token, state, dispatch)
  }
}
