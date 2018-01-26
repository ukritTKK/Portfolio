import * as firebase from 'firebase'

export function aja () {
  let kk = 'header action message'
  return {
    type: 'HEADERACTION',
    payload: 'HEADER ACTION TEST',
    payload2: kk
  }
}

function getCookie (name) {
  let value = '; ' + document.cookie
  let parts = value.split('; ' + name + '=')
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  } else return ''
}

export function checkRedirectPath () {
  let user = getCookie('username')
  let isMechanic = getCookie('mechanic')
  let isUserSignedIn = localStorage.getItem('userSignedIn')
  let isMechSignedIn = localStorage.getItem('mechSignedIn')
  let path = window.location.pathname
  if (user === '' && !isMechanic) {                //  nobody logged in
    if (path !== '/login' && path !== '/register' &&
        path !== '/isMechanicanic/login' && path !== '/home') {
      window.location = '/login'
    }
  } else if (isUserSignedIn && !isMechanic) {      //  user logged in
    if (path === '/isMechanicanic/map' || path === 'mechanic/login' ||
        path === '/login' || path === '/register') {
      window.location = '/map'
    }
  } else if (isMechSignedIn && isMechanic) {       //  mechanic logged in
    if (path === '/map' || path === '/payment' ||
        path === '/history' || path === '/settings' ||
        path === '/login' || path === '/register' ||
        path === '/mechanic/login') {
      window.location = '/mechanic/map'
    }
  }

  return {
    type: 'CHECKPATH',
    payload: 'CHECK PATH'
  }
}

export function setUserStatus (string) {
  return {
    type: 'SETUSERSTATUS',
    payload: 'SET USER STATUS TEXT',
    payload2: string
  }
}

export function setQuotOfferedBool (bool) {
  return {
    type: 'SETQUOTOFFEREDBOOL',
    payload: 'SET QUOT OFFERED BOOL',
    payload2: bool
  }
}

export function onRelocatePosClick () {
  return {
    type: 'RESETPOSCLICK',
    payload: 'RESET POSITION CLICK',
    payload2: true
  }
}

export function setFABButtonString (string) {
  return {
    type: 'SETFABSTRING',
    payload: 'SET FAB STRING',
    payload2: string
  }
}

export function onUserCancelClick () {
  setUserStatus('')
  let mechanicsID = localStorage.getItem('mechanicID')
  if (mechanicsID !== false) {
    firebase.database().ref('/mechanic/' + mechanicsID + '/Service').update({
      CallerID: false,
      State: 0,
      ServiceRequested: '',
      IsQuotationOffered: false
    })
  }
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Service').update({
    MechanicID: false
  })
  window.location.reload()

  return {
    type: 'USERCLICKCANCEL',
    payload: 'USER CLICK CANCEL'
  }
}

export function onUserResetPosClick () {
  let currentUser = firebase.auth().currentUser
  if (currentUser) {
    firebase.database().ref('/users/' + currentUser.uid + '/UI').update({
      ResetPosClick: true
    })
  }
  return {
    type: 'USERRESETPOSITIONCLICK',
    payload: 'USER RESET POSITION CLICK'
  }
}

export function onMechResetPosClick () {
  let currentUser = firebase.auth().currentUser
  if (currentUser) {
    firebase.database().ref('/mechanic/' + currentUser.uid + '/UI').update({
      ResetPosClick: true
    })
  }
  return {
    type: 'MECHRESETPOSITIONCLICK',
    payload: 'MECH RESET POSITION CLICK'
  }
}

export function onLogoutClick () {
  setUserStatus('')
  firebase.auth().signOut().then(function () {
    // alert('You have signed out.')
  }).catch(function () {
    alert('Sign out failed.')
  })
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'picture=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'mechanic=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie = 'picklat=-1; expires=Thu, 01 Jan 2970 00:00:00 UTC; path=/;'
  document.cookie = 'picklng=-1; expires=Thu, 01 Jan 2970 00:00:00 UTC; path=/;'
  localStorage.setItem('userSignedIn', false)
  localStorage.setItem('mechSignedIn', false)

  return {
    type: 'LOGOUTCLICK',
    payload: 'LOGOUT CLICK'
  }
}

export function onUserViewQuotClick () {
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Service').update({
    ViewQuotClick: true
  })

  return {
    type: 'USERVIEWQUOTCLICK',
    payload: 'USER VIEW QUOT CLICK'
  }
}

export function setCallerID (CallerID) {
  return {
    type: 'SETCALLERID',
    payload: 'SET CALLER ID',
    payload2: CallerID
  }
}

export function onMechCreateQuotClick () {
  return {
    type: 'OPENMODAL',
    Spayload: true,
    payload: 'OPEN MODAL COMPLETE'
  }
}

export function onMechEditQuotClick () {
  return {
    type: 'MECHEDITQUOTCLICK',
    payload: 'MECH EDIT QUOT CLICK'
  }
}

export function onChildClick (event) {
  let getId = event.target.id
  if (getId !== 'dropdown-content' || getId !== 'dropdown') {
    let dropdown = document.getElementById('dropdown-content')
    dropdown.style.visibility = 'hidden'
  }

  return {
    type: 'NOTDROPDOWNCONTENTCLICK',
    payload: 'NOT DROPDOWN CONTENT CLICK'
  }
}

export function onDropdownClick (event) {
  let dropdown = document.getElementById('dropdown-content')
  dropdown.style.visibility = 'visible'

  return {
    type: 'DROPDOWNCLICK',
    payload: 'DROPDOWN CLICK'
  }
}
