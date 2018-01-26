import React from 'react'
import Notification from '../components/Notification/Notification'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {thelogin, nouser, shortpass} from '../actions/inputAction'
import { googlelogin, facelogin, twitterlogin, firebaselogin } from '../actions/UserAction'
import { Redirect } from 'react-router'
import * as firebase from 'firebase'

export class NotificationContainer extends React.Component {
  getCookie (cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  render () {
    let a = this.getCookie('username')
    if (a === '' || firebase.auth().currentUser === null) {
      return (<Redirect to="/login" />)
    } else {
      return (
        <div >
          <Notification />
        </div>
      )
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      thelogin, googlelogin, facelogin, twitterlogin, firebaselogin, nouser, shortpass
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)
