import axios from 'axios'
import { browserHistory } from 'react-router'

const ajax = {
  get (url, token, state, dispatch) {
    dispatch({
      type: state.request
    })

    return axios.get(url, {
      headers: {
        authorization: token
      }
    })
    .then(response => {
      dispatch({
        type: state.success,
        payload: response.data
      })
      return response
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: state.failure,
          payload: error.response
        })

        if (error.response.status === '400') {
          browserHistory.push('/login')
        }
      }
      return error
    })
  },
  post (url, token, data, state, dispatch) {
    dispatch({
      type: state.request
    })
    return axios({
      method: 'post',
      url: url,
      data: data,
      headers: {
        authorization: token,
        usertype: 0,
        'Content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({
        type: state.success
      })
      return response
    })
    .catch((error) => {
      alert(error)
      if (error.response) {
        dispatch({
          type: state.failure,
          payload: error.response
        })
      }
      return error
    })
  },
  put (url, token, data, state, dispatch) {
    dispatch({
      type: state.request
    })

    return axios({
      method: 'PUT',
      url: url,
      data: data,
      headers: {
        'Authorization': token
      }
    })
    .then(response => {
      dispatch({
        type: state.success,
        payload: response.data
      })

      return response
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: state.failure,
          payload: error.response
        })
      }

      return error
    })
  },
  putImage (url, token, data, state, dispatch) {
    dispatch({
      type: state.request
    })

    return axios({
      method: 'PUT',
      url: url,
      data: data,
      headers: {
        'Authorization': token,
        'Content-type': 'multipart/formData'
      }
    })
    .then(response => {
      dispatch({
        type: state.success,
        payload: response.data
      })

      return response
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: state.failure,
          payload: error.response
        })
      }

      return error
    })
  },
  delete (url, token, state, dispatch) {
    dispatch({
      type: state.request
    })

    return axios({
      method: 'delete',
      url: url,
      headers: {
        'Authorization': token
      }
    })
    .then(response => {
      dispatch({
        type: state.success
      })

      return response
    })
    .catch((error) => {
      if (error.response) {
        dispatch({
          type: state.failure,
          payload: error.response
        })
      }

      return error
    })
  }
}

export default ajax
