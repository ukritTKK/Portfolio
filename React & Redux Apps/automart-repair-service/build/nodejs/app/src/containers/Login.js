import React from 'react'
import { Login } from '../components/Login'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { thelogin } from '../actions/inputAction'
import { googlelogin, facelogin, twitterlogin, firebaselogin } from '../actions/UserAction'
// import {
//   LoginForm
// } from '../components'
export class LoginContainer extends React.Component {

  render () {
    return (
      <div>
        <Login {...this.props} />
      </div>
    )
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
      thelogin, googlelogin, facelogin, twitterlogin, firebaselogin
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)

