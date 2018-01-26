export function thelogin (username, password) {
  return {
    type: 'INPUTLOGIN',
    Upayload: username,
    Ppayload: password
  }
}
export function thesettings (firstname, lastname, email, mobile) {
  return {
    type: 'INPUTSET',
    Fpayload: firstname,
    Lpayload: lastname,
    Epayload: email,
    Mpayload: mobile
  }
}
export function thepayment (name, num, expM, expY, cvv) {
  return {
    type: 'INPUTPAYMENT',
    NApayload: name,
    NUpayload: num,
    Mpayload: expM,
    Ypayload: expY,
    Cpayload: cvv
  }
}

export function theregis (username, password, repassword, mobile) {
  return {
    type: 'INPUTREGIS',
    Upayload: username,
    Ppayload: password,
    RPpayload: repassword,
    Mpayload: mobile
  }
}

export function canlogin (username) {
  return {
    type: 'CANLOG',
    Upayload: username,
    Lpayload: false
  }
}
export function cannotlogin (username) {
  return {
    type: 'CANNOTLOG',
    payload: false
  }
}
export function canregis (username) {
  return {
    type: 'CANREG',
    Upayload: username,
    payload: 'WELCOME ' + username
  }
}
