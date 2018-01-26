import ajax from './ajax'

import {
  GET_SERVICE,
  GET_SERVICE_BY_ID,
  GET_SERVICE_BY_ID_SUCCESS,
  GET_SERVICE_FAIL,
  ADD_SERVICE
} from './Types'

export const getService = (token, userRank) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: GET_SERVICE,
      failure: GET_SERVICE_FAIL
    }

    if (userRank === '3') ajax.get('/api/admins/service', token, state, dispatch)
    else if (userRank === '2') ajax.get('/api/garages/service', token, state, dispatch)
    else ajax.get('/api/mechanics/service', token, state, dispatch)
  }
}

export const addService = (userid, mechanicid, promotion, car, carmile, caruse, arraypart, arrayrepair, serviceob, price, lat, lng, date, correctprice, token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: ADD_SERVICE,
      failure: ''
    }

    let data = {
      user_id: '581adb76886ce6002c2096ae',
      mechanic_id: mechanicid,
      promotion_id: promotion,
      car_id: car,
      car_miles: carmile,
      car_used_years: caruse,
      part_id_list: arraypart,
      repair_list: arrayrepair,
      status_list: serviceob,
      price: price,
      location_lat: lat,
      location_lng: lng,
      service_date: date,
      corrected_price: correctprice
    }

    ajax.post('/api/mechanics/service', token, data, state, dispatch)
  }
}

export const getServiceById = (serviceId, token, userType) => {
  return function (dispatch) {
    let state = {
      request: GET_SERVICE_BY_ID,
      success: GET_SERVICE_BY_ID_SUCCESS,
      failure: GET_SERVICE_FAIL
    }

    if (userType === '2') ajax.get('/api/garages/service/' + serviceId, token, state, dispatch)
    else ajax.get('/api/mechanics/service/' + serviceId, token, state, dispatch)
  }
}

export const editService = (token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: '',
      failure: ''
    }
    ajax.put('', token, state, dispatch).then((response) => {

    })
  }
}
