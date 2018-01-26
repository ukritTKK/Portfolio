import axios from 'axios'

import {
  LOGIN,
  LOGOUT,
  REGISTER,
  AUTH_USER,
  FAIL_LOGIN,
  BAN_LOGIN
} from './Types'

import { browserHistory } from 'react-router'
import cookie from 'react-cookie'

export function register (login, password) {
  return function (dispatch) {
    axios({
      method: 'post',
      url: '/register',
      data: {
        username: login,
        password: password
      }
    })
    .then(response => {
      dispatch({
        type: REGISTER
      })
    })
    .then(() => {
      browserHistory.push('/login')
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

export const login = (login, password) => {
  return function (dispatch) {
    axios({
      method: 'post',
      url: '/login',
      data: {
        username: login,
        password: password
      }
    }).then((response) => {
      cookie.save('user_id', response.data.id, {path: '/'})
      cookie.save('token', response.data.token, {path: '/'})
      cookie.save('user', response.data.type, {path: '/'})
      console.log(response)
      console.log(LOGIN)
      dispatch({
        type: LOGIN,
        payload: response.data
      })
    }).then(() => {
      const token = cookie.load('token')
      if (token) {
        dispatch({
          type: AUTH_USER
        })
      }
    })
    .then(() => {
      const user = cookie.load('user')
      if (user === '3') {
        window.location = '/admin'
      } else if (user === '2') {
        window.location = '/garage/services'
      } else if (user === '1') {
        window.location = '/mechanic/services'
      }
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 403) {
          dispatch({
            type: BAN_LOGIN
          })
        } else if (error.response.status === 401) {
          dispatch({
            type: FAIL_LOGIN
          })
        }
      }
    })
  }
}

export function logout () {
  return function (dispatch) {
    dispatch({type: LOGOUT})
    cookie.remove('token', {path: '/'})
    cookie.remove('user', {path: '/'})
    window.location = '/backend/login'
  }
}
