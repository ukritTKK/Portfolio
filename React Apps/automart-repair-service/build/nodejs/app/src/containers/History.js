import React from 'react'
import History from '../components/History/History'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { thelogin, canlogin, cannotlogin } from '../actions/inputAction'
import { googlelogin, facelogin, twitterlogin, firebaselogin, payment } from '../actions/UserAction'
import { testSet, setHistories } from '../actions/history'
import * as firebase from 'firebase'
// import Spinner from 'react-spinkit'

class HistoryContainer extends React.Component {

  // getCookie (cname) {
  //   let name = cname + '='
  //   let decodedCookie = decodeURIComponent(document.cookie)
  //   let ca = decodedCookie.split(';')
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i]
  //     while (c.charAt(0) === ' ') {
  //       c = c.substring(1)
  //     }
  //     if (c.indexOf(name) === 0) {
  //       return c.substring(name.length, c.length)
  //     }
  //   }
  //   return ''
  // }

  componentWillMount () {
    let that = this
    firebase.auth().onAuthStateChanged(function (currentUser) {
      // console.log(currentUser)
      if (currentUser) {
        firebase.database().ref('/users/' + currentUser.uid + '/payment').once('value').then(function (snapshot) {
          if (snapshot.val()) {
            that.props.payment(true)
          } else {
            that.props.payment(false)
          }
        })
      } else {
        window.location = '/login'
      }
    })
  }

  componentDidMount () {
    let that = this
    firebase.auth().onAuthStateChanged(function (currentUser) {
      if (currentUser) {
        firebase.database().ref('/OrderHistory/' + currentUser.uid).once('value', function (snapshot) {
          if (!snapshot.val()) {
            console.log('This user does not make any payment before.')
          } else {
            let histories = []
            let i = 0
            snapshot.forEach(function (childSnapshot) {
              histories[i] = {
                ID: childSnapshot.key,
                DMY: childSnapshot.val().DMY,
                Status: childSnapshot.val().Status,
                Time: childSnapshot.val().Time
              }
              i += 1
            })
            that.props.setHistories(histories)
          }
        })
      }
    })
  }

  redirect () {
    window.location = '/login'
  }

  render () {
    // const loadingTextWrapper = {position: 'relative', height: '100%'}
    // const loadingSpinner = {
    //   top: '50%',
    //   left: '50%',
    //   transform: 'translate(-50%, -50%)',
    //   width: '64px',
    //   height: '64px',
    //   color: '#686868'
    // }

    return (
      <History {...this.props}/>
    )

    // if (this.props.user.loading) {
    //   return (
    //     <div style={loadingTextWrapper}>
    //       <Spinner name='circle' style={loadingSpinner}/>
    //     </div>
    //   )
    // } else if (this.props.user.username) {
    //   return (
    //     <History {...this.props}/>
    //   )
    // }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    history: state.history
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      thelogin,
      googlelogin,
      facelogin,
      twitterlogin,
      firebaselogin,
      canlogin,
      cannotlogin,
      payment,
      testSet,
      setHistories
    }, dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer)
