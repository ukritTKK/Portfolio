import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { aja, checkRedirectPath, setUserStatus, setQuotOfferedBool, onRelocatePosClick,
  setFABButtonString, getAccountID, onUserCancelClick, onLogoutClick,
  onUserViewQuotClick, setCallerID, onMechCreateQuotClick, onMechEditQuotClick,
  onUserResetPosClick, onMechResetPosClick, setUserFABStr, onChildClick, onDropdownClick
 } from './actions/header'
import App from './components/App'
import { withRouter } from 'react-router'
import * as firebase from 'firebase'

class AppContainer extends React.Component {

  componentWillMount () {
    let that = this
    that.props.checkRedirectPath()

    let user = this.getCookie('username')
    let isMechanic = this.getCookie('mechanic')
    let isUserSignedIn = localStorage.getItem('userSignedIn')
    let isMechSignedIn = localStorage.getItem('mechSignedIn')

    firebase.auth().onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        if (user === '' && !isMechanic) {

        } else if (isUserSignedIn && !isMechanic) {
          let mechID = localStorage.getItem('mechanicID')
          if (mechID !== 'undefined') {
            let mechState
            let mechStatus
            let quotOffered
            firebase.database().ref('/mechanic/' + mechID + '/Service').once('value').then(function (snapshot) {
              mechState = snapshot.val().State
              mechStatus = snapshot.val().Status
              quotOffered = snapshot.val().IsQuotationOffered
            }).then(() => {
              // console.log('firebase: ' + quotOffered)
              that.props.setQuotOfferedBool(false)
              if (mechState === 0 && mechStatus === 'Active') {
                that.props.setUserStatus('')
                firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/Service').update({
                  MechanicID: false
                })
              } else if (mechState === 3 && mechStatus === 'Active') {
                // localStorage.setItem('userStatusText', 'Waiting for the mechanic to accept')
                that.props.setUserStatus('Waiting for the mechanic to accept')
              } else if (mechState === 4 && mechStatus === 'Active' && quotOffered === false) {
                that.props.setUserStatus('Mechanic has accepted your order')
              } else if (mechState === 4 && mechStatus === 'Active' && quotOffered === true) {
                that.props.setUserStatus('Mechanic has offered you a price quotation')
                that.props.setQuotOfferedBool(true)
              }
            })
          } else {
            // console.log('aaa1: ' + that.props.header.appText)
            // this.props.aja()
            // setTimeout(() => {
            //   console.log('aaa2: ' + that.props.header.appText)
            // }, 250)
          }
        } else if (isMechSignedIn && isMechanic) {
          // console.log('current: ' + firebase.auth().currentUser)
          if (firebase.auth().currentUser) {
            let uid = firebase.auth().currentUser.uid
            let mechState
            let mechStatus
            let quotOffered
            let CallerID
            firebase.database().ref('/mechanic/' + uid + '/Service').once('value').then(function (snapshot) {
              mechState = snapshot.val().State
              mechStatus = snapshot.val().Status
              quotOffered = snapshot.val().IsQuotationOffered
              CallerID = snapshot.val().CallerID
            }).then(() => {
              that.props.setQuotOfferedBool(false)
              if (mechState === 0 && mechStatus === 'Active') {
              } else if (mechState === 3 && mechStatus === 'Active') {
                that.props.setCallerID(CallerID)
              } else if (mechState === 4 && mechStatus === 'Active' && quotOffered === false) {
                that.props.setCallerID(CallerID)
                that.props.setQuotOfferedBool(false)
              } else if (mechState === 4 && mechStatus === 'Active' && quotOffered === true) {
                that.props.setCallerID(CallerID)
                that.props.setQuotOfferedBool(true)
              }
            })
          }
        }
      }
    })
  }

  componentDidMount () {
    let that = this

    let user = this.getCookie('username')
    let isMechanic = this.getCookie('mechanic')
    let isUserSignedIn = localStorage.getItem('userSignedIn')
    let isMechSignedIn = localStorage.getItem('mechSignedIn')

    firebase.auth().onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        if (user === '' && !isMechanic) {

        } else if (isUserSignedIn && !isMechanic) {
          let mechID = localStorage.getItem('mechanicID')
          if (mechID !== 'undefined') {
            let ref = firebase.database().ref('/mechanic/' + mechID + '/Service')
            ref.on('child_changed', function (snapshot) {
              let changedPost = snapshot.val()
              if (changedPost === 0) {
                that.props.setUserStatus('')
              } else if (changedPost === 3) {
                that.props.setUserStatus('Waiting for the mechanic to accept')
              } else if (changedPost === 4) {
                that.props.setUserStatus('Mechanic has accepted your order')
              } else if (changedPost === true) {
                that.props.setUserStatus('Mechanic has offered you a price quotation')
                that.props.setQuotOfferedBool(true)
                window.location.reload()
              }
              // that.forceUpdate()
            })
          }
          let imagesRef = firebase.storage().ref().child('/images/UsersAvatar/image_' + firebase.auth().currentUser.uid)
          imagesRef.getDownloadURL().then(function (url) {
            let date = new Date()
            date.setDate(date.getDate() + 30)
            document.cookie = 'picture=' + url + '; expires=' + date + ';path=/'
          })
        } else if (isMechSignedIn && isMechanic) {
          if (firebase.auth().currentUser) {
            let uid = firebase.auth().currentUser.uid
            firebase.database().ref('/mechanic/' + uid + '/Service')
            .on('child_changed', function (snapshot) {
              let changedChild = snapshot.val()
              if (changedChild === 0) {
                that.props.setUserStatus('')
              } else if (changedChild === 3) {
              } else if (changedChild === 4) {
              } else if (changedChild === true) {
                that.props.setQuotOfferedBool(true)
              } else if (changedChild === false) {
                that.props.setQuotOfferedBool(false)
              }
            })
          }
        }
      }
    })
  }

  getCookie (name) {
    let value = '; ' + document.cookie
    let parts = value.split('; ' + name + '=')
    if (parts.length === 2) {
      return parts.pop().split(';').shift()
    } else return ''
  }

  render () {
    return (
      <App {...this.props}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    header: state.header,
    umap: state.map,
    mech: state.mechanic
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      aja,
      checkRedirectPath,
      setUserStatus,
      setQuotOfferedBool,
      onRelocatePosClick,
      setFABButtonString,
      getAccountID,
      onUserCancelClick,
      onUserResetPosClick,
      onMechResetPosClick,
      onLogoutClick,
      onUserViewQuotClick,
      setCallerID,
      onMechCreateQuotClick,
      onMechEditQuotClick,
      setUserFABStr,
      onChildClick,
      onDropdownClick
    }, dispatch
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer))
