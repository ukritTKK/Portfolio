import * as firebase from 'firebase'
// import ajax from './ajax'

let refStorage = firebase.storage().ref()

// function getCookie (name) {
//   let value = '; ' + document.cookie
//   let parts = value.split('; ' + name + '=')
//   if (parts.length === 2) {
//     return parts.pop().split(';').shift()
//   } else return ''
// }

export function settings (firstname, lastname, email, mobile) {
  let user = firebase.auth().currentUser
  if (user != null) {
    // let data = {
    //   name: firstname + ' ' + lastname,
    //   email: email,
    //   tel: email
    // }
    // let state = {
    //   request: '',
    //   success: 'LOGIN_SUCCESS',
    //   failure: ''
    // }
    // ajax.post('/test/setUser', getCookie('token'), data, state, (dispatch) => {}).then(function (response) {
    //   console.log(response)
    // })
    let uid = user.uid
    firebase.database().ref('/users/' + uid + '/Details').update({
      firstname: firstname,
      lastname: lastname,
      email: email,
      mobile: mobile
    })
    return {
      type: 'SETTING',
      payload: 'SET DATA COMPLETE'
    }
  }
}

export function sendsettings (fileurl) {
  let imagesRef = refStorage.child('/images/UsersAvatar/image_' + firebase.auth().currentUser.uid)
  if (fileurl !== '') {
    imagesRef.putString(fileurl, 'data_url').then(function (snapshot) {
      console.log('Uploaded a base64 string!')
      alert('File uploaded')
    })
  }
  imagesRef.getDownloadURL().then(function (url) {
    let d = new Date()
    d.setTime(d.getTime() * 50000)
    document.cookie = 'picture=' + url + ';' + 30 + ';path=/'
    firebase.auth().currentUser.updateProfile({
      photoURL: url
    })
  }).then(() => {
    window.location = '/settings'
  })
  return {
    type: 'SENDSETTING',
    payload: 'SET IMAGE DONE'
  }
}

export function setimage (file, result) {
  return {
    type: 'SETIMAGE',
    Fpayload: file,
    Rpayload: result,
    default: false,
    payload: 'SET IMAGE DONE'
  }
}
export function loadimage (result) {
  return {
    type: 'LOADIMAGE',
    Rpayload: result,
    payload: 'LOAD IMAGE DONE'
  }
}
export function getsettings (firstname, lastname, email, mobile) {
  // let state = {
  //   request: '',
  //   success: 'LOGIN_SUCCESS',
  //   failure: ''
  // }
  // ajax.get('/test/getUser', getCookie('token'), state, (dispatch) => {}).then(function (response) {
  //   console.log('RESPONSE: ' + response)
  // })
  return {
    type: 'GETSETTING',
    Fpayload: firstname,
    Lpayload: lastname,
    Epayload: email,
    Mpayload: mobile
  }
}
