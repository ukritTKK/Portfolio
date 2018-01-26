import ajax from './ajax'
import * as firebase from 'firebase'
import userIcon from '../components/UI/Sidebar/img/userIcon.png'
import { canlogin } from './inputAction'

import {
  ADD_MECHANIC,
  EDIT_MECHANIC,
  EDIT_MECHANIC_SUCCESS,
  EDIT_MECHANIC_FAIL,
  GET_MECHANICS_ID,
  GET_MECHANICS,
  GET_MECHANICS_FAIL,
  GET_MECHANIC_PROFILE_SUCCESS,
  EDIT_MECHANIC_PROFILE,
  EDIT_MECHANIC_PROFILE_SUCCESS,
  EDIT_MECHANIC_PROFILE_FAIL,
  EDIT_MECHANIC_PROFILE_IMAGE,
  EDIT_MECHANIC_PROFILE_IMAGE_SUCCESS,
  BANNED_USER
} from './Types'
let sideuser = ''
let sidepic = ''
let acceptToken = ''
export const getProfile = (token) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: GET_MECHANIC_PROFILE_SUCCESS,
      failure: GET_MECHANICS_FAIL
    }
    ajax.get('/api/mechanics/mechanic', token, state, dispatch)
  }
}

export const editProfile = (formData, token) => {
  return function (dispatch) {
    let state = {
      request: EDIT_MECHANIC_PROFILE,
      success: EDIT_MECHANIC_PROFILE_SUCCESS,
      failure: EDIT_MECHANIC_PROFILE_FAIL
    }
    ajax.put('/api/mechanics/mechanic/', token, formData, state, dispatch)
  }
}

export const editProfileImage = (data, token) => {
  return function (dispatch) {
    let state = {
      request: EDIT_MECHANIC_PROFILE_IMAGE,
      success: EDIT_MECHANIC_PROFILE_IMAGE_SUCCESS,
      failure: EDIT_MECHANIC_PROFILE_FAIL
    }
    ajax.putImage('/api/mechanics/mechanicImg/', token, data, state, dispatch)
  }
}

export const getMechanics = (token, userRank) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: GET_MECHANICS,
      failure: GET_MECHANICS_FAIL
    }

    if (userRank === '3') ajax.get('/api/admins/mechanic', token, state, dispatch)
    else ajax.get('/api/garages/mechanic', token, state, dispatch)
  }
}

export const addMechanic = (formData, token, userRank) => {
  return function (dispatch) {
    let state = {
      request: ADD_MECHANIC,
      success: EDIT_MECHANIC_SUCCESS,
      failure: EDIT_MECHANIC_FAIL
    }
    if (userRank === '3') ajax.post('/api/admins/mechanic', token, formData, state, dispatch)
    else ajax.post('/api/garages/mechanic', token, formData, state, dispatch)
  }
}

export const getOnceMechanic = (id, token, userRank) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: GET_MECHANICS_ID,
      failure: ''
    }

    if (userRank === '3') ajax.get('/api/admins/mechanic/' + id, token, state, dispatch)
    else ajax.get('/api/garages/mechanic/' + id, token, state, dispatch)
  }
}

export const editMechanic = (id, garageid, name, tel, rating, token, userRank) => {
  return function (dispatch) {
    let state = {
      request: EDIT_MECHANIC,
      success: EDIT_MECHANIC_SUCCESS,
      failure: ''
    }

    let data = {
      garage_id: garageid,
      name: name,
      tel: tel,
      rating: rating
    }

    if (userRank === '3') ajax.put('/api/admins/mechanic/' + id, token, data, state, dispatch)
    else ajax.put('/api/garages/mechanic/' + id, token, data, state, dispatch)
  }
}

export const editMechanicImage = (data, token) => {
  return function (dispatch) {
    let id = data.get('id')

    let state = {
      request: '',
      success: EDIT_MECHANIC,
      failure: ''
    }

    ajax.putImage('/api/mechanicImg/' + id, token, data, state, dispatch)
  }
}

export const banMechanic = (id, status, token, userRank) => {
  return function (dispatch) {
    let state = {
      request: '',
      success: BANNED_USER,
      failure: EDIT_MECHANIC_FAIL
    }

    let data = {
      enabled: status
    }

    if (userRank === '3') ajax.put('/api/admins/user/' + id, token, data, state, dispatch)
    else ajax.put('/api/garages/user/' + id, token, data, state, dispatch)
  }
}

export function mechanicRegister (username, password, repassword, mobile) {
  if (username !== '' && password !== '') {
    if (password === repassword) {
      firebase.auth().createUserWithEmailAndPassword(username, password)
      .then(onSuccess.bind(this, 'fire', username)).then(() => {
        let user = firebase.auth().currentUser
        if (user != null) {
          let uid = user.uid
          firebase.database().ref('/mechanic/' + uid + '/Details').update({
            mobile: mobile
          })
        }
      }).catch(function (error) {
        alert(error)
        console.log('error num: 7')
      })
    } else {
      alert('The re-entered password does not match.')
    }
  } else {
    alert('Please fill in username and password.')
  }
  return {
    type: 'REGISMECH',
    payload: 'REGISTER MECHANIC'
  }
}
export function mechanicLogin (username, password) {
  if (username !== '' && password !== '') {
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(onSuccess.bind(this, 'fire', username)).catch(function (error) {
      alert(error)
    })
  } else {
    alert('Please fill in username and password.')
  }
  return {
    type: 'MECHLOGIN',
    Upayload: sideuser,
    payload: 'LOGIN WITH FIREBASE'
  }
}
function onSuccess (str, username) {
  localStorage.setItem('userSignedIn', false)
  localStorage.setItem('mechSignedIn', true)
  if (str === 'fire') {
    sideuser = username
  }
  let Cuser = firebase.auth().currentUser
  if (Cuser != null) {
    Cuser.providerData.forEach(function (profile) {
      sidepic = profile.photoURL
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
      acceptToken = response.data.Token
      // console.log(response)
      let date = new Date()
      date.setDate(date.getDate() + 30)
      document.cookie = 'username=' + sideuser + '; expires=' + date + '; path=/;'
      document.cookie = 'mechanic=' + true + '; expires=' + date + '; path=/;'
      document.cookie = 'picture=' + sidepic + '; expires=' + date + '; path=/;'
      document.cookie = 'token=' + acceptToken + '; expires=' + date + '; path=/;'
      canlogin(sideuser)
      firebase.auth().onAuthStateChanged(function (currentUser) {
        if (currentUser) {
          // alert('Logged in successfully.')
          window.location = '/mechanic/map'
        } else {
          window.location = '/mechanic/login'
        }
      })
    }).catch(function (error) {
      alert(error)
    })
  }).catch(function (error) {
    alert.log(error)
  })
}
export function mechanicAcceptCall () {
  let callerIDFetch = ''
  let state = 0
  firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service').once('value').then(function (snapshot) {
    callerIDFetch = snapshot.val().CallerID
    state = snapshot.val().State
  }).then(() => {
    if (state === 3) {
      firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service').update({
        CallerID: callerIDFetch,
        State: 4
      }).then(() => {
        // alert('Matching done!')
        // localStorage.setItem('userStatusText', 'Mechanic has accepted your order')
      }).catch((error) => {
        alert('Matching error due to: ' + error)
      })
    }
  }).catch((error) => {
    alert(error)
  })

  return {
    type: 'MECHACCEPT',
    payload: 'MECHANIC ACCEPT USER',
    Spayload: true
  }
}
export function mechanicCancelCall () {
  let state = 0
  firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service').once('value').then(function (snapshot) {
    state = snapshot.val().State
  }).then(() => {
    if (state === 3) {
      firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service').update({
        CallerID: false,
        State: 0,
        ServiceRequested: ''
      }).then(() => {
        console.log('You have dismissed the call.')
        // localStorage.setItem('userStatusText', '')
      }).catch((error) => {
        alert('Cannot dismiss call due to: ' + error)
      })
    } else if (state === 4) {
      firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service/Quotation').remove()
      firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service').update({
        CallerID: false,
        State: 0,
        ServiceRequested: '',
        IsQuotationOffered: false
      }).then(() => {
        console.log('Call dismissed')
        // localStorage.setItem('userStatusText', '')
      }).catch((error) => {
        alert('Cancel error due to: ' + error)
      })
    }
  }).catch((error) => {
    alert(error)
  })
  return {
    type: 'MECHCANCEL',
    payload: 'MECHANIC CANCEL USER'
  }
}
export function getMechsCurrentLocation (lat, lng) {
  return {
    type: 'MECHPOSITION',
    payload: lat,
    payload2: lng
  }
}

export function mechModal () {
  return {
    type: 'MECHMODAL',
    payload: 'SHOW MECH MODAL'
  }
}

export function mechOpenModal () {
  return {
    type: 'OPENMODAL',
    Spayload: true,
    payload: 'OPEN MODAL COMPLETE'
  }
}
export function mechCloseModal () {
  return {
    type: 'CLOSEMODAL',
    Spayload: false,
    payload: 'CLOSE MODAL COMPLETE'
  }
}
export function getCallerData (uFirstName, uLastName, uMobileNum) {
  return {
    type: 'MECHACCEPT',
    payload: 'MECHANIC ACCEPT USER',
    Spayload: true,
    payload_user_fn: uFirstName,
    payload_user_ln: uLastName,
    payload_user_mn: uMobileNum
  }
}
export function getUserOrder (userOrder) {
  return {
    type: 'GETUSERORDER',
    payload: 'GET USER ORDER',
    payload_order: userOrder
  }
}

export function getCallersPickupLocation (lat, lng) {
  return {
    type: 'MECHGETPICKUP',
    payload: 'MECHANIC ACCEPT USER',
    payload_lat: lat,
    payload_lng: lng
  }
}

export function toggleActive () {
  let status = ''
  let result = ''
  firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service').once('value').then(function (snapshot) {
    status = snapshot.val().Status
  }).then(() => {
    if (status === 'Active') {
      result = 'Inactive'
    } else if (status === 'Inactive') {
      result = 'Active'
    }
    firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service').update({
      Status: result,
      State: 0,
      CallerID: ''
    }).then(() => {
      console.log('Mechanic has toggled active status to ' + result)
      setToggleActive(result)
      localStorage.setItem('toggleActive', result)
    }).catch((error) => {
      alert('Setting Active status error due to: ' + error)
    })
  }).catch((error) => {
    alert(error)
  })

  return {
    type: 'MECHTOGGLEACTIVE',
    payload: 'MECHANIC TOGGLE ACTIVE'
  }
}

export function setToggleActive (status) {
  return {
    type: 'MECHSETACTIVE',
    payload: 'MECHANIC SET ACTIVE',
    payload_status: status
  }
}

export function inputChange (orderName, orderQty) {
  return {
    type: 'INPUTCHANGED',
    payload: 'INPUT CHANGED',
    payload_orderName: orderName,
    payload_orderQty: orderQty
  }
}

export function addContentToList (list, orderName, orderQty, sumPrice) {
  let order = {orderName: orderName, orderQty: orderQty}
  sumPrice += parseFloat(orderQty)
  list.push(order)
  return {
    type: 'ADDITEMTOLIST',
    payload: 'ADD ITEM TO LIST',
    payload_list: list,
    payload_sumPrice: sumPrice
  }
}

export function removeContentFromList (list, sumPrice, id) {
  sumPrice -= parseFloat(list[id].orderQty)
  list.splice(id, 1)
  return {
    type: 'REMOVEITEMFROMLIST',
    payload: 'REMVOE ITEM FROM LIST',
    payload_list: list,
    payload_sumPrice: sumPrice
  }
}

export function setCatalogueComponent (array) {
  return {
    type: 'SETCATALOGUECOMPONENT',
    payload: 'SET CATALOGUE COMPONENT',
    payload_arr: array
  }
}

export function onOfferClick (list) {
  firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service/Quotation').remove()
  let i
  for (i = 0; i < list.length; i++) {
    firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service/Quotation/item:' + i)
    .update({
      orderName: list[i].orderName,
      orderQty: list[i].orderQty
    })
  }
  if (list.length !== 0) {
    firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service').update({
      IsQuotationOffered: true
    })
  } else if (list.length === 0) {
    firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service').update({
      IsQuotationOffered: false
    })
  }
  return {
    type: 'OFFERCLICK',
    payload: 'OFFER CLICK',
    payload_offered: true
  }
}

export function getCatalogueFromFirebase () {
  let i = 0
  let name
  let qty
  let firebaseCatalogue = []
  firebase.database().ref('/mechanic/' + firebase.auth().currentUser.uid + '/Service/Quotation').once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      name = childSnapshot.val().orderName
      qty = childSnapshot.val().orderQty
      firebaseCatalogue[i] = {orderName: name, orderQty: qty}
      i += 1
    })
  })

  return {
    type: 'GETCATFROMFIREBASE',
    payload: 'GET CAT FROM FIREBASE',
    payload_fb_cata: firebaseCatalogue
  }
}

export function checkQuotOffered (bool) {
  return {
    type: 'CHECKQUOT',
    payload: 'CHECK QUOT',
    payload_bool: bool
  }
}

export function getUserImage (url) {
  return {
    type: 'GETCUSTOMERPHOTO',
    payload: 'GET CUSTOMER PHOTO',
    payload2: url
  }
}

export function resetOrderName () {
  return {
    type: 'RESETORDERNAME',
    payload: 'RESET ORDER NAME',
    payload2: ''
  }
}

export function setCurrentLatLng () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let currentUser = firebase.auth().currentUser
      if (currentUser) {
        firebase.database().ref('/mechanic/' + currentUser.uid + '/Location').update({
          MechanicLatitude: position.coords.latitude,
          MechanicLongitude: position.coords.longitude
        })
      }
    })
  } else {
    console.log('Please allow browser to detection your location.')
  }

  return {
    type: 'MECHSETCURRENTLATLNGTOFIREBASE',
    payload: 'MECH SET CURRENT LAT LNG TO FIREBASE'
  }
}

export function resetFindPosBtn () {
  let currentUser = firebase.auth().currentUser
  if (currentUser) {
    firebase.database().ref('/mechanic/' + currentUser.uid + '/UI').update({
      ResetPosClick: false
    })
  }

  return {
    type: 'RESETFINDPOSBTN',
    payload: 'RESET FIND POS BTN'
  }
}
