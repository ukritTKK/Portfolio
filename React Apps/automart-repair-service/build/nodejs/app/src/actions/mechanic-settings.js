import * as firebase from 'firebase'
// import ajax from './ajax'

// function getCookie (name) {
//   let value = '; ' + document.cookie
//   let parts = value.split('; ' + name + '=')
//   if (parts.length === 2) {
//     return parts.pop().split(';').shift()
//   } else return ''
// }

export function setImageFileName (fileName) {
  return {
    type: 'SETIMAGEFILENAME',
    payload: 'SET IMAGE FILE NAME',
    payload2: fileName
  }
}

export function getMechSettings (firstname, lastname, email, mobile) {
  // let state = {
  //   request: '',
  //   success: 'LOGIN_SUCCESS',
  //   failure: ''
  // }
  // ajax.get('/test/getUser', getCookie('token'), state, (dispatch) => {}).then(function (response) {
  //   console.log(response)
  // })
  return {
    type: 'GETMECHSETTINGS',
    payload: 'GET MECH SETTINGS',
    payload2: firstname,
    payload3: lastname,
    payload4: email,
    payload5: mobile
  }
}

export function setMechImage (file, result) {
  return {
    type: 'SETMECHIMAGE',
    payload: 'SET MECH IMAGE',
    payload2: file,
    payload3: result,
    default: false
  }
}

export function loadMechPreviewImage (url) {
  return {
    type: 'LOADMECHPREVIEWIMAGE',
    payload: 'LOAD MECH PREVIEW IMAGE',
    payload2: url
  }
}

export function editMechSettings (firstname, lastname, email, mobile) {
  return {
    type: 'EDITMECHSETTINGS',
    payload: 'EDIT MECH SETTINGS',
    payload2: firstname,
    payload3: lastname,
    payload4: email,
    payload5: mobile
  }
}

export function SubmitMechSettings (firstname, lastname, email, mobile) {
  let user = firebase.auth().currentUser
  if (user != null) {
    let uid = user.uid
    firebase.database().ref('/mechanic/' + uid + '/Details').update({
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      Mobile: mobile
    })
  }
  return {
    type: 'SUBMITMECHSETTINGS',
    payload: 'SUBMIT MECH SETTINGS'
  }
}

export function uploadMechImage (imageURL) {
  let refStorage = firebase.storage().ref()
  let imagesRef = refStorage.child('/images/MechanicsAvatar/image_' + firebase.auth().currentUser.uid)
  if (imageURL !== '') {
    imagesRef.putString(imageURL, 'data_url').then(function (snapshot) {
      alert('File uploaded')
    })
    imagesRef.getDownloadURL().then(function (url) {
      let d = new Date()
      d.setTime(d.getTime() * 50000)
      document.cookie = 'picture=' + url + ';' + 30 + ';path=/'
      firebase.auth().currentUser.updateProfile({
        photoURL: url
      })
    }).then(() => {
      window.location = '/mechanic/settings'
    })
  }
  return {
    type: 'UPLOADMECHIMAGE',
    payload: 'UPLOAD MECH IMAGE'
  }
}
