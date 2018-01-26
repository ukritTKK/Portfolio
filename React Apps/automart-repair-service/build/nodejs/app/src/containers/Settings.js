import React from 'react'
import Settings from '../components/Settings/Settings'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { thelogin, thesettings, canlogin, cannotlogin } from '../actions/inputAction'
import { googlelogin, facelogin, twitterlogin, firebaselogin, payment } from '../actions/UserAction'
import { settings, setimage, sendsettings, getsettings, loadimage } from '../actions/settings'
import * as firebase from 'firebase'
import Spinner from 'react-spinkit'

export class SettingsContainer extends React.Component {

  componentDidMount () {
    let refStorage = firebase.storage().ref()
    let that = this.props
    let firstname = ''
    let lastname = ''
    let email = ''
    let mobile = ''
    firebase.auth().onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        firebase.database().ref('/users/' + currentUser.uid + '/payment').once('value').then(function (snapshot) {
          if (snapshot.val()) {
            that.payment(true)
          } else {
            that.payment(false)
          }
        })
        that.canlogin(currentUser)
        let uid = firebase.auth().currentUser.uid
        firebase.database().ref('/users/' + uid + '/Details').once('value').then(function (snapshot) {
          firstname = snapshot.val().firstname
          lastname = snapshot.val().lastname
          email = snapshot.val().email
          mobile = snapshot.val().mobile
          that.getsettings(firstname, lastname, email, mobile)
        })
        let imagesRef = refStorage.child('/images/UsersAvatar/image_' + firebase.auth().currentUser.uid)
        imagesRef.getDownloadURL().then(function (url) {
          that.loadimage(url)
          // console.log('image url: ' + url)
          let d = new Date()
          d.setTime(d.getTime() * 50000)
          document.cookie = 'picture=' + url + ';' + 30 + ';path=/'
        })
      } else {
        that.cannotlogin()
      }
    })
  }

  renderScene (route, navigator) {
    return <route.component navigator={navigator} />
  }

  redirect () {
    window.location = '/login'
  }

  render () {
    const loadingTextWrapper = {position: 'relative', height: '100%'}
    // const loadingText = {
    //   position: 'absolute',
    //   top: '45%',
    //   left: '50%',
    //   transform: 'translate(-50%, -50%',
    //   color: '#707070'
    // }
    const loadingSpinner = {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '64px',
      height: '64px',
      color: '#686868'
    }
    if (this.props.user.loading) {
      return <div style={loadingTextWrapper}>
        {/* <h2 style={loadingText}>Loading...</h2> */}
        <Spinner name='circle' style={loadingSpinner}/>
      </div>
    } else if (this.props.user.username) {
      return (
        <Settings {...this.props}/>
      )
    } else {
      console.log('Please login first.')
      return (this.redirect())
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    uset: state.settings
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      thelogin, googlelogin, facelogin, twitterlogin, firebaselogin, getsettings, loadimage, settings, sendsettings, payment, thesettings, canlogin, cannotlogin, setimage
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
