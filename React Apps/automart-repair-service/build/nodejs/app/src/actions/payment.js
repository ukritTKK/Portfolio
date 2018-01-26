import * as firebase from 'firebase'

export function addPayment (name, num, expM, expY, cvv, type) {
  let user = firebase.auth().currentUser
  if (user != null) {
    let uid = user.uid
    firebase.database().ref('/users/' + uid + '/payment/').push({
      name: name,
      num: num,
      expM: expM,
      expY: expY,
      cvv: cvv,
      type: type
    })
    return {
      type: 'PAYMENT',
      payload: 'submit payment done'
    }
  }
  return {
    type: 'PAYMENT',
    payload: 'submit payment failed'
  }
}

export function getpayment (arr) {
  return {
    type: 'GETPAYMENT',
    Dpayload: arr,
    payload: 'GET PAYMENT DONE'
  }
}

export function deletepay (id, arr, k) {
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/payment/' + id).remove().then(() => {
  }).catch((error) => {
    alert(error)
  })
  console.log(arr)
  arr[k - 1] = null
  let j = 0
  let arr2 = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      arr2[j] = arr[i]
      j++
    }
  }
  return {
    type: 'DELETEPAYMENT',
    Dpayload: arr2,
    payload: 'DELETE PAYMENT DONE'
  }
}
