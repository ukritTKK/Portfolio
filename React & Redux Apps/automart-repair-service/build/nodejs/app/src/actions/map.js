import * as firebase from 'firebase'
// import { Omise } from 'omise'

export function setlocation (lat, lng) {
  let user = firebase.auth().currentUser
  if (user != null) {
    let uid = user.uid
    firebase.database().ref('/users/' + uid + '/Location').update({
      PickupLatitude: lat,
      PickupLongitude: lng
    }).then(() => {
      console.log('SET LOCATION COMPLETE')
    })
    return {
      type: 'SETLOCATION',
      payload: 'SET LOCATION COMPLETE'
    }
  }
}
export function openmodal () {
  return {
    type: 'OPENMODAL',
    Spayload: true,
    payload: 'OPEN MODAL COMPLETE'
  }
}
export function closemodal () {
  return {
    type: 'CLOSEMODAL',
    Spayload: false,
    Mpaylaod: false,
    payload: 'CLOSE MODAL COMPLETE'
  }
}

export function getmechanic (distance) {
  return {
    type: 'GETMECHANIC',
    Dpayload: distance,
    payload: 'GET MECH DISTANCE COMPLETE'
  }
}

export function Loading (output) {
  return {
    type: 'LOADING',
    Opayload: output,
    payload: 'MECHANIC LOADING'
  }
}

export function MechAva (output, mechid) {
  return {
    type: 'MECHAVA',
    Opayload: output,
    Mpayload: mechid,
    payload: 'MECHANIC AVALIABLE'
  }
}

export function NoMechAva (output) {
  return {
    type: 'NOMECHAVA',
    Opayload: output,
    payload: 'NO MECHANIC AVALIABLE'
  }
}

export function loadmech (num, mechid, mechName, mechRating, mechCarModel, mechPlateNum,
  mechPerks, mechGarageName, mechGarageOpen, mechGarageClose) {
  return {
    type: 'LOADMECH',
    payload: 'LOADING MECH',
    Mpayload: mechid,
    Npayload: num,
    payload3: mechName,
    payload4: mechRating,
    payload5: mechCarModel,
    payload6: mechPlateNum,
    payload7: mechPerks,
    payload8: mechGarageName,
    payload9: mechGarageOpen,
    payload10: mechGarageClose
  }
}

export function openChooseServiceModal (directionsService, directionsDisplay) {
  return {
    type: 'OPENSERVICESELECTMODAL',
    payload: 'OPEN SERVICE SELECT MODAL',
    payload_bool: true,
    payload3: true,
    payload4: directionsService,
    payload5: directionsDisplay
  }
}

export function closeChooseServiceModal () {
  resetFirebaseData()
  return {
    type: 'CLOSESERVICESELECTMODAL',
    payload: 'CLOSE SERVICE SELECT MODAL',
    payload_bool: false,
    payload3: false
  }
}

export function resetFirebaseData () {
  setUserStatus('')
  let mechanicsID
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Service').once('value').then(function (snapshot) {
    mechanicsID = snapshot.val().MechanicID
  }).then(() => {
    if (mechanicsID !== false) {
      firebase.database().ref('/mechanic/' + mechanicsID + '/Service/Quotation').remove()
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
  })
  return {
    type: 'RESETFIREBASEDATA',
    payload: 'RESET FIREBASE SERVICE DATA'
  }
}

export function setServiceType (type) {
  let mechanicsID = localStorage.getItem('mechanicID')
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Service').update({
    Type: type
  })
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Service').once('value').then(function (snapshot) {
    mechanicsID = snapshot.val().MechanicID
  }).then(() => {
    if (mechanicsID !== false) {
      firebase.database().ref('/mechanic/' + mechanicsID + '/Service').update({
        Type: type
      })
    }
  })
  return {
    type: 'SETSERVICETYPE',
    payload: 'SET SERVICE TYPE',
    payload2: type
  }
}

export function checkChosenService () {
  let selectedServices = ''
  if (localStorage.getItem('serviceType') === 'manual') {
    if (document.getElementById('checkbox1').checked) {
      selectedServices += 'Repair car, '
    }
    if (document.getElementById('checkbox2').checked) {
      selectedServices += 'Need car part(s), '
    }
    if (document.getElementById('checkbox3').checked) {
      selectedServices += 'Need tow car, '
    }
    if (document.getElementById('checkbox4').checked) {
      selectedServices += 'Need driver, '
    }
    if (document.getElementById('checkbox5').checked) {
      selectedServices += 'Align wheel(s), '
    }
    if (document.getElementById('checkbox6').checked) {
      selectedServices += 'Replace tire(s, '
    }
    if (document.getElementById('checkbox7').checked) {
      selectedServices += 'Replace engine fluid, '
    }
    if (document.getElementById('checkbox8').checked) {
      selectedServices += 'Tune up, '
    }
    if (document.getElementById('checkbox9').checked) {
      selectedServices += 'Not sure what happened, Need mechanic to check, '
    }
  }
  // alert(selectedServices.substr(0, (selectedServices.length) - 2))
  let mechanicsID
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Service').once('value').then(function (snapshot) {
    mechanicsID = snapshot.val().MechanicID
  }).then(() => {
    if (mechanicsID !== false) {
      if (localStorage.getItem('serviceType') === 'manual') {
        firebase.database().ref('/mechanic/' + mechanicsID + '/Service').update({
          ServiceRequested: selectedServices.substr(0, (selectedServices.length) - 2)
        })
      } else if (localStorage.getItem('serviceType') === 'auto') {
        firebase.database().ref('/mechanic/' + mechanicsID + '/Service').update({
          ServiceRequested: 'Inspect & Repair'
        })
      }
    }
  })

  return {
    type: 'CHECKCHOSENSERVICE',
    payload: 'CHECK CHOSEN SERVICE'
  }
}

export function checkOffered (bool) {
  return {
    type: 'CHECKOFFERED',
    payload: 'CHECK OFFERED',
    payload_bool: bool
  }
}

export function getCatalogueFromFirebase () {
  let i = 0
  let name
  let qty
  let firebaseCatalogue = []
  let mechanicsID = localStorage.getItem('mechanicID')

  if (mechanicsID !== false) {
    firebase.database().ref('/mechanic/' + mechanicsID + '/Service/Quotation').once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        name = childSnapshot.val().orderName
        qty = childSnapshot.val().orderQty
        firebaseCatalogue[i] = {orderName: name, orderQty: qty}
        i += 1
      })
    })
  }

  return {
    type: 'GETCATFROMFIREBASE',
    payload: 'GET CAT FROM FIREBASE',
    payload_firebaseCatalogue: firebaseCatalogue
  }
}

export function setCatalogueComponent (array) {
  return {
    type: 'SETCATALOGUECOMPONENT',
    payload: 'SET CATALOGUE COMPONENT',
    payload_arr: array
  }
}

export function getCardsFromFirebase () {
  let i = 0
  let card
  let firebaseCards = []
  let currentUser = firebase.auth().currentUser
  if (currentUser) {
    firebase.database().ref('/users/' + currentUser.uid + '/payment').once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        card = childSnapshot.val()
        firebaseCards[i] = card
        i += 1
      })
    })
  }

  return {
    type: 'GETCARDSFROMFIREBASE',
    payload: 'GET CARDS FROM FIREBASE',
    payload2: firebaseCards
  }
}

export function setCardsComponent (array) {
  return {
    type: 'SETCARDSCOMPONENT',
    payload: 'SET CARDS COMPONENT',
    payload2: array
  }
}

export function onAcceptQuotClick () {
  // let currentUser = firebase.auth().currentUser
  // if (currentUser) {
  //   firebase.database().ref('/OrderHistory/' + currentUser.uid).once('value', function (snapshot) {
  //     snapshot.forEach(function (childSnapshot) {
  //       console.log('key: ' + childSnapshot.key)
  //     })
  //   })
  // }

  return {
    type: 'USERACCEPTQUOTCLICK',
    payload: 'USER ACCEPT QUOT CLICK',
    payload2: true
  }
}

function getDateNow () {
  let date = new Date().getDate()
  let month = new Date().getMonth() + 1
  let year = new Date().getFullYear()
  if (date < 10) {
    date = '0' + date.toString()
  } else {
    date = date.toString()
  }
  if (month < 10) {
    month = '0' + month.toString()
  } else {
    month = month.toString()
  }
  year = year.toString()
  return date + '/' + month + '/' + year
}

function getTimeNow () {
  let hour = new Date().getHours()
  let minute = new Date().getMinutes()
  let second = new Date().getSeconds()
  if (hour < 10) {
    hour = '0' + hour.toString()
  } else {
    hour = hour.toString()
  }
  if (minute < 10) {
    minute = '0' + minute.toString()
  } else {
    minute = minute.toString()
  }
  if (second < 10) {
    second = '0' + second.toString()
  } else {
    second = second.toString()
  }
  return hour + ':' + minute + ':' + second
}

function writeHistoryToFirebase () {
  let currentUser = firebase.auth().currentUser
  if (currentUser) {
    let DMY = getDateNow()
    let time = getTimeNow()
    let name = ''
    let qty = 0
    let firebaseCatalogue = []
    let mechanicsID = localStorage.getItem('mechanicID')
    let i = 0
    firebase.database().ref('/mechanic/' + mechanicsID + '/Service/Quotation').once('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        name = childSnapshot.val().orderName
        qty = childSnapshot.val().orderQty
        firebaseCatalogue[i] = {Name: name, Quantity: qty}
        i += 1
      })
    })

    firebase.database().ref('/OrderHistory/' + currentUser.uid).push({
      TotalAmount: 10000,
      Discount: '0%',
      Status: 'Charged',
      DMY: DMY,
      Time: time,
      Catalogue: firebaseCatalogue
    })
  }
}

export function onPaymentClick (cardObject) {
  // console.log(cardObject)

  // let formNumber = document.getElementById('checkout-form-number')
  let formNumber = document.createElement('input')
  formNumber.type = 'text'
  formNumber.style.visibility = 'hidden'
  formNumber.value = cardObject.number
  formNumber.name = 'cardNumber'

  // let formName = document.getElementById('checkout-form-name')
  let formName = document.createElement('input')
  formName.type = 'text'
  formName.style.visibility = 'hidden'
  formName.value = cardObject.name
  formName.name = 'nameOnCard'

  // let formExpM = document.getElementById('checkout-form-expm')
  let formExpM = document.createElement('input')
  formExpM.type = 'text'
  formExpM.style.visibility = 'hidden'
  formExpM.value = cardObject.expiration_month
  formExpM.name = 'expiryMonth'

  // let formExpY = document.getElementById('checkout-form-expy')
  let formExpY = document.createElement('input')
  formExpY.type = 'text'
  formExpY.style.visibility = 'hidden'
  formExpY.value = cardObject.expiration_year
  formExpY.name = 'expiryYear'

  // let formCode = document.getElementById('checkout-form-code')
  let formCode = document.createElement('input')
  formCode.type = 'text'
  formCode.style.visibility = 'hidden'
  formCode.value = cardObject.security_code
  formCode.name = 'securityCode'

  let checkoutForm = document.createElement('form')
  checkoutForm.id = 'checkout-form'
  checkoutForm.style.visibility = 'hidden'
  checkoutForm.method = 'POST'
  checkoutForm.action = 'http://localhost:3001/api/omise'
  let hiddenInput = document.createElement('input')
  hiddenInput.type = 'hidden'
  hiddenInput.name = 'omiseToken'

  checkoutForm.appendChild(formNumber)
  checkoutForm.appendChild(formName)
  checkoutForm.appendChild(formExpM)
  checkoutForm.appendChild(formExpY)
  checkoutForm.appendChild(formCode)
  checkoutForm.appendChild(hiddenInput)
  document.body.appendChild(checkoutForm)

  window.Omise.setPublicKey('pkey_test_xxxxxxxxxxxxxxxxxx')
  window.Omise.createToken('card', cardObject, (statusCode, response) => {
    console.log('statusCode: ' + statusCode)
    if (statusCode === 200) {
      console.log('RESPONSE: ' + response.id)
      // console.log('CHECK: ' + response.card.security_code_check)
      formNumber.value = response.card.number
      formName.value = response.card.name
      formExpM.value = response.card.expiration_month
      formExpY.value = response.card.expiration_year
      formCode.value = response.card.security_code
      hiddenInput.value = response.id
      checkoutForm.submit()
      console.log(checkoutForm)
    } else {
      console.log('ERROR: ' + response.message)
    }
  })

  writeHistoryToFirebase()

  return {
    type: 'PAYMENTCLICK',
    payload: 'PAYMENT CLICK',
    payload_paymentProcess: true
  }
}

export function onBackClick () {
  return {
    type: 'BACKCLICK',
    payload: 'BACK CLICK',
    payload2: false,
    payload3: ''
  }
}

export function onNextClick () {
  return {
    type: 'NEXTCLICK',
    payload: 'NEXT CLICK',
    payload_completePayment: true,
    payload_paymentProcess: false
  }
}

export function onGivenRating (givenRating) {
  let givenRatingF = parseFloat(givenRating)
  return {
    type: 'GIVENRATING',
    payload: 'GIVEN RATING',
    payload_rating: givenRatingF
  }
}

export function onFinishClick (givenRating) {
  let mechID = localStorage.getItem('mechanicID')
  let sumRating = 0
  let totalVoters = 0
  if (mechID !== false) {
    firebase.database().ref('/mechanic/' + mechID + '/Details').once('value').then(function (snapshot) {
      sumRating = snapshot.val().SumRating
      totalVoters = snapshot.val().TotalVoters
    }).then(() => {
      sumRating += givenRating
      totalVoters += 1
      let avgRating = parseFloat(sumRating / totalVoters)
      firebase.database().ref('/mechanic/' + mechID + '/Details').update({
        SumRating: sumRating,
        TotalVoters: totalVoters,
        Rating: avgRating
      })
    })
  }
  localStorage.setItem('mechanicID', '')
  return {
    type: 'FINISHCLICK',
    payload: 'FINISH CLICK'
  }
}

export function setUserStatus (string) {
  return {
    type: 'SETUSERSTATUS',
    payload: 'SET USER STATUS TEXT',
    payload2: string
  }
}

export function resetFindPosBtn () {
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/UI').update({
    ResetPosClick: false
  })

  return {
    type: 'RESETFINDPOSBTN',
    payload: 'RESET FIND POS BTN'
  }
}

export function resetViewQuotBtn () {
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Service').update({
    ViewQuotClick: false
  })

  return {
    type: 'RESETVIEWQUOTBTN',
    payload: 'RESET VIEW QUOT BTN'
  }
}

export function getMechanicImage (url) {
  return {
    type: 'GETMECHANICPHOTO',
    payload: 'GET MECHANIC PHOTO',
    payload2: url
  }
}

export function onSelectCardClick (event, length) {
  let id = event.target.id.substr(event.target.id.length - 1, event.target.id.length)
  let element = document.getElementById('card:' + id)
  element.style.setProperty('border', '3px solid #32CD32')

  let i
  for (i = 0; i < length; i++) {
    if (i.toString() !== id) {
      let otherElement = document.getElementById('card:' + i)
      otherElement.style.setProperty('border', 'none')
    }
  }

  return {
    type: 'SELECTCARDCLICK',
    payload: 'SELECT CARD CLICK',
    payload2: id
  }
}

export function setCurrentLatLng () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let currentUser = firebase.auth().currentUser
      if (currentUser) {
        firebase.database().ref('/users/' + currentUser.uid + '/Location').update({
          UserLatitude: position.coords.latitude,
          UserLongitude: position.coords.longitude
        })
      }
    })
  } else {
    console.log('Please allow browser to detection your location.')
  }

  return {
    type: 'SETCURRENTLATLNGTOFIREBASE',
    payload: 'SET CURRENT LAT LNG TO FIREBASE'
  }
}
