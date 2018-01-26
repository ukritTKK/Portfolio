import ajax from './ajax'
import * as firebase from 'firebase'
import { canlogin } from './inputAction'
import userIcon from '../components/UI/Sidebar/img/userIcon.png'

let Gprovider = new firebase.auth.GoogleAuthProvider()
let Fprovider = new firebase.auth.FacebookAuthProvider()
let Tprovider = new firebase.auth.TwitterAuthProvider()
let sideuser = ''
let sidepic = ''
let acceptToken = ''
let isLoginClicked = 0

function onSuccess (str, username) {
  if (str === 'fire') {
    sideuser = username
  }
  let Cuser = firebase.auth().currentUser
  if (Cuser != null) {
    Cuser.providerData.forEach(function (profile) {
      // sidepic = profile.photoURL
      if (profile.photoURL === null) {
        sidepic = userIcon
      }
    })
  }
  firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
    let data = {
      token: idToken,
      usertype: 1
    }
    let state = {
      request: '',
      success: 'LOGIN_SUCCESS',
      failure: ''
    }
    ajax.post('/login', data.token, data, state, (dispatch) => {}).then(function (response) {
      acceptToken = response.headers.token
      console.log(response.headers.token)
      // sendacceptToken()
      let date = new Date()
      date.setDate(date.getDate() + 30)
      document.cookie = 'username=' + sideuser + '; expires=' + date + ';path=/'

      document.cookie = 'picture=' + sidepic + '; expires=' + date + ';path=/'

      document.cookie = 'token=' + acceptToken + '; expires=' + date + ';path=/'
      canlogin(sideuser)
      firebase.auth().onAuthStateChanged(function (currentUser) {
        if (currentUser) {
          // alert('Login successfully')
          firebase.database().ref('/users/' + currentUser.uid + '/payment').once('value').then(function (snapshot) {
            if (snapshot.val()) {
              window.location = '/map'
            } else {
              alert('Please enter your payment method information before using our services.')
              console.log('Please enter your payment method information before using our services.')
              window.location = '/payment'
            }
          })
        } else {
          window.location = '/login'
        }
      })
    }).catch(function (error) {
      alert(error)
    })
  }).catch(function (error) {
    alert(error)
  })
}
// function sendacceptToken () {
//   let data = {
//     token: acceptToken
//   }
//   let state = {
//     request: '',
//     success: 'LOGIN_SUCCESS',
//     failure: ''
//   }
//   ajax.post('http://192.168.87.240:3001/test/setUser', acceptToken, data, state, (dispatch) => {}).then(function (response) {
//     console.log(response.data[0])
//   })
// }

export function payment (status) {
  if (status === false) {
    window.location = '/payment'
  }
  return {
    type: 'PAYMENT',
    Ppayload: status,
    payload: status + 'payment'
  }
}
export function googlelogin () {
  firebase.auth().signInWithPopup(Gprovider).then(function (result) {
    let guser = result.user
    console.log(guser.displayName)
    sideuser = guser.displayName
  }).then(onSuccess.bind(this)).catch(function (error) {
    // alert(error)
    console.log('error num: 1 ' + error)
  })
  return {
    type: 'GOOGLELOGIN',
    Upayload: sideuser,
    payload: 'LOGIN WITH GOOGLE'
  }
}

export function facelogin () {
  firebase.auth().signInWithPopup(Fprovider).then(function (result) {
    let guser = result.user
    console.log(firebase.auth().providerData)
    sideuser = guser.displayName
  }).then(onSuccess.bind(this)).catch(function (error) {
    let errorCode = error.code
    let errorMessage = error.message
    let email = error.email
    let credential = error.credential
    if (errorCode === 'auth/account-exists-with-different-credential') {
      alert('You have already signed up.')
      console.log('error num: 2')
    } else {
      // alert(error)
      console.log('error num: 3 ' + error + errorMessage + email + credential)
    }
  })
  return {
    type: 'FACELOGIN',
    Upayload: sideuser,
    payload: 'LOGIN WITH FACEBOOK'
  }
}
export function twitterlogin () {
  firebase.auth().signInWithPopup(Tprovider).then(function (result) {
  //  let secret = result.credential.secret;
    let guser = result.user
    sideuser = guser.displayName
  }).then(onSuccess.bind(this)).catch(function (error) {
    // alert(error)
    console.log('error num: 4 ' + error)
  })
  return {
    type: 'TWITTERLOGIN',
    Upayload: sideuser,
    payload: 'LOGIN WITH TWITTER'
  }
}

export function firebaselogin (username, password) {
  localStorage.setItem('userSignedIn', true)
  localStorage.setItem('mechSignedIn', false)
  isLoginClicked += 1
  if (isLoginClicked === 1) {
    if (username !== '' && password !== '') {
      firebase.auth().signInWithEmailAndPassword(username, password)
      .then(onSuccess.bind(this, 'fire', username)).catch(function (error) {
        alert(error)
      })
    } else {
      alert('Please fill in username and password.')
    }
    return {
      type: 'FIRELOGIN',
      Upayload: sideuser,
      payload: 'LOGIN WITH FIREBASE'
    }
  }
}

export function firebaseregister (username, password, repassword, mobile) {
  if (username !== '' && password !== '') {
    if (password === repassword) {
      firebase.auth().createUserWithEmailAndPassword(username, password)
      .then(onSuccess.bind(this, 'fire', username)).then(() => {
        let user = firebase.auth().currentUser
        if (user != null) {
          let uid = user.uid
          firebase.database().ref('/users/' + uid + '/Details').update({
            mobile: mobile
          })
        }
      }).catch(function (error) {
        alert(error)
      })
    } else {
      alert('The re-entered password does not match.')
    }
  } else {
    alert('Please fill in username and password.')
  }
  return {
    type: 'FIREREGIS',
    Upayload: sideuser,
    payload: 'REGISTER WITH FIREBASE'
  }
}

